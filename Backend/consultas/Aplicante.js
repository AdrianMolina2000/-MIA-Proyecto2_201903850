const oracle = require('oracledb');
const connection = require('../connect') 
const connect = connection.connect


async function prueba(req,res){
    try{
        conexion=await oracle.getConnection(connect)
        resultado=await conexion.execute(
        "select E.ID_EXPEDIENTE, E.DPI, E.NOMBRES, E.APELLIDOS, E.EMAIL, E.DIRECCION, E.TELEFONO, E.CV, "+
        "E.REVISADO, E.CORREGIR, to_char(E.FECHA_POST,'DD/MM/YYYY'), E.ID_PUESTO, P.NOMBRE_PUESTO "+
        "from EXPEDIENTE E "+
        "inner join PUESTO P on P.ID_PUESTO = E.ID_PUESTO "+
        `where E.ID_USUARIO = ${req.body.id_aplicante} `)

        // console.log(resultado.rows)
    }catch(err){
        return res.send(err.message)
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
    if(resultado.rows.length==0){
        return res.send("No hay revisor")
    }else{
        return res.send(resultado.rows)
    }
}


module.exports = { Aplicante: prueba }