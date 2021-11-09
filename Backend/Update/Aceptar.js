const oracle = require('oracledb');
const connection = require('../connect') 
const connect = connection.connect

async function prueba(req, res, password) {

    try {
        soli = req.body;
        conexion = await oracle.getConnection(connect)
        resultado = await conexion.execute(
            `CALL AceptarExp(${soli.id}, ${soli.id_rev_exp}, '${soli.dpi}', '${password}' ,'${soli.fecha}'`+
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

module.exports = { aceptar: prueba }