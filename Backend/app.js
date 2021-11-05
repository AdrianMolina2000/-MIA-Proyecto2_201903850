const express=require('express')
const fileUpload = require('express-fileupload');
const util = require('util')
const app=express();
const oracle=require('oracledb');
const cors = require('cors');
const nodeMailer = require('nodemailer');

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
const cargarReq = require('./inserts/CargarReq');


const puestosC = require('./consultas/puestos');
const DepartamentosCoor = require('./consultas/DepartamentosCoor');
const DepartamentosRev = require('./consultas/DepartamentosRev');
const usuarios_cons = require('./consultas/usuarios');
const listaUsers = require('./consultas/listaUsers');
const revisor = require('./consultas/Revisor');
const aplicante = require('./consultas/Aplicante');
const requisitos = require('./consultas/Requisitos');
const requAccept = require('./consultas/RequAccept');
const requRev = require('./consultas/ReqRev');


const update_user = require('./Update/update_usuario');


const delete_user = require('./Update/deleteUser');
const rechazar = require('./Update/Rechazar');
const aceptar = require('./Update/Aceptar');
const aceptarRechazar = require('./Update/AceptarRechazar');


app.use(cors());
app.use(express.json());

cns={
    user:"BD1",
    password:"1234",
    connectString:"34.125.36.122:1521/orcl18"
}


//NODE MAILER
var transport = nodeMailer.createTransport({
    service: 'gmail',
    auth:{
        user:'adriansmc2@gmail.com',
        pass:'Adriansmc2224'

    }
})

//CONSULTAS
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

app.post('/Revisor',(req,res)=>{
    revisor.Revisor(req, res);
})

app.post('/Aplicante',(req,res)=>{
    aplicante.Aplicante(req, res);
})

app.post('/Rechazar',(req,res)=>{
    rechazar.rechazar(req,res)
})


RandomPass = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let resultado = "";
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
      resultado += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }

    return resultado;
};

app.post('/Aceptar',(req,res)=>{
    var password = RandomPass()
    aceptar.aceptar(req, res, password)

    var mailOptions = {
        from: 'adriansmc2@gmail.com',
        to: req.body.email,
        subject: 'Nuevo Aplicante',
        text: `Haz sido aceptado para ser parte del departamento, Felicidades. \n`+
        `Tus credenciales son: \nUsuario: ${req.body.dpi} \n${password}`
    }

    transport.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error)
        }
    })
})

app.post('/Requisitos',(req,res)=>{
    requisitos.Requisitos(req, res);
})

app.post('/RequAccept',(req,res)=>{
    requAccept.requisitoAceptado(req, res);
})

app.post('/RequRev',(req,res)=>{
    requRev.requisitoRevisar(req, res);
})

app.put('/AceptarRechazar',(req,res)=>{
    aceptarRechazar.aceptarRechazar(req,res)

    if(!req.body.accept){
        var mailOptions = {
            from: 'adriansmc2@gmail.com',
            to: req.body.email,
            subject: 'Documento Rechazado',
            text: `El requisito ${req.body.nombre} ha sido rechazado por: ${req.body.razon} `
        }
    
        transport.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error)
            }
        })
    }
})

//Documentos
app.use(fileUpload());

app.post('/solicitud',(req,res)=>{
    const path = "../public/Upload/";
    const file = req.files.file;
    const filename = file.name;

    const datos = JSON.parse(req.body.datos);

    file.mv(`${path}${datos.DPI}-${filename}`, (err)=>{
        if(err){
            res.status(500).send({message:"Falla al subir el archivo", code:200})
        }else{
            res.status(500).send({message:"Archivo subido con exito", code:200})
            solicitud.solicitud(req,res)
        }
    })

    var soli = JSON.parse(req.body.datos)
    var mailOptions = {
        from: 'adriansmc2@gmail.com',
        to: 'adriansmc@gmail.com',
        subject: 'Nuevo Aplicante',
        text: `${soli.nombre} ${soli.apellido} se ha postulado como nuevo aplicante`
    }

    transport.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error)
        }
    })
})

app.post('/CargarRequisito',(req,res)=>{
    const path = "../public/Upload/";
    const file = req.files.file;
    const filename = file.name.split('.');
    let extension = filename[1];
    const datos = JSON.parse(req.body.datos);

    file.mv(`${path}${datos.dpi}-${datos.nombre}.${extension}`, (err)=>{
        if(err){
            res.status(500).send({message:"Falla al subir el archivo", code:200})
        }else{
            res.status(500).send({message:"Archivo subido con exito", code:200})
            cargarReq.CargarReq(req,res)
        }
    })
})


app.listen(port,()=>{
    console.log("Servidor en el puerto",port)
})