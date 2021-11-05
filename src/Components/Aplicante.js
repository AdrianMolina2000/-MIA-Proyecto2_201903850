import React from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { Backdrop, Modal, Fade, TextField } from '@mui/material';
import {
    Grid,
    Box,
    Button
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';

import './global.css';


let archivo;
const MostrarReq = (props) => {
    const [open, setOpen] = React.useState(false);
    const [datos, setDatos] = React.useState({ nombre: props.nombre, dpi: props.dpi, fecha: '', id_expediente: '' });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let fecha = new Date()
    let fechaE = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear()

    datos.fecha = fechaE;
    datos.id_expediente = props.id_exp;

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        height: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    function upload(e) {
        archivo = e.target.files[0]
    }

    async function subir(e) {
        e.preventDefault();
        const data = new FormData()
        data.append("file", archivo)
        data.append("datos", JSON.stringify(datos))
        axios.post("http://localhost:5670/CargarRequisito", data);
    }

    return (
        <div>
            <h2 className="Title2">Nombre:</h2>
            <h2 className="Title3">{props.nombre}</h2>
            <h2 className="Title2">Formatos permitidos:</h2>
            <h2 className="Title3">{props.formatos}</h2>
            <h2 className="Title2">Peso Máximo:</h2>
            <h2 className="Title3">{props.size}</h2>
            <h2 className="Title2">Obligatorio:</h2>
            <h2 className="Title3">{props.obligatorio}</h2>
            <Grid container spacing={2} >
                <Grid item xs={12}>
                    <label htmlFor="botonCarga">
                        <Button variant="outlined" component="span" color="secondary" fullWidth>Cargar Archivo</Button>
                    </label>

                    <input
                        id="botonCarga"
                        style={{ display: 'none' }}
                        type="file"
                        multiple={false}
                        // accept=".pdf"
                        onChange={upload}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        fullWidth
                        variant='outlined'
                        color="primary"
                        onClick={subir}
                    >Enviar Requisito</Button>
                </Grid>
            </Grid>
        </div >
    );
}


let temporal = [];
let temporal2 = [];
let rows = [];
export default class CrearUsers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            dpi: '',
            nombre: '',
            apellido: '',
            email: '',
            direccion: '',
            telefono: '',
            cv: '',
            revisado: '',
            corregir: '',
            fecha_post: '',
            id_puesto: '',
            puesto: '',
            link: '',
        };
    }



    async componentDidMount() {
        temporal = [];
        temporal2 = [];

        const id_aplicante = JSON.parse(localStorage.getItem("user")).id
        try {
            const response = await axios.post('http://localhost:5670/Aplicante', { id_aplicante: id_aplicante });
            const data = await response.data;
            if (typeof (data) !== typeof ("")) {

                this.state.id = data[0][0]
                this.state.dpi = data[0][1]
                this.state.nombre = data[0][2]
                this.state.apellido = data[0][3]
                this.state.email = data[0][4]
                this.state.direccion = data[0][5]
                this.state.telefono = data[0][6]
                this.state.cv = data[0][7]
                this.state.revisado = data[0][8]
                if (data[0][9] == 2) {
                    this.state.corregir = 'En Proceso'
                }
                this.state.fecha_post = data[0][10]
                this.state.id_puesto = data[0][11]
                this.state.puesto = data[0][12]
            } else {
                console.log("sin expedientes")
            }
        } catch (err) {
            console.log(err);
        }


        try {
            const response = await axios.post('http://localhost:5670/Requisitos', { id_puesto: this.state.id_puesto, id_exp: this.state.id });
            const data = await response.data;
            if (typeof (data) !== typeof ("")) {
                for (let i = 0; i < data.length; i++) {
                    temporal.push(
                        < Grid item xs={6} >
                            <MostrarReq
                                nombre={data[i][0]}
                                size={data[i][1]}
                                obligatorio={data[i][2]}
                                formatos={data[i][3]}
                                id_exp={this.state.id}
                                dpi={this.state.dpi}
                            ></MostrarReq>
                        </Grid >
                    )
                }
                console.log(temporal)
            } else {
                console.log("sin expedientes")
            }
        } catch (err) {
            console.log(err);
        }



        try {
            const response = await axios.post('http://localhost:5670/RequAccept', { id_exp: this.state.id });
            const data = await response.data;
            if (typeof (data) !== typeof ("")) {
                for (let i = 0; i < data.length; i++) {
                    temporal2.push({
                        id: i,
                        requisito: data[i][0],
                        link: data[i][1],
                    })
                }
            } else {
                console.log("sin expedientes")
            }
            rows = temporal2;
        } catch (err) {
            console.log(err);
        }

        this.forceUpdate();
    }


    Cambiar = (param) => {
        if (param) {
            this.state.link = param.link
        }
        this.forceUpdate();
    }


    render() {
        return (
            <div>
                <h2 className="Title">Bienvenido {this.state.nombre} {this.state.apellido}</h2>
                <div style={{ marginTop: "50px", color: "#494949" }}>
                    <Grid container spacing={2} >
                        <Grid item xs={6}>
                            <Grid container spacing={2} >
                                <Grid item xs={12}>
                                    <TextField
                                        label="CUI/DPI" type="number" variant="outlined"
                                        value={this.state.dpi}
                                        style={{ backgroundColor: 'white' }}
                                        disabled
                                        fullWidth
                                        margin="dense"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Nombre" variant="outlined"
                                        value={this.state.nombre}
                                        style={{ backgroundColor: 'white' }}
                                        disabled
                                        fullWidth
                                        margin="dense"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Apellido" variant="outlined"
                                        value={this.state.apellido}
                                        style={{ backgroundColor: 'white' }}
                                        disabled
                                        fullWidth
                                        margin="dense"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Email" variant="outlined"
                                        value={this.state.email}
                                        style={{ backgroundColor: 'white' }}
                                        disabled
                                        fullWidth
                                        margin="dense"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Direccion" variant="outlined"
                                        value={this.state.direccion}
                                        style={{ backgroundColor: 'white' }}
                                        disabled
                                        fullWidth
                                        margin="dense"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Telefono" variant="outlined"
                                        value={this.state.telefono}
                                        style={{ backgroundColor: 'white' }}
                                        disabled
                                        fullWidth
                                        margin="dense"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Fecha de Postulacion" variant="outlined"
                                        value={this.state.fecha_post}
                                        style={{ backgroundColor: 'white' }}
                                        disabled
                                        fullWidth
                                        margin="dense"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Revisado" variant="outlined"
                                        value={this.state.revisado}
                                        style={{ backgroundColor: 'white' }}
                                        disabled
                                        fullWidth
                                        margin="dense"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Corregir" variant="outlined"
                                        value={this.state.corregir}
                                        style={{ backgroundColor: 'white' }}
                                        disabled
                                        fullWidth
                                        margin="dense"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <embed src={this.state.cv} width="100%" height="100%" />
                        </Grid>
                    </Grid>
                </div>
                <div style={{ marginTop: "50px", color: "#494949" }}>
                    <h4 className="Title">Subir Requisitos</h4>
                    <Grid container spacing={2} >
                        {temporal}
                    </Grid>
                </div>
                <div style={{ marginTop: "50px", color: "#494949" }}>
                    <h4 className="Title">Requisitos Aceptados</h4>
                    <Grid container spacing={2} >
                        <Grid item xs={6}>
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
                        </Grid>
                        <Grid item xs={6}>
                            <div style={{ height: 400, width: '100%', backgroundColor: 'white', borderStyle: 'solid' }}>
                                <embed src={this.state.link} width="100%" height="100%" />
                            </div>
                        </Grid>
                    </Grid>
                </div>


            </div>
        )
    }
}


const columns = [
    {
        field: 'requisito',
        headerName: 'Requisito',
        width: 500,
        editable: false,
    }
];