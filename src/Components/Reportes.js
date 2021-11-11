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

let reporte1 = [];
let reporte2 = [];
let reporte3 = [];
let reporte4 = [];
let reporte5 = [];

export default class Reportes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: ''
        };
    }

    async componentDidMount() {
        reporte1 = [];
        reporte2 = [];
        reporte3 = [];
        reporte4 = [];
        reporte5 = [];

        try {
            const response = await axios.get('http://localhost:5670/reporte1');
            const data = await response.data;
            if (typeof (data) !== typeof ("")) {
                for (let i = 0; i < data.length; i++) {
                    reporte1.push(
                        <li>{data[i][0]} || {data[i][1]} || {data[i][2]} || {data[i][3]}</li>
                    )
                }
            } else {
                console.log("sin expedientes")
            }
        } catch (err) {
            console.log(err);
        }
        
        try {
            const response = await axios.get('http://localhost:5670/reporte2');
            const data = await response.data;
            if (typeof (data) !== typeof ("")) {
                for (let i = 0; i < data.length; i++) {
                    reporte2.push(
                        <li>{data[i][0]} || {data[i][1]}</li>
                    )
                }
            } else {
                console.log("sin expedientes")
            }
        } catch (err) {
            console.log(err);
        }

        try {
            const response = await axios.get('http://localhost:5670/reporte3');
            const data = await response.data;
            if (typeof (data) !== typeof ("")) {
                for (let i = 0; i < data.length; i++) {
                    reporte3.push(
                        <li>{data[i][0]} || {data[i][1]}</li>
                    )
                }
            } else {
                console.log("sin expedientes")
            }
        } catch (err) {
            console.log(err);
        }


        try {
            const response = await axios.get('http://localhost:5670/reporte4');
            const data = await response.data;
            if (typeof (data) !== typeof ("")) {
                for (let i = 0; i < data.length; i++) {
                    reporte4.push(
                        <li>{data[i][0]} || {data[i][1]} || {data[i][2]}</li>
                    )
                }
            } else {
                console.log("sin expedientes")
            }
        } catch (err) {
            console.log(err);
        }
        
        try {
            const response = await axios.get('http://localhost:5670/reporte5');
            const data = await response.data;
            if (typeof (data) !== typeof ("")) {
                for (let i = 0; i < data.length; i++) {
                    reporte5.push(
                        <li>{data[i][0]}</li>
                    )
                }
            } else {
                console.log("sin expedientes")
            }
        } catch (err) {
            console.log(err);
        }

        this.forceUpdate();
    }



    render() {
        return (
            <div>
                <h2 className="Title">Reportes</h2>
                <div style={{ marginTop: "50px", color: "#494949" }}>
                    <h2 className="Title2">1. Planilla de personas contratadas</h2>
                    <ol>
                        <li>Nombre || Apellido || Puesto || Departamento</li>
                        {reporte1}
                    </ol>
                </div>
                <div style={{ marginTop: "50px", color: "#494949" }}>
                    <h2 className="Title2">2. Departamentos con más personas contratadas</h2>
                    <ol>
                        <li>Departamento || Cantidad</li>
                        {reporte2}
                    </ol>
                </div>
                <div style={{ marginTop: "50px", color: "#494949" }}>
                    <h2 className="Title2">3. Reclutadores con más invitaciones enviadas</h2>
                    <ol>
                        <li>UserName || Invitaciones</li>
                        {reporte3}
                    </ol>
                </div>
                <div style={{ marginTop: "50px", color: "#494949" }}>
                    <h2 className="Title2">4. Aplicantes con la mayor cantidad de documentos rechazados</h2>
                    <ol>
                        <li>Nombre || Apellido || Rechazados</li>
                        {reporte4}
                    </ol>
                </div>
                <div style={{ marginTop: "50px", color: "#494949" }}>
                    <h2 className="Title2">5. Departamentos con mayor uso de su capital total</h2>
                    <ol>
                        <li>Departamento</li>
                        {reporte5}
                    </ol>
                </div>
            </div>
        )
    }
}


