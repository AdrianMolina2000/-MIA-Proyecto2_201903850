import React, { useEffect} from 'react';
import axios from 'axios';
import { Backdrop, Modal, Fade, TextField, InputLabel, Select, FormControl } from '@mui/material';
import {
    Typography,
    Grid,
    Button,
    Box,
    MenuItem
} from '@material-ui/core';



const CrearUsers = () => {
    const [open, setOpen] = React.useState(false);
    const [datos, setDatos] = React.useState({ userName: '', password: '', fechaIni: '', fechaFin: '', estado: '1', id_rol: '2', id_dep: '' });

    let fecha = new Date()
    let fechaE = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear()

    datos.fechaIni = fechaE

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
        e.preventDefault();
        console.log(datos)
        console.log(table)
    }


    let table = []
    const items = []

    useEffect(() => {
        async function fetchData(){
            await axios.get('http://localhost:5670/puestos')
                .then(res => {
                    for (let i = 0; i < res.data.length; i++) {
                        table.push({
                            id_puesto: res.data[i][0],
                            Name: res.data[i][1],
                            Caption: res.data[i][2],
                            Item_image: res.data[i][3],
                            Item_Name: res.data[i][4]
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
                for (let i = 0; i < table.length; i++) {
                    items.push(<MenuItem value={table[i].id_puesto} key={`id_${i}`}>{table[i].Name}</MenuItem>)
                }
        }
        fetchData();
        
    });


    return (
        <div style={{ marginTop: "50px", color: "#494949" }}>
            <h2 className="Title">Crear Usuarios</h2>
            <Button variant="outlined" className="ViewButton" onClick={handleOpen} >Crear Coordinador</Button>
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
                            Ingresar datos para Coordinador
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
                                        value={datos.nombre}
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
                                            {items}
                                        </Select>
                                    </FormControl>
                                </Grid>


                                <Grid item xs={6}></Grid>

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
export default CrearUsers;