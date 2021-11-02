const oracle = require('oracledb');
const connect = {
    user: "BD1",
    password: "1234",
    connectString: "34.125.232.237:1521/ORCL18"
};

async function prueba(req,res){
    try{
        conexion=await oracle.getConnection(connect)
        resultado=await conexion.execute(
        "select E.DPI, E.NOMBRES, E.APELLIDOS, E.EMAIL, E.DIRECCION, E.TELEFONO, "+
        "to_char(E.FECHA_POST,'DD/MM/YYYY') FECHA, P.NOMBRE_PUESTO, E.CV, E.ID_EXPEDIENTE, E.ID_REV_EXP, U.ID_DEPARTAMENTO "+
        "from EXPEDIENTE E "+
        "inner join PUESTO P on P.ID_PUESTO = E.ID_PUESTO "+
        "inner join REVISOR_EXPEDIENTES RE on RE.ID_REVISOR_EXPEDIENTES = E.ID_REV_EXP "+
        "inner join USUARIO U on RE.ID_USUARIO = U.ID_USUARIO "+
        "where E.REVISADO = 0 "+
        `and RE.ID_USUARIO = ${req.body.id_revisor} `)

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


module.exports = { Revisor: prueba }