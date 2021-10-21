const oracle = require('oracledb');
const connect = {
    user: "BD1",
    password: "1234",
    connectString: "34.125.45.107:1521/ORCL18"
};

async function prueba(req, res) {
    // function prueba(req, res) {
    let nombres = [];
    let categoria = [];

    for (let i = 0; i < req.body.length; i++) {
        for (let j = 0; j < req.body[i].puesto_categorias.length; j++) {
            if (nombres.includes(req.body[i].puesto_categorias[j]) !== true) {
                categoria.push(req.body[i].puesto_categorias[j]);
            }
            nombres.push(req.body[i].puesto_categorias[j]);
        }
    }


    for (let i = 0; i < categoria.length; i++) {
        try {
            conexion = await oracle.getConnection(connect)
            resultado = await conexion.execute(
                "insert into CATEGORIA (NOMBRE_CATEGORIA) " +
                `values ('${categoria[i]}')`
                , [], { autoCommit: true });
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

module.exports = { categoria: prueba }