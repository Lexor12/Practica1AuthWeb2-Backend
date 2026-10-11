//auth.service.js
const conexion = require('../config/database')
const {User} = require('../models/user.model')

async function newUser(user,callback){
    const query = "INSERT INTO users(name,email,password,role_id) VALUES(?,?,?,?)"
    //const passwordHash =await bcrypt.hash(password,10)
    conexion.query(query,[user.name,user.email,user.password,user.rol],(error,result)=>{
        if(error){
            if(error.code==='ER_DUP_ENTRY'){
                callback("Ese correo ya se esta utilizando.",null)
            }
            callback("Error al registrar un nuevo user",null)
            return 
        }
        callback(null,result)
        return
    })//La password ya es la versión Hasheada desde el controller anterior
}
function searchUserByEmail(email,callback) {
    const query = `SELECT u.id, u.name, u.email, u.password, r.name AS rol FROM users AS u JOIN roles AS r ON u.role_id = r.id WHERE u.email = ?`//No agregamos la password, ya que es más fácil al momento de comparar solo el email, ya que si el email por defecto esta mal compararemos la contra para nada
    conexion.query(query,[email], (error,results)=>{
        if(error){
            callback("Error del servidor",null)
            return
        }
        if(results.length===0){

            callback("Credenciales invalidas",null)
            return
        }

        //Como nos devuelve una lista, simplemente seleccionamos el primero ya que solo seleccionamos 1 user
        const result = results[0];
        const newUser=new User(result.id,result.name,result.email,result.password,result.rol)
        callback(null,newUser)
    })
}
module.exports = { 
    newUser ,
    searchUserByEmail
};