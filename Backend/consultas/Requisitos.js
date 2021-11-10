const oracle = require('oracledb');
const connection = require('../connect') 
const connect = connection.connect


async function prueba(req,res){
    try{
        console.log(req.body)
        conexion=await oracle.getConnection(connect)
        resultado=await conexion.execute(
        "select R.NOMBRE_REQUISITO, PR.TAMANIO_REQUISITO, PR.OBLIGATORIO, "+
        "LISTAGG(F.NOMBRE_FORMATO, ',') within group ( order by F.NOMBRE_FORMATO) as Formatos "+
        "from PUESTO_REQUISITO PR "+
        "inner join REQUISITO R on R.ID_REQUISITO = PR.ID_REQUISITO "+
        "inner join FORMATO_REQUISITO FR on R.ID_REQUISITO = FR.ID_REQUISITO "+
        "inner join FORMATO F on F.ID_FORMATO = FR.ID_FORMATO "+
        "WHERE not Exists( "+
        "select * from( "+
        "select D.NOMBRE_DOCUMENTO "+
        "FROM DOCUMENTO D "+
        `where D.ID_EXPEDIENTE = ${req.body.id_exp} `+
        `and (D.ACEPTADO = 2 or D.ACEPTADO = 1) `+
        `)docs `+
        `inner join REQUISITO R on R.ID_REQUISITO = PR.ID_REQUISITO `+
        `where R.NOMBRE_REQUISITO = docs.NOMBRE_DOCUMENTO `+
        `) `+
        `and PR.ID_PUESTO = ${req.body.id_puesto}`+
        `group by PR.ID_REQUISITO, R.NOMBRE_REQUISITO, PR.TAMANIO_REQUISITO, PR.OBLIGATORIO `)

        console.log(resultado.rows)
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


module.exports = { Requisitos: prueba }