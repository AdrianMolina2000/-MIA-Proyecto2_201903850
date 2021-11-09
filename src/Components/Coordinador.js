import React from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { Backdrop, Modal, Fade, TextField } from '@mui/material';
import {
    Grid,
    Button,
    Box,
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';



let rows = [];
let rows2 = [];

let temporal2 = [];
export default class CrearUsers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id_usuario: '',
            salario: '',
            id_dep: '',
            capital: '',
            total: '',
        };
    }


    async componentDidMount() {
        const temporal = [];
        temporal2 = [];

        const id_revisor = JSON.parse(localStorage.getItem("user")).id
        const id_dep2 = JSON.parse(localStorage.getItem("user")).departamento

        this.state.id_dep = id_dep2

        try {
            const response = await axios.post('http://localhost:5670/expedientesAceptados', { id_dep: id_dep2 });
            const data = await response.data;
            if (typeof (data) !== typeof ("")) {
                for (let i = 0; i < data.length; i++) {
                    temporal.push({
                        id: i,
                        id_user: data[i][0],
                        DPI: data[i][1],
                        nombre: data[i][2],
                        apellido: data[i][3],
                        puesto: data[i][4],
                        salario: data[i][5]
                    })
                }
            } else {
                console.log("sin expedientes")
            }
            rows = temporal;
        } catch (err) {
            console.log(err);
        }

        try {
            const response = await axios.post('http://localhost:5670/plantilla', { id_dep: id_dep2 });
            const data = await response.data;
            if (typeof (data) !== typeof ("")) {
                for (let i = 0; i < data.length; i++) {
                    temporal2.push({
                        id: i,
                        id_user: data[i][0],
                        DPI: data[i][1],
                        nombre: data[i][2],
                        apellido: data[i][3],
                        puesto: data[i][4],
                        salario: data[i][5]
                    })
                }
            } else {
                console.log("sin expedientes")
            }
            rows2 = temporal2;
        } catch (err) {
            console.log(err);
        }

        try {
            const response = await axios.post('http://localhost:5670/capital', { dep: id_dep2 });
            const data = await response.data;
            if (typeof (data) !== typeof ("")) {
                this.state.capital = data[0][0]
            } else {
                console.log("sin expedientes")
            }
            rows = temporal;
        } catch (err) {
            console.log(err);
        }

        this.forceUpdate();
    }


    Cambiar = (param) => {
        if (param) {
            this.state.id_usuario = param.id_user
            this.state.salario = param.salario
            this.forceUpdate();
        }
    }

    Aceptar = (e) => {
        if (this.state.salario > this.state.capital) {
            this.state.total = 'Excede el capital disponible'
            this.forceUpdate();
        } else {
            this.state.total = ''

            axios.post('http://localhost:5670/agregarPlantilla', {
                id_dep: this.state.id_dep,
                id_user: this.state.id_usuario,
                salario: this.state.salario
            })
            window.location.reload();
        }
    }

    Rechazar = (e) => {
        axios.post('http://localhost:5670/eliminarPlantilla', {
            id_dep: this.state.id_dep,
            id_user: this.state.id_usuario,
            salario: this.state.salario
        })
        window.location.reload();
    }


    render() {
        return (
            <div>
                <div style={{ marginTop: "50px", marginBottom: "50px", color: "#494949" }}>
                    <h2 className="Title2">Capital Disponible: {this.state.capital}</h2>
                    <h2 className="Title">Expedientes Aceptados</h2>
                    <h2 className="Title2" style={{ color: 'red' }}>{this.state.total}</h2>
                    <div style={{ height: 400, width: '100%', backgroundColor: 'white', borderStyle: 'solid' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            onSelectionModelChange={itm => this.Cambiar(rows[itm])}
                            disableSelectionOnClick
                        />
                    </div>

                    <div style={{ marginTop: "50px", marginBottom: "50px", color: "#494949" }}>
                        <label htmlFor="Aceptar">
                            <Button variant="outlined" color="primary" component="span">Aceptar</Button>
                        </label>

                        <input
                            id="Aceptar"
                            style={{ display: 'none' }}
                            type="submit"
                            onClick={this.Aceptar}
                        />
                    </div>
                </div>

                <div style={{ marginTop: "50px", marginBottom: "50px", color: "#494949" }}>
                    <h2 className="Title">En planilla</h2>
                    <div style={{ height: 400, width: '100%', backgroundColor: 'white', borderStyle: 'solid' }}>
                        <DataGrid
                            rows={rows2}
                            columns={columns2}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            onSelectionModelChange={itm => this.Cambiar(rows2[itm])}
                            disableSelectionOnClick
                        />
                    </div>

                    <div style={{ marginTop: "50px", marginBottom: "50px", color: "#494949" }}>
                        <label htmlFor="RechazarReq">
                            <Button variant="outlined" color="secondary" component="span" startIcon={<DeleteIcon />}>Eliminar</Button>
                        </label>

                        <input
                            id="RechazarReq"
                            style={{ display: 'none' }}
                            type="submit"
                            onClick={this.Rechazar}
                        />
                    </div>
                </div>
            </div >
        )
    }
}


const columns = [
    {
        field: 'DPI',
        headerName: 'DPI',
        width: 200,
        editable: false,
    },
    {
        field: 'nombre',
        headerName: 'Nombre',
        width: 240,
        editable: false,
    },
    {
        field: 'apellido',
        headerName: 'Apellido',
        width: 240,
        editable: false,
    },
    {
        field: 'puesto',
        headerName: 'Puesto',
        width: 240,
        editable: false,
    },
    {
        field: 'salario',
        headerName: 'Salario',
        width: 180,
        editable: false,
    }
];


const columns2 = [
    {
        field: 'DPI',
        headerName: 'DPI',
        width: 200,
        editable: false,
    },
    {
        field: 'nombre',
        headerName: 'Nombre',
        width: 240,
        editable: false,
    },
    {
        field: 'apellido',
        headerName: 'Apellido',
        width: 240,
        editable: false,
    },
    {
        field: 'puesto',
        headerName: 'Puesto',
        width: 240,
        editable: false,
    },
    {
        field: 'salario',
        headerName: 'Salario',
        width: 180,
        editable: false,
    }
];