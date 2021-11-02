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

// const MostrarCV = (props) => {
//     const [open, setOpen] = React.useState(false);

//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);


//     const style = {
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         width: 800,
//         height: 500,
//         bgcolor: 'background.paper',
//         border: '2px solid #000',
//         boxShadow: 24,
//         p: 4,
//     };


//     return (
//         <div>
//             <Button variant="outlined" className="ViewButton" onClick={handleOpen} fullWidth>Ver CV</Button>
//             <Modal
//                 aria-labelledby="transition-modal-title"
//                 aria-describedby="transition-modal-description"
//                 open={open}
//                 onClose={handleClose}
//                 closeAfterTransition
//                 BackdropComponent={Backdrop}
//                 BackdropProps={{
//                     timeout: 1000,
//                 }}
//             >
//                 <Fade in={open}>
//                     <Box sx={style}>
//                         {console.log(props.cv)}
//                         <embed src={props.cv} width="100%" height="100%" />
//                     </Box>
//                 </Fade>
//             </Modal>
//         </div>
//     );
// }


let rows = [];


export default class CrearUsers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: ''        
        };
    }

    

    // async componentDidMount() {
    //     const temporal = [];
    //     const id_revisor = JSON.parse(localStorage.getItem("user")).id
    //     try {
    //         const response = await axios.post('http://localhost:5670/Revisor', { id_revisor: id_revisor });
    //         const data = await response.data;
    //         if (typeof (data) !== typeof ("")) {

    //             for (let i = 0; i < data.length; i++) {
    //                 temporal.push({
    //                     id: i,
    //                     DPI: data[i][0],
    //                     nombre: data[i][1],
    //                     apellido: data[i][2],
    //                     email: data[i][3],
    //                     direccion: data[i][4],
    //                     telefono: data[i][5],
    //                     fecha: data[i][6],
    //                     puesto: data[i][7],
    //                     cv: data[i][8],
    //                     id2: data[i][9],
    //                     id_rev_exp: data[i][10],
    //                     id_dep: data[i][11]
    //                 })
    //             }
    //         } else {
    //             console.log("sin expedientes")
    //         }
    //         rows = temporal;
    //     } catch (err) {
    //         console.log(err);
    //     }

    //     console.log(temporal)
    //     this.forceUpdate();
    // }
    

    // Cambiar = (param) => {
    //     if (param) {
    //         this.state.id = param.id2
    //         this.state.cv = param.cv
    //         this.state.id_rev_exp = param.id_rev_exp
    //         this.state.dpi = param.DPI
    //         this.state.dep = param.id_dep
    //         this.state.fecha = fechaE;
    //         this.forceUpdate();
    //     }
    // }

    // Aceptar = (e) => {
    //     axios.post('http://localhost:5670/Aceptar', this.state)
    //     window.location.reload();
    // }

    // Rechazar = (e) => {
    //     axios.post('http://localhost:5670/Rechazar', { id: this.state.id, id_rev_exp: this.state.id_rev_exp })
    //     window.location.reload();
    // }

    render() {
        return (
            <div>
                Hola
            </div>
        )
    }
}