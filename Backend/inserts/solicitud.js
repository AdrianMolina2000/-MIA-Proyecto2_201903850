const oracle = require('oracledb');
const connection = require('../connect') 
const connect = connection.connect

async function prueba(req, res) {

    try {
        soli = JSON.parse(req.body.datos);
        // console.log(soli);
        conexion = await oracle.getConnection(connect)
        resultado = await conexion.execute(
            `CALL RELACIONARREVISOR(${soli.DPI}, '${soli.nombre}', '${soli.apellido}', '${soli.email}', `+ 
            `'${soli.direccion}', ${soli.telefono}, './Upload/${soli.DPI}-${req.files.file.name}', `+
            `'${soli.fecha}', ${soli.id}, ${soli.id_depart}`+
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

module.exports = { solicitud: prueba }