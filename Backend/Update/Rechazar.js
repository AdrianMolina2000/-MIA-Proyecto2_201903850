const oracle = require('oracledb');
const connection = require('../connect') 
const connect = connection.connect


async function prueba(req, res) {

    try {
        soli = req.body;
        conexion = await oracle.getConnection(connect)
        resultado = await conexion.execute(
            `CALL RechazarExp(${soli.id}, ${soli.id_rev_exp}`+
            `)`, [], { autoCommit: true });
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

module.exports = { rechazar: prueba }