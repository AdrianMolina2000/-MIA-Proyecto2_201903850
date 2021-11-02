const oracle = require('oracledb');
const connect = {
    user: "BD1",
    password: "1234",
    connectString: "34.125.232.237:1521/ORCL18"
};

async function prueba(req,res){
    try{
        conexion=await oracle.getConnection(connect)
        resultado=await conexion.execute('select ID_USUARIO, USERNAME, ID_ROL '+
        'from USUARIO '+
        `where USUARIO.USERNAME =  '${req.body.nickname}' `+
        `and USUARIO.PASSWORD = '${req.body.password}' `)

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
        return res.send("Nickname or password incorrect")
    }else{
        return res.send(resultado.rows)
    }
}


module.exports = { usuarios_cons: prueba }