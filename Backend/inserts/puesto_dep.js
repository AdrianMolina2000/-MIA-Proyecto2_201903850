const oracle = require('oracledb');
const connection = require('../connect') 
const connect = connection.connect

async function prueba(req, res) {

    for (let i = 0; i < req.body.length; i++) {
        try {
            conexion = await oracle.getConnection(connect)
            resultado = await conexion.execute(
                "insert into PUESTO_DEPARTAMENTO (ID_DEPARTAMENTO, ID_PUESTO) "+
                "select DEPARTAMENTO.id_departamento, PUESTO.id_puesto "+
                "from DEPARTAMENTO, PUESTO "+
                `where DEPARTAMENTO.NOMBRE_DEPARTAMENTO = '${req.body[i].departamento_nombre}' `+
                `and   PUESTO.NOMBRE_PUESTO = '${req.body[i].puesto_nombre}'`
                ,[], { autoCommit: true });
        } catch (err) {
            console.log(err.message);
        }
        finally{
            if(conexion){
                try{
                    await conexion.close();
                }catch(err){
                    console.log(err.message + "----")
                }
            }
        }
    }
}

module.exports = { puesto_dep: prueba }