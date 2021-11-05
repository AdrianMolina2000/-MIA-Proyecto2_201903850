const oracle = require('oracledb');
const connection = require('../connect') 
const connect = connection.connect

async function prueba(req, res) {
// function prueba(req, res) {
    let requisitos = [];

    for (let i = 0; i < req.body.length; i++) {
        for (let j = 0; j < req.body[i].puesto_requisitos.length; j++) {
            requisitos.push({
                nombre: req.body[i].puesto_requisitos[j].requisito_nombre
                // obligatorio: req.body[i].puesto_requisitos[j].requisito_obligatorio,
                // tama: req.body[i].puesto_requisitos[j].requisito_tama
            });
        }
    }

    for (let i = 0; i < requisitos.length; i++) {
        try {
            conexion = await oracle.getConnection(connect)
            resultado = await conexion.execute("insert into REQUISITO (NOMBRE_REQUISITO) " +
                `values ('${requisitos[i].nombre}')`, [], { autoCommit: true });
        } catch (err) {
            console.log(err.message);
        } 
        finally {
            if (conexion) {
                try {
                    await conexion.close();
                } catch (err) {
                    console.log(err.message + "----")
                }
            }
        }
    }
}

module.exports = { requisito: prueba }