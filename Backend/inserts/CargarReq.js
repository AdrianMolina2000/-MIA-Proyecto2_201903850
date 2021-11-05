const oracle = require('oracledb');
const connection = require('../connect') 
const connect = connection.connect


async function prueba(req, res) {

    try {
        soli = JSON.parse(req.body.datos);
        const file = req.files.file;
        const filename = file.name.split('.');
        let extension = filename[1];
        console.log(extension)
        // console.log(soli);
        conexion = await oracle.getConnection(connect)
        resultado = await conexion.execute(
            `CALL CargarReq('${soli.nombre}', '${soli.fecha}', `+ 
            `'./Upload/${soli.dpi}-${soli.nombre}.${extension}', ${soli.id_expediente}`+
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

module.exports = { CargarReq: prueba }