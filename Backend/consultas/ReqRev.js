const oracle = require('oracledb');
const connection = require('../connect') 
const connect = connection.connect


async function prueba(req,res){
    try{
        conexion=await oracle.getConnection(connect)
        resultado=await conexion.execute(
        "select D.ID_DOCUMENTO, D.NOMBRE_DOCUMENTO, D.LINK_DESCARGA, E.EMAIL, D.ID_EXPEDIENTE "+
        "from DOCUMENTO D "+
        "inner join EXPEDIENTE E on E.ID_EXPEDIENTE = D.ID_EXPEDIENTE "+
        `inner join REVISOR_EXPEDIENTES RE on RE.ID_REVISOR_EXPEDIENTES = E.ID_REV_EXP `+
        `where RE.ID_USUARIO = ${req.body.id_rev} `+
        `and D.ACEPTADO = 2 `)

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


module.exports = { requisitoRevisar: prueba }