const oracle = require('oracledb');
const connect = {
    user: "BD1",
    password: "1234",
    connectString: "34.125.232.237:1521/ORCL18"
};

async function prueba(req, res, password) {

    try {
        soli = req.body;
        conexion = await oracle.getConnection(connect)
        resultado = await conexion.execute(
            `CALL AceptarExp(${soli.id}, ${soli.id_rev_exp}, '${soli.dpi}', '${password}' ,'${soli.fecha}', ${soli.dep}`+
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