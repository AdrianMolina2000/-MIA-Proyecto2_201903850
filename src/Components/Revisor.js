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

const MostrarCV = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


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


    return (
        <div>
            <Button variant="outlined" className="ViewButton" onClick={handleOpen} fullWidth>Ver CV</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 1000,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <embed src={props.cv} width="100%" height="100%" />
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}


let rows = [];
let rows2 = [];

let fecha = new Date()
let fechaE = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear()

let temporal2 = [];
export default class CrearUsers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            cv: '',
            id_rev_exp: '',
            dpi: '',
            dep: '',
            fecha: '',
            email: '',
            link: '',
            id_doc: '',
            email_doc: '',
            nombre_doc: '',
            razon: '',
            exp_doc: ''
        };
    }



    async componentDidMount() {
        const temporal = [];
        temporal2 = [];

        const id_revisor = JSON.parse(localStorage.getItem("user")).id
        try {
            const response = await axios.post('http://localhost:5670/Revisor', { id_revisor: id_revisor });
            const data = await response.data;
            if (typeof (data) !== typeof ("")) {

                for (let i = 0; i < data.length; i++) {
                    temporal.push({
                        id: i,
                        DPI: data[i][0],
                        nombre: data[i][1],
                        apellido: data[i][2],
                        email: data[i][3],
                        direccion: data[i][4],
                        telefono: data[i][5],
                        fecha: data[i][6],
                        puesto: data[i][7],
                        cv: data[i][8],
                        id2: data[i][9],
                        id_rev_exp: data[i][10],
                        id_dep: data[i][11]
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
            const response = await axios.post('http://localhost:5670/RequRev', { id_rev: id_revisor });
            const data = await response.data;
            if (typeof (data) !== typeof ("")) {
                for (let i = 0; i < data.length; i++) {
                    temporal2.push({
                        id: i,
                        id_doc: data[i][0],
                        requisito: data[i][1],
                        link: data[i][2],
                        email: data[i][3],
                        id_exp: data[i][4]
                    })
                }
            } else {
                console.log("sin expedientes")
            }
            rows2 = temporal2;
        } catch (err) {
            console.log(err);
        }

        this.forceUpdate();

    }


    Cambiar = (param) => {
        if (param) {
            this.state.id = param.id2
            this.state.cv = param.cv
            this.state.id_rev_exp = param.id_rev_exp
            this.state.dpi = param.DPI
            this.state.dep = param.id_dep
            this.state.fecha = fechaE;
            this.state.email = param.email
            this.forceUpdate();
        }
    }

    Cambiar2 = (param) => {
        if (param) {
            this.state.id_doc = param.id_doc
            this.state.link = param.link
            this.state.email_doc = param.email
            this.state.nombre_doc = param.requisito
            this.state.exp_doc = param.id_exp
            this.forceUpdate();
        }
    }

    Cambiar3 = (e) => {
        this.state.razon = e.target.value
    }


    Aceptar = (e) => {
        axios.post('http://localhost:5670/Aceptar', this.state)
        window.location.reload();
    }

    Rechazar = (e) => {
        axios.post('http://localhost:5670/Rechazar', { id: this.state.id, id_rev_exp: this.state.id_rev_exp })
        window.location.reload();
    }

    Aceptar2 = (e) => {
        axios.put('http://localhost:5670/AceptarRechazar', { id_doc: this.state.id_doc, accept: 1, id_exp: this.state.exp_doc})
        window.location.reload();
    }

    Rechazar2 = (e) => {
        axios.put('http://localhost:5670/AceptarRechazar', {id_doc: this.state.id_doc, 
                                                            accept: 0, 
                                                            email: this.state.email_doc, 
                                                            nombre: this.state.nombre_doc,
                                                            razon: this.state.razon,
                                                            id_exp: this.state.exp_doc})
        window.location.reload();
    }

    render() {
        return (
            <div>
                <div style={{ marginTop: "50px", marginBottom: "50px", color: "#494949" }}>
                    <h2 className="Title">Expedientes</h2>
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
                        <Grid container spacing={2} >
                            <Grid item xs={2}>
                                <MostrarCV cv={this.state.cv}></MostrarCV>
                            </Grid>
                            <Grid item xs={1}>
                                <label htmlFor="Aceptar">
                                    <Button variant="outlined" color="primary" component="span">Aceptar</Button>
                                </label>

                                <input
                                    id="Aceptar"
                                    style={{ display: 'none' }}
                                    type="submit"
                                    onClick={this.Aceptar}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <label htmlFor="Eliminar">
                                    <Button variant="outlined" color="secondary" component="span" startIcon={<DeleteIcon />}>Rechazar</Button>
                                </label>

                                <input
                                    id="Eliminar"
                                    style={{ display: 'none' }}
                                    type="submit"
                                    onClick={this.Rechazar}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </div>

                <div style={{ marginTop: "50px", marginBottom: "50px", color: "#494949" }}>
                    <h2 className="Title">Aceptar Requisitos</h2>
                    <Grid container spacing={2} >
                        <Grid item xs={6}>
                            <div style={{ height: 400, width: '100%', backgroundColor: 'white', borderStyle: 'solid' }}>
                                <DataGrid
                                    rows={rows2}
                                    columns={columns2}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    checkboxSelection
                                    onSelectionModelChange={itm => this.Cambiar2(rows2[itm])}
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

                    <div style={{ marginTop: "50px", marginBottom: "50px", color: "#494949" }}>
                        <Grid container spacing={2} >
                            <Grid item xs={1}>
                                <label htmlFor="AceptarReq">
                                    <Button variant="outlined" color="primary" component="span">Aceptar</Button>
                                </label>

                                <input
                                    id="AceptarReq"
                                    style={{ display: 'none' }}
                                    type="submit"
                                    onClick={this.Aceptar2}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <label htmlFor="RechazarReq">
                                    <Button variant="outlined" color="secondary" component="span" startIcon={<DeleteIcon />}>Rechazar</Button>
                                </label>

                                <input
                                    id="RechazarReq"
                                    style={{ display: 'none' }}
                                    type="submit"
                                    onClick={this.Rechazar2}
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <div style={{ marginTop: "50px", marginBottom: "50px", color: "#494949" }}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Razon de rechazo"
                            variant="outlined"
                            placeholder="Ingrese la razon del rechazo"
                            multiline
                            fullWidth
                            rows={4}
                            value={this.state.razon}
                            onChange={(e) => this.setState({ ...this.state, razon: e.target.value })}
                            style={{ backgroundColor: 'white' }}
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
        width: 180,
        editable: false,
    },
    {
        field: 'nombre',
        headerName: 'Nombres',
        width: 180,
        editable: false,
    },
    {
        field: 'apellido',
        headerName: 'Apellidos',
        width: 120,
        editable: false,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 220,
        editable: false,
    },
    {
        field: 'direccion',
        headerName: 'Direccion',
        width: 180,
        editable: false,
    },
    {
        field: 'telefono',
        headerName: 'Telefono',
        width: 220,
        editable: false,
    },
    {
        field: 'fecha',
        headerName: 'Fecha de Postulacion',
        width: 220,
        editable: false,
    },
    {
        field: 'puesto',
        headerName: 'Puesto',
        width: 220,
        editable: false,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 220,
        editable: false,
    },
];


const columns2 = [
    {
        field: 'requisito',
        headerName: 'Requisito',
        width: 500,
        editable: false,
    }
];