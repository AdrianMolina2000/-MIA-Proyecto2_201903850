const oracle = require('oracledb');
const connection = require('../connect') 
const connect = connection.connect

async function prueba(req, res) {

    try {
        conexion = await oracle.getConnection(connect)
        resultado = await conexion.execute(
            `update DOCUMENTO `+
            `set ACEPTADO = ${req.body.accept} `+
            `where ID_DOCUMENTO = ${req.body.id_doc} `
            , [], { autoCommit: true });
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

module.exports = { aceptarRechazar: prueba }