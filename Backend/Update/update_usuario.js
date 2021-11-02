const oracle = require('oracledb');
const connect = {
    user: "BD1",
    password: "1234",
    connectString: "34.125.232.237:1521/ORCL18"
};

async function prueba(req, res) {

    try {
        coor = req.body;
        conexion = await oracle.getConnection(connect)
        resultado = await conexion.execute(
            "update USUARIO "+
            `set USERNAME = '${coor.userName}', PASSWORD = '${coor.password}' `+
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

module.exports = { update_user: prueba }