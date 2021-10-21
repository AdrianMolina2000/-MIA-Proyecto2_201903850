const express=require('express')
const app=express();
const oracle=require('oracledb')
const port=5670
cns={
    user:"BD1",
    password:"1234",
    connectString:"34.125.94.231:1521/orcl18"
}

async function prueba(req,res){
    try{
        conexion=await oracle.getConnection(
            {
                user:"BD1",
                password:"1234",
                connectString:"34.125.94.231:1521/ORCL18"
            }
        )
        resultado=await conexion.execute('SELECT * FROM temporal where temporal.nombre = \'Adrian\'')
        console.log(resultado.rows)
    }catch(err){
        return res.send(err.message)
    }
    if(resultado.rows.length==0){
        return res.send("No hay datos ingresados en esta tabla")
    }else{
        return res.send(resultado.rows)
    }
}




app.get('/',(req,res)=>{
    prueba(req,res)
})

app.listen(port,()=>{
    console.log("Servidor en el puerto",port)
})