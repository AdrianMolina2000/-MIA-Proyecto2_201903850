import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Carousel from "react-material-ui-carousel"
import Skeleton from '@mui/material/Skeleton';
import autoBind from "auto-bind"
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';

import './Carrousel.css';

import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Button,
    Box
} from '@material-ui/core';


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



function Banner(props) {
    const [open, setOpen] = React.useState(false);
    const [datos, setDatos] = React.useState({ DPI: '', nombre: '', apellido: '', email: '', direccion: '', telefono: '', link: '', fecha: '', id: '', id_depart: '' });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    let fecha = new Date()
    let fechaE = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear()

    datos.id = props.item.id_puesto;
    datos.fecha = fechaE;
    datos.id_depart = props.item.id_departamento
    let archivo;


    function subir(e) {
        e.preventDefault();
        const data = new FormData()
        data.append("file", archivo)
        data.append("datos", JSON.stringify(datos))
        axios.post("http://localhost:5670/solicitud", data);
    }

    function upload(e) {
        archivo = e.target.files[0]
    }

    if (props.newProp) console.log(props.newProp)
    const totalItems = props.length ? props.length : 2;
    const mediaLength = totalItems - 1;

    let items = [];
    const content = (
        <Grid item xs={12 / totalItems} key="content">
            <CardContent className="Content">
                <Typography className="Title">
                    {props.item.Name}
                </Typography>

                <Typography className="Caption">
                    {props.item.Caption}
                </Typography>

                <Button variant="outlined" className="ViewButton" onClick={handleOpen} >Aplicar</Button>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <Typography id="transition-modal-title" variant="h6" component="h2" >
                                Ingresar datos para solicitud
                            </Typography>

                            <br></br>

                            <form onSubmit={subir}>
                                <Grid container spacing={2} >
                                    <Grid item xs={6}>
                                        <TextField
                                            label="CUI/DPI" type="number" variant="outlined"
                                            onInput = {(e) =>{
                                                e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,13)
                                            }}
                                            onChange={(e) => setDatos({ ...datos, DPI: e.target.value })}
                                            value={datos.DPI}
                                        // InputLabelProps={{ shrink: true, }} 
                                        />
                                    </Grid>
                                    <Grid item xs={6}></Grid>
                                    <Grid item xs={6}>
                                        <TextField label="Nombres" variant="outlined"
                                            onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
                                            value={datos.nombre}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField label="Apellidos" variant="outlined"
                                            onChange={(e) => setDatos({ ...datos, apellido: e.target.value })}
                                            value={datos.apellido}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField label="Email" type="email" variant="outlined"
                                            onChange={(e) => setDatos({ ...datos, email: e.target.value })}
                                            value={datos.email}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField label="Direccion" variant="outlined"
                                            onChange={(e) => setDatos({ ...datos, direccion: e.target.value })}
                                            value={datos.direccion}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField label="Telefono" type="number" variant="outlined"
                                            onChange={(e) => setDatos({ ...datos, telefono: e.target.value })}
                                            value={datos.telefono}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <label htmlFor="botonCarga">
                                            <Button variant="outlined" component="span">Cargar CV</Button>
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
                                    <Grid item xs={6}>
                                        <Button variant="outlined" type="submit">Enviar</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Box>
                    </Fade>
                </Modal>


            </CardContent>
        </Grid>
    )


    for (let i = 0; i < mediaLength; i++) {
        const item = props.item;

        const media = (
            <Grid item xs={12 / totalItems} key={item.Name}>
                <CardMedia
                    className="Media"
                    image={item.Item_image}
                    title={item.Item_Name}
                >
                    <Typography className="MediaCaption">
                        {item.Item_Name}
                    </Typography>
                </CardMedia>
            </Grid>
        )

        items.push(media);
    }


    items.push(content);
    return (
        <Card raised className="Banner">
            <Grid container spacing={0} className="BannerGrid">
                {items}
            </Grid>
        </Card>
    )
}

let items = []
let x = true;

class Carrousel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            autoPlay: false,
            animation: "slide",
            indicators: true,
            timeout: 500,
            navButtonsAlwaysVisible: false,
            navButtonsAlwaysInvisible: false,
            cycleNavigation: true,
            temporal: []
        }

        autoBind(this);
    }

    async componentDidMount() {
        try {
            const response = await axios.get('http://localhost:5670/puestos');
            const data = await response.data;
            for (let i = 0; i < data.length; i++) {
                this.state.temporal.push({
                    id_puesto: data[i][0],
                    Name: data[i][1],
                    Caption: data[i][2],
                    Item_image: data[i][3],
                    Item_Name: data[i][4],
                    id_departamento: data[i][5]
                })
            }
            items = this.state.temporal;
            x = false;
            this.forceUpdate();

        } catch (err) {
            console.log(err);
        }

    }

    toggleIndicators() {
        this.setState({
            indicators: !this.state.indicators
        })
    }

    toggleNavButtonsAlwaysVisible() {
        this.setState({
            navButtonsAlwaysVisible: !this.state.navButtonsAlwaysVisible
        })
    }

    changeAnimation(event) {
        this.setState({
            animation: event.target.value
        })
    }

    render() {
        return (
            <div style={{ marginTop: "50px", color: "#494949" }}>
                <Grid container justifyContent="flex-end">
                    <Button component={Link} to="/Login" variant="outlined">
                        Iniciar Sesion
                    </Button>
                </Grid>

                <h2 className="Title">Puestos Disponibles</h2>

                <Carousel
                    className="Example"
                    autoPlay={this.state.autoPlay}
                    animation={this.state.animation}
                    indicators={this.state.indicators}
                    timeout={this.state.timeout}
                    cycleNavigation={this.state.cycleNavigation}
                    navButtonsAlwaysVisible={this.state.navButtonsAlwaysVisible}
                    navButtonsAlwaysInvisible={this.state.navButtonsAlwaysInvisible}
                // next={(now, previous) => console.log(`Next User Callback: Now displaying child${now}. Previously displayed child${previous}`)}
                // prev={(now, previous) => console.log(`Prev User Callback: Now displaying child${now}. Previously displayed child${previous}`)}
                // onChange={(now, previous) => console.log(`OnChange User Callback: Now displaying child${now}. Previously displayed child${previous}`)}
                >
                    {
                        items.map((item, index) => {
                            return <Banner item={item} key={index} contentPosition={item.contentPosition} />
                        })
                    }
                </Carousel>
                {
                    x && (
                        <Box >
                            <Skeleton />
                            <Skeleton />
                            <Skeleton variant="rectangular" height={200} />
                            <Skeleton />
                            <Skeleton variant="rectangular" height={150} />
                        </Box>
                    )
                }
            </div>

        )
    }
}

export default Carrousel;