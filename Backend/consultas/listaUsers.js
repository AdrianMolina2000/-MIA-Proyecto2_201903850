const oracle = require('oracledb');
const connect = {
    user: "BD1",
    password: "1234",
    connectString: "34.125.232.237:1521/ORCL18"
};

async function prueba(req,res){
    try{
        conexion=await oracle.getConnection(connect)
        resultado=await conexion.execute('select ID_USUARIO,  USERNAME, PASSWORD, R.NOMBRE_ROL, D.NOMBRE_DEPARTAMENTO, to_char(FECHA_INI,\'DD/MM/YYYY\') '+
        'from USUARIO '+
        `inner join DEPARTAMENTO D on D.ID_DEPARTAMENTO = USUARIO.ID_DEPARTAMENTO `+
        `inner join ROL R on R.ID_ROL = USUARIO.ID_ROL `+
        `where ESTADO = 1 `)

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
        return res.send("Sin datos")
    }else{
        return res.send(resultado.rows)
    }
}


module.exports = { lista_Users: prueba }