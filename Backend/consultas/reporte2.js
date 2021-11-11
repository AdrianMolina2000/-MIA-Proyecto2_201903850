const oracle = require('oracledb');
const connection = require('../connect') 
const connect = connection.connect


async function prueba(req,res){
    try{
        conexion=await oracle.getConnection(connect)
        resultado=await conexion.execute(
        "select D.NOMBRE_DEPARTAMENTO, COUNT(U.ID_USUARIO) Cantidad "+
        "from DEPARTAMENTO D "+
        "INNER JOIN USUARIO U on D.ID_DEPARTAMENTO = U.ID_DEPARTAMENTO "+
        "where U.ID_ROL = 4 "+
        "group by  D.NOMBRE_DEPARTAMENTO "+
        "ORDER BY Cantidad DESC "+
        `fetch next 5 rows only `
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


module.exports = { reporte2: prueba }