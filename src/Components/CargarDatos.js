import { TextField } from '@mui/material';
import React, { Component, useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import axios from 'axios';

class CargaDatos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            myValue: ''
        };
    }


    temporal = [];


    readFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileReader = new FileReader();

            fileReader.readAsText(file);

            fileReader.onload = () => {
                try {
                    let xml = fileReader.result
                    this.setState({ myValue: xml });

                    // METODO 2
                    var XMLParser = require('react-xml-parser');
                    var JString = new XMLParser().parseFromString(xml);

                    // console.log(JString);



                    for (let n1 = 0; n1 < JString.children.length; n1++) {
                        this.recorrer(JString.children[n1], "CEO");
                    }

                    console.log(this.temporal);




                } catch (e) {
                    console.log(e);
                }
            }
            fileReader.onerror = () => {
                console.log(fileReader.error);
            }
        }
    }

    recorrer(dep, padre) {
        let nombre_dep;
        let padre_dep = padre;
        let capital_dep;

        for (let n2 = 0; n2 < dep.children.length; n2++) {
            if (dep.children[n2].name === "nombre") {
                nombre_dep = dep.children[n2].value;

            } else if (dep.children[n2].name === "capital_total") {
                capital_dep = dep.children[n2].value;

            } else if (dep.children[n2].name === "departamentos") {
                for (let n3 = 0; n3 < dep.children[n2].children.length; n3++) {
                    this.recorrer(dep.children[n2].children[n3], nombre_dep)
                }
            }
            else if (dep.children[n2].name === "puestos") {
                for (let n3 = 0; n3 < dep.children[n2].children.length; n3++) {
                    let nombre_puesto;
                    let salario_puesto;
                    let imagen_puesto;
                    let requisitos;
                    let categorias

                    for (let n4 = 0; n4 < dep.children[n2].children[n3].children.length; n4++) {
                        if (dep.children[n2].children[n3].children[n4].name === "nombre") {
                            nombre_puesto = dep.children[n2].children[n3].children[n4].value;
                        } else if (dep.children[n2].children[n3].children[n4].name === "salario") {
                            salario_puesto = dep.children[n2].children[n3].children[n4].value;
                        } else if (dep.children[n2].children[n3].children[n4].name === "imagen") {
                            imagen_puesto = dep.children[n2].children[n3].children[n4].value;
                        } else if (dep.children[n2].children[n3].children[n4].name === "requisitos") {
                            let requis = dep.children[n2].children[n3].children[n4].getElementsByTagName('requisito');
                            requisitos = [];

                            for (let n5 = 0; n5 < requis.length; n5++) {
                                let nombre_req;
                                let tama_req;
                                let obligatorio_req;
                                let formato_req;
                                for (let n6 = 0; n6 < requis[n5].children.length; n6++) {


                                    if (requis[n5].children[n6].name === "nombre") {
                                        nombre_req = requis[n5].children[n6].value;
                                    } else if (requis[n5].children[n6].name === "tama") {
                                        tama_req = requis[n5].children[n6].value;
                                    } else if (requis[n5].children[n6].name === "obligatorio") {
                                        obligatorio_req = requis[n5].children[n6].value;
                                    } else if (requis[n5].children[n6].name === "formatos") {
                                        let formatoes = requis[n5].children[n6].getElementsByTagName('nombre');
                                        formato_req = [];
                                        for(let n7 = 0; n7 < formatoes.length; n7++){
                                            formato_req.push(formatoes[n7].value);
                                        }
                                    }
                                }
                                requisitos.push({
                                    requisito_nombre: nombre_req,
                                    requisito_tama: tama_req,
                                    requisito_obligatorio: obligatorio_req,
                                    requisito_formato: formato_req
                                })
                            }
                        } else if (dep.children[n2].children[n3].children[n4].name === "categorias") {
                            let cates = dep.children[n2].children[n3].children[n4].getElementsByTagName('nombre');
                            categorias = [];

                            for (let n5 = 0; n5 < cates.length; n5++) {
                                categorias.push(cates[n5].value)
                            }
                        }
                    }

                    let carga = {
                        departamento_padre: padre_dep,
                        departamento_nombre: nombre_dep,
                        departamento_capital: capital_dep,
                        puesto_nombre: nombre_puesto,
                        puesto_salario: salario_puesto,
                        puesto_imagen: imagen_puesto,
                        puesto_requisitos: requisitos,
                        puesto_categorias: categorias
                    };

                    this.temporal.push(carga);
                }
            }
        }
    }

    cargarD = (e) => {
        axios.post('http://localhost:5670/carga', this.temporal)
    }

    render() {
        return (
            <div>
                <br />
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Datos a ingresar"
                            variant="outlined"
                            placeholder="Ingrese los datos a cargar"
                            multiline
                            fullWidth
                            rows={10}
                            value={this.state.myValue}
                            onChange={(e) => this.setState({ myValue: e.target.value })}
                        />
                    </Grid>


                    <Grid item xs={2}>
                        <form onSubmit={this.sendModelo}>
                            <Button
                                variant="outlined"
                                type="submit"
                                onClick={this.cargarD}
                            >Cargar Datos</Button>
                        </form>
                    </Grid>


                    <Grid item xs={3}>
                        <label htmlFor="botonCarga">
                            <Button variant="outlined" component="span">Cargar Documento</Button>
                        </label>

                        <input
                            id="botonCarga"
                            style={{ display: 'none' }}
                            type="file"
                            multiple={false}
                            accept=".xml"
                            onChange={this.readFile}
                        />
                    </Grid>

                </Grid>
            </div>
        )
    }

}
export default CargaDatos;