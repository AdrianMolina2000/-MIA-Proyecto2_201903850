const oracle = require('oracledb');
const connection = require('../connect') 
const connect = connection.connect


async function prueba(req,res){
    try{
        conexion=await oracle.getConnection(connect)
        resultado=await conexion.execute('select * from DEPARTAMENTO Dep WHERE not Exists( '+
        'select * from( '+
        'select Dep.ID_DEPARTAMENTO, Dep.NOMBRE_DEPARTAMENTO '+
        'FROM DEPARTAMENTO Dep '+
        'inner join USUARIO on Dep.ID_DEPARTAMENTO = USUARIO.ID_DEPARTAMENTO '+
        'inner join ROL on USUARIO.ID_ROL = ROL.ID_ROL '+
        'where rol.ID_ROL = 2 '+
        ')Coors '+
        'where Dep.ID_DEPARTAMENTO = Coors.ID_DEPARTAMENTO)')

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
        return res.send("No hay datos")
    }else{
        return res.send(resultado.rows)
    }
}


module.exports = { Departamentos: prueba }