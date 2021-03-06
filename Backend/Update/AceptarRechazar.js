const oracle = require('oracledb');
const connection = require('../connect') 
const connect = connection.connect

async function prueba(req, res) {

    try {
        conexion = await oracle.getConnection(connect)
        resultado = await conexion.execute(
            `CALL CorregirExp(${req.body.id_doc}, ${req.body.accept}, ${req.body.id_exp}) `
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