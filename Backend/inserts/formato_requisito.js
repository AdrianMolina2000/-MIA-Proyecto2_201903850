const oracle = require('oracledb');
const connection = require('../connect') 
const connect = connection.connect


async function prueba(req, res) {

    for (let i = 0; i < req.body.length; i++) {
        for (let j = 0; j < req.body[i].puesto_requisitos.length; j++) {
            for (let k = 0; k < req.body[i].puesto_requisitos[j].requisito_formato.length; k++) {
                try {
                    conexion = await oracle.getConnection(connect)
                    resultado = await conexion.execute(
                        "insert into FORMATO_REQUISITO (ID_REQUISITO, ID_FORMATO) " +
                        "select REQUISITO.id_requisito, FORMATO.id_formato " +
                        "from FORMATO, REQUISITO " +
                        `where FORMATO.NOMBRE_FORMATO = '${req.body[i].puesto_requisitos[j].requisito_formato[k]}' ` +
                        `and   REQUISITO.NOMBRE_REQUISITO = '${req.body[i].puesto_requisitos[j].requisito_nombre}'`
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
}

module.exports = { formato_requisito: prueba }