const oracle = require('oracledb');
const connection = require('../connect') 
const connect = connection.connect


async function prueba(req,res){
    try{
        conexion=await oracle.getConnection(connect)
        resultado=await conexion.execute(
        "select D.NOMBRE_DOCUMENTO, D.LINK_DESCARGA "+
        "from DOCUMENTO D "+
        "inner join EXPEDIENTE E on E.ID_EXPEDIENTE = D.ID_EXPEDIENTE "+
        `where E.ID_EXPEDIENTE = ${req.body.id_exp} `+
        `and D.ACEPTADO = 1 `)

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


module.exports = { requisitoAceptado: prueba }