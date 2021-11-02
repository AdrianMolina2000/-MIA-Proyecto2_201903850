const oracle = require('oracledb');
const connect = {
    user: "BD1",
    password: "1234",
    connectString: "34.125.232.237:1521/ORCL18"
};

async function prueba(req, res) {

    for (let i = 0; i < req.body.length; i++) {
        for (let j = 0; j < req.body[i].puesto_requisitos.length; j++) {
            try {
                conexion = await oracle.getConnection(connect)
                resultado = await conexion.execute(
                    "insert into PUESTO_REQUISITO (ID_REQUISITO, ID_PUESTO, TAMANIO_REQUISITO, OBLIGATORIO) " +
                    `select REQUISITO.id_requisito, PUESTO.id_puesto, ${req.body[i].puesto_requisitos[j].requisito_tama}, ${req.body[i].puesto_requisitos[j].requisito_obligatorio} ` +
                    "from PUESTO, REQUISITO " +
                    `where PUESTO.NOMBRE_PUESTO = '${req.body[i].puesto_nombre}' ` +
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

module.exports = { puesto_requisito: prueba }




