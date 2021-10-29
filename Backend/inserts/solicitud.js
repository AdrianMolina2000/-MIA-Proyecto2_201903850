const oracle = require('oracledb');
const connect = {
    user: "BD1",
    password: "1234",
    connectString: "34.125.45.107:1521/ORCL18"
};

async function prueba(req, res) {

    try {
        soli = JSON.parse(req.body.datos);
        // console.log(soli);
        conexion = await oracle.getConnection(connect)
        resultado = await conexion.execute(
            "insert into EXPEDIENTE (DPI, NOMBRES, APELLIDOS, EMAIL, DIRECCION, TELEFONO, CV, "+
            "REVISADO, CORREGIR, FECHA_POST, ID_PUESTO, ID_DEPARTAMENTO) " +
            `values (${soli.DPI}, '${soli.nombre}', '${soli.apellido}', '${soli.email}', `+
            `'${soli.direccion}', ${soli.telefono}, '../public/Upload/${soli.DPI}-${req.files.file.name}', ` +
            `0, 2, TO_DATE('${soli.fecha}', 'DD/MM/YYYY'), ${soli.id}, ${soli.id_depart} )`
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

module.exports = { solicitud: prueba }