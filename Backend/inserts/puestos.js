const oracle = require('oracledb');
const connect = {
    user: "BD1",
    password: "1234",
    connectString: "34.125.232.237:1521/ORCL18"
};

async function prueba(req, res) {
    let nombres = [];
    let puestos = [];

    for (let i = 0; i < req.body.length; i++) {
        if (nombres.includes(req.body[i].puesto_nombre) !== true) {
            puestos.push({
                nombre: req.body[i].puesto_nombre,
                salario: req.body[i].puesto_salario,
                imagen: req.body[i].puesto_imagen
            });
        }
        nombres.push(req.body[i].puesto_nombre);
    }
    
    for (let i = 0; i < puestos.length; i++) {
        try {
            conexion = await oracle.getConnection(connect)
            resultado = await conexion.execute("insert into PUESTO (NOMBRE_PUESTO, SALARIO, LINK_IMAGEN) "+
                                               `values ('${puestos[i].nombre}', ${puestos[i].salario}, '${puestos[i].imagen}')`, [], { autoCommit: true });
        } catch (err) {
            console.log(err.message);
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
    }
}

module.exports = { puesto: prueba }