const oracle = require('oracledb');
const connect = {
    user: "BD1",
    password: "1234",
    connectString: "34.125.45.107:1521/ORCL18"
};

async function prueba(req, res) {

    try {
        coor = req.body;
        conexion = await oracle.getConnection(connect)
        resultado = await conexion.execute(
            "update USUARIO "+
            `set ESTADO = 0, FECHA_FIN =  TO_DATE('${coor.fecha}', 'DD/MM/YYYY') `+
            `where ID_USUARIO = ${coor.id}`
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

module.exports = { delete_user: prueba }