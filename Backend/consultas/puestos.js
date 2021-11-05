const oracle = require('oracledb');
const connection = require('../connect') 
const connect = connection.connect


async function prueba(req,res){
    try{
        conexion=await oracle.getConnection(connect)
        resultado=await conexion.execute('select PUESTO.ID_PUESTO, NOMBRE_PUESTO, SALARIO, LINK_IMAGEN, '+
        'LISTAGG(C2.NOMBRE_CATEGORIA, \', \') within group ( order by C2.NOMBRE_CATEGORIA) as Categorias, '+
        'PD.ID_DEPARTAMENTO '+
        'from PUESTO '+
        'INNER JOIN PUESTO_CATEGORIA PC on PUESTO.ID_PUESTO = PC.ID_PUESTO '+
        'INNER JOIN CATEGORIA C2 on PC.ID_CATEGORIA = C2.ID_CATEGORIA '+
        'INNER JOIN PUESTO_DEPARTAMENTO PD on PUESTO.ID_PUESTO = PD.ID_PUESTO '+
        'group by PUESTO.ID_PUESTO, NOMBRE_PUESTO, SALARIO, LINK_IMAGEN, PD.ID_DEPARTAMENTO ')

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
        return res.send("No hay datos")
    }else{
        return res.send(resultado.rows)
    }
}


module.exports = { puestos: prueba }