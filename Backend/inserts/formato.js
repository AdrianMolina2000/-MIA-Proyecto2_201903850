const oracle = require('oracledb');
const connection = require('../connect') 
const connect = connection.connect

async function prueba(req, res) {
// function prueba(req, res) {
    let nombres = [];
    let formato = [];
    let formato2 = [];

    for (let i = 0; i < req.body.length; i++) {
        for(let j = 0; j < req.body[i].puesto_requisitos.length; j++){
            // let forms = [];
            for(let k = 0; k < req.body[i].puesto_requisitos[j].requisito_formato.length; k++){
                if (nombres.includes(req.body[i].puesto_requisitos[j].requisito_formato[k]) !== true) {

                    // forms.push(req.body[i].puesto_requisitos[j].requisito_formato[k]);
                    formato2.push(req.body[i].puesto_requisitos[j].requisito_formato[k]);
                }
                nombres.push(req.body[i].puesto_requisitos[j].requisito_formato[k]);
            }
            // formato.push(forms);
        }
    }


    for (let i = 0; i < formato2.length; i++) {
        try {
            conexion = await oracle.getConnection(connect)
            resultado = await conexion.execute(
                "insert into FORMATO (NOMBRE_FORMATO) "+
                `values ('${formato2[i]}')`
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

module.exports = { formato: prueba }