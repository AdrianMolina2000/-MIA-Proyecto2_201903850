import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { Backdrop, Modal, Fade, TextField, InputLabel, Select, FormControl } from '@mui/material';
import {
    Typography,
    Grid,
    Button,
    Box,
    MenuItem
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';

const useStyles = makeStyles(theme => ({
    error: {
        color: 'red',
        fontFamily: 'Arial',
        fontSize: '14px'
    }
}))

let fecha = new Date()
let fechaE = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear()

const CrearCoor = (props) => {
    const [open, setOpen] = React.useState(false);
    const [datos, setDatos] = React.useState({ userName: '', password: '', fechaIni: '', fechaFin: '', estado: '1', id_rol: props.rol, id_dep: '' });
    const [completo, setCompleto] = React.useState('');

    
    datos.fechaIni = fechaE

    const classes = useStyles();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = e => {
        setDatos({
            ...datos, [e.target.name]: e.target.value
        })
    }


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    const onSubmit = e => {
        // e.preventDefault();
        // if (datos.userName !== '' && datos.password !== '' && datos.id_dep !== '') {
        //     axios.post("http://localhost:5670/CrearCoor", datos);
        //     window.location.reload(false);
        //     setCompleto("");
        // } else {
        //     setCompleto(" Faltan Datos");
        // }
    }

    return (
        <div>
            <Button variant="outlined" className="ViewButton" onClick={handleOpen} fullWidth>Crear {props.name}</Button>
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
                        <Typography id="transition-modal-title" variant="h6" component="h2" >
                            Ingresar datos para {props.name}
                        </Typography>

                        <br></br>

                        <form>
                            <Grid container spacing={2} >
                                <Grid item xs={6}>
                                    <TextField
                                        label="User Name" variant="outlined"
                                        name='userName'
                                        onChange={handleChange}
                                        value={datos.userName}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="Password" variant="outlined"
                                        name='password'
                                        onChange={handleChange}
                                        value={datos.password}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel>Departamentos</InputLabel>
                                        <Select
                                            value={datos.id_dep}
                                            onChange={handleChange}
                                            label="Departamentos"
                                            name='id_dep'
                                        >

                                            {props.deps}
                                        </Select>
                                    </FormControl>
                                </Grid>


                                <Grid item xs={6}>
                                    <Typography variant='h1' className={classes.error}>{completo}</Typography>

                                </Grid>

                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        variant='outlined'
                                        color='primary'
                                        onClick={onSubmit}
                                    >Crear</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Fade>
            </Modal>


        </div>
    );
}

const columns = [
    {
        field: 'userName',
        headerName: 'User Name',
        width: 180,
        editable: false,
    },
    {
        field: 'password',
        headerName: 'Password',
        width: 180,
        editable: false,
    },
    {
        field: 'rol',
        headerName: 'Rol',
        width: 120,
        editable: false,
    },
    {
        field: 'departamento',
        headerName: 'Departamento',
        width: 220,
        editable: false,
    },
    {
        field: 'fecha',
        headerName: 'Fecha de Inicio',
        width: 180,
        editable: false,
    }
];

let tableCoor = []
let tableRev = []
let itemsCoor = []
let itemsRev = []
let rows = [];
export default class CrearUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            id: '',
        };
    }

    async componentDidMount() {
        const temporal = [];
        itemsCoor = []
        itemsRev = []

        try {
            const response = await axios.get('http://localhost:5670/DepartamentosCoor');
            const data2 = await response.data;
            if (typeof (data2) !== typeof ("")) {
                for (let i = 0; i < data2.length; i++) {
                    tableCoor.push({
                        id_puesto: data2[i][0],
                        Name: data2[i][1]
                    })
                    itemsCoor.push(<MenuItem value={tableCoor[i].id_puesto} key={`Coor_${i}`}>{tableCoor[i].Name}</MenuItem>);
                }
            } else {
                itemsCoor.push(<MenuItem value={""} key={`None`}><em>None</em></MenuItem>)
            }
        } catch (err) {
            console.log(err);
        }

        try {
            const response = await axios.get('http://localhost:5670/DepartamentosRev');
            const data = await response.data;
            for (let i = 0; i < data.length; i++) {
                tableRev.push({
                    id_puesto: data[i][0],
                    Name: data[i][1]
                })
                itemsRev.push(<MenuItem value={tableRev[i].id_puesto} key={`Rev_${i}`}>{tableRev[i].Name}</MenuItem>);
            }
        } catch (err) {
            console.log(err);
        }

        try {
            const response = await axios.get('http://localhost:5670/listaUsers');
            const data = await response.data;
            if (typeof (data) !== typeof ("")) {
                for (let i = 0; i < data.length; i++) {
                    temporal.push({
                        id: i,
                        id2: data[i][0],
                        userName: data[i][1],
                        password: data[i][2],
                        rol: data[i][3],
                        departamento: data[i][4],
                        fecha: data[i][5],
                    })
                }
            }
            rows = temporal;
            this.forceUpdate();
        } catch (err) {
            console.log(err);
        }

        this.forceUpdate();
    }

    Cambiar = (param) => {
        if (param) {
            this.state.userName = param.userName
            this.state.password = param.password
            this.state.id = param.id2
            this.forceUpdate();
        }
    }

    Editar = (e) => {
        axios.put('http://localhost:5670/UpUsuario', this.state)
        window.location.reload();
    }

    Eliminar = (e) => {

        axios.put('http://localhost:5670/DelUsuario', { id: this.state.id, fecha: fechaE})
        window.location.reload();
    }
    
    render() {
        return (
            <div>

                <div style={{ marginTop: "50px", marginBottom: "50px", color: "#494949" }}>
                    <h2 className="Title">Crear Usuarios</h2>
                    <Grid container spacing={2} >
                        <Grid item xs={3}>
                            <CrearCoor rol={2} deps={itemsCoor} name={"Coordinador"}></CrearCoor>
                        </Grid>
                        <Grid item xs={3}>
                            <CrearCoor rol={3} deps={itemsRev} name={"Revisor"}></CrearCoor>
                        </Grid>
                    </Grid>
                </div>
                <div style={{ marginTop: "50px", marginBottom: "50px", color: "#494949" }}>
                    <h2 className="Title">Editar Usuarios</h2>
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
                                <TextField
                                    label="User Name" variant="outlined"
                                    onChange={(e) => this.setState({ userName: e.target.value })}
                                    value={this.state.userName}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField label="Password" variant="outlined"
                                    onChange={(e) => this.setState({ password: e.target.value })}
                                    value={this.state.password}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <label htmlFor="editar">
                                    <Button variant="outlined" color="primary" component="span">Editar</Button>
                                </label>

                                <input
                                    id="editar"
                                    style={{ display: 'none' }}
                                    type="submit"
                                    onClick={this.Editar}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <label htmlFor="Eliminar">
                                    <Button variant="outlined" color="secondary" component="span" startIcon={<DeleteIcon />}>Eliminar</Button>
                                </label>

                                <input
                                    id="Eliminar"
                                    style={{ display: 'none' }}
                                    type="submit"
                                    onClick={this.Eliminar}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        )
    }
}