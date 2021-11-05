const oracle = require('oracledb');
const connection = require('../connect') 
const connect = connection.connect


async function prueba(req, res) {

    for (let i = 0; i < req.body.length; i++) {
        for (let j = 0; j < req.body[i].puesto_categorias.length; j++) {
            try {
                conexion = await oracle.getConnection(connect)
                resultado = await conexion.execute(
                    "insert into PUESTO_CATEGORIA (ID_CATEGORIA, ID_PUESTO) " +
                    "select CATEGORIA.id_categoria, PUESTO.id_puesto " +
                    "from CATEGORIA, PUESTO " +
                    `where CATEGORIA.NOMBRE_CATEGORIA = '${req.body[i].puesto_categorias[j]}' ` +
                    `and   PUESTO.NOMBRE_PUESTO = '${req.body[i].puesto_nombre}'`
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
    }
}

module.exports = { puesto_categoria: prueba }