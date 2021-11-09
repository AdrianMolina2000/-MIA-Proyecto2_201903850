const oracle = require('oracledb');
const connection = require('../connect') 
const connect = connection.connect


async function prueba(req,res){
    try{
        conexion=await oracle.getConnection(connect)
        resultado=await conexion.execute(
        "select E.ID_USUARIO, E.DPI, E.NOMBRES, E.APELLIDOS, P.NOMBRE_PUESTO, P.SALARIO "+
        "from EXPEDIENTE E "+
        "inner join USUARIO U on U.ID_USUARIO = E.ID_USUARIO "+
        "inner join PUESTO P on P.ID_PUESTO = E.ID_PUESTO "+
        "where E.CORREGIR = 0 "+
        "and U.ID_DEPARTAMENTO is null "+
        "and U.ESTADO = 1 "+
        `and E.ID_DEPARTAMENTO = ${req.body.id_dep} `
        )

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


module.exports = { expedientesAceptado: prueba }