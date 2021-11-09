const oracle = require('oracledb');
const connection = require('../connect') 
const connect = connection.connect

async function prueba(req, res, password) {

    try {
        soli = req.body;
        conexion = await oracle.getConnection(connect)
        resultado = await conexion.execute(
            `CALL eliminarPlantilla(${soli.id_dep}, ${soli.id_user}, ${soli.salario} `+
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

module.exports = { eliminar: prueba }