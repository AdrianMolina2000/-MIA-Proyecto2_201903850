const express=require('express')
const fileUpload = require('express-fileupload');
const util = require('util')
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
const solicitud = require('./inserts/solicitud');
const CoorRev = require('./inserts/CoorRev');


const puestosC = require('./consultas/puestos');
const DepartamentosCoor = require('./consultas/DepartamentosCoor');
const DepartamentosRev = require('./consultas/DepartamentosRev');
const usuarios_cons = require('./consultas/usuarios');
const listaUsers = require('./consultas/listaUsers');


const update_user = require('./Update/update_usuario');


const delete_user = require('./Update/deleteUser');


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

app.get('/puestos',(req,res)=>{
    puestosC.puestos(req,res)
})

app.get('/DepartamentosCoor',(req,res)=>{
    DepartamentosCoor.Departamentos(req,res)
})

app.get('/DepartamentosRev',(req,res)=>{
    DepartamentosRev.Departamentos(req,res)
})

app.post('/auth', (req, res) => {
    usuarios_cons.usuarios_cons(req, res);
})

app.post('/CrearCoor',(req,res)=>{
    CoorRev.CoorRev(req, res);
})

app.put('/UpUsuario',(req,res)=>{
    update_user.update_user(req,res)
})

app.put('/DelUsuario',(req,res)=>{
    delete_user.delete_user(req,res)
})

app.get('/listaUsers',(req,res)=>{
    listaUsers.lista_Users(req, res);
})



//Documentos
app.use(fileUpload());

app.post('/solicitud',(req,res)=>{
    const path = "../public/Upload/";
    const file = req.files.file;
    const filename = file.name;

    const datos = JSON.parse(req.body.datos);
    console.log(filename)

    file.mv(`${path}${datos.DPI}-${filename}`, (err)=>{
        if(err){
            res.status(500).send({message:"Falla al subir el archivo", code:200})
        }else{
            res.status(500).send({message:"Archivo subido con exito", code:200})
            solicitud.solicitud(req,res)
        }
    })

})

app.listen(port,()=>{
    console.log("Servidor en el puerto",port)
})