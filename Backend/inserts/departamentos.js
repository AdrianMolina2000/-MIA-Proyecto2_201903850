const oracle = require('oracledb');
const connection = require('../connect') 
const connect = connection.connect


async function prueba(req, res) {
    let nombres = [];
    let departamentos = [];

    for (let i = 0; i < req.body.length; i++) {
        if (nombres.includes(req.body[i].departamento_nombre) !== true) {
            departamentos.push({
                padre: req.body[i].departamento_padre,
                nombre: req.body[i].departamento_nombre,
                capital: req.body[i].departamento_capital
            });
        }
        nombres.push(req.body[i].departamento_nombre);
    }
    
    for (let i = 0; i < departamentos.length; i++) {
        try {
            conexion = await oracle.getConnection(connect)
            resultado = await conexion.execute('insert into DEPARTAMENTO (NOMBRE_DEPARTAMENTO, CAPITAL_DEPARTAMENTO, DEPARTAMENTO_PADRE) ' + 
                                               'values (\'' + departamentos[i].nombre + '\',' + departamentos[i].capital + ',\'' + departamentos[i].padre + '\')', [], { autoCommit: true });
        } catch (err) {
            console.log(err.message);
        }
        finally{
            if(conexion){
                try{
                    await conexion.close();
                }catch(err){
                    console.log(err.message)
                }
            }
        }
    }
}

module.exports = { dep: prueba }