import React from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { Backdrop, Modal, Fade } from '@mui/material';
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
                        {console.log(props.cv)}
                        <embed src={props.cv} width="100%" height="100%" />
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
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

let rows = [];

let fecha = new Date()
let fechaE = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear()

export default class CrearUsers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            cv: '',
            id_rev_exp : '',
            dpi: '',
            dep: '',
            fecha: ''          
        };
    }

    

    async componentDidMount() {
        const temporal = [];
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

        console.log(temporal)
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
            this.forceUpdate();
        }
    }

    Aceptar = (e) => {
        axios.post('http://localhost:5670/Aceptar', this.state)
        window.location.reload();
    }

    Rechazar = (e) => {
        axios.post('http://localhost:5670/Rechazar', { id: this.state.id, id_rev_exp: this.state.id_rev_exp })
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
            </div>
        )
    }
}