const oracle = require('oracledb');
const connection = require('../connect') 
const connect = connection.connect


async function prueba(req,res){
    try{
        conexion=await oracle.getConnection(connect)
        resultado=await conexion.execute(
        "select E.NOMBRES, E.APELLIDOS, P.NOMBRE_PUESTO, D.NOMBRE_DEPARTAMENTO "+
        "from USUARIO U "+
        "inner join DEPARTAMENTO D on D.ID_DEPARTAMENTO = U.ID_DEPARTAMENTO "+
        "inner join EXPEDIENTE E on U.ID_USUARIO = E.ID_USUARIO "+
        "inner join PUESTO P on P.ID_PUESTO = E.ID_PUESTO "+
        `where U.ID_ROL = 4 `
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


module.exports = { reporte1: prueba }