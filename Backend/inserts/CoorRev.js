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
            "insert into USUARIO (USERNAME, PASSWORD, FECHA_INI, ESTADO, ID_ROL, ID_DEPARTAMENTO) "+
            `values ('${coor.userName}', '${coor.password}', TO_DATE('${coor.fechaIni}', 'DD/MM/YYYY'), 1, `+
            `${coor.id_rol}, ${coor.id_dep})`
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

module.exports = { CoorRev: prueba }