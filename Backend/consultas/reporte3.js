const oracle = require('oracledb');
const connection = require('../connect') 
const connect = connection.connect


async function prueba(req,res){
    try{
        conexion=await oracle.getConnection(connect)
        resultado=await conexion.execute(
        "select U.USERNAME, RE.TOTAL "+
        "from REVISOR_EXPEDIENTES RE "+
        "inner join USUARIO U on U.ID_USUARIO = RE.ID_USUARIO "+
        "where ID_ROL = 3 "+
        "and RE.TOTAL > 0 "+
        "ORDER BY RE.TOTAL DESC "+
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


module.exports = { reporte3: prueba }