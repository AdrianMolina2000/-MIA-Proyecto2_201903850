const express=require('express')
const app=express();
const oracle=require('oracledb')
const cors = require('cors');
const port=5670;
const departamentos = require('./inserts/departamentos');
const puestos = require('./inserts/puestos');
const puesto_dep = require('./inserts/puesto_dep');
const formato = require('./inserts/formato');
const requisito = require('./inserts/requisito');
const formato_requisito = require('./inserts/formato_requisito');
const puesto_requisito = require('./inserts/puesto_requisito');
const categoria = require('./inserts/categoria');
const puesto_categoria = require('./inserts/puesto_categoria');

app.use(cors());
app.use(express.json());
cns={
    user:"BD1",
    password:"1234",
    connectString:"34.125.45.107:1521/orcl18"
}


async function prueba(req, res) {
    await departamentos.dep(req, res);
    await puestos.puesto(req,res);
    await puesto_dep.puesto_dep(req,res);
    await formato.formato(req,res);
    await requisito.requisito(req,res);
    await formato_requisito.formato_requisito(req,res);
    await puesto_requisito.puesto_requisito(req,res);
    await categoria.categoria(req,res);
    await puesto_categoria.puesto_categoria(req,res);
}

app.post('/carga',(req,res)=>{
    prueba(req, res);
})

app.listen(port,()=>{
    console.log("Servidor en el puerto",port)
})