//auth.service.js
//El service es el único que habla con la base de datos (consultas SQL)
const conexion = require('../config/database')
const {User} = require('../models/user.model')

//Inserta un usuario nuevo en la tabla users
async function newUser(user,callback){
    //Los ? se llenan con el arreglo de abajo; así evitamos inyección SQL
    const query = "INSERT INTO users(name,email,password,role_id) VALUES(?,?,?,?)"
    //const passwordHash =await bcrypt.hash(password,10)
    conexion.query(query,[user.name,user.email,user.password,user.rol],(error,result)=>{
        if(error){
            callback("Error al registrar un nuevo user",null)
            return 
        }
        callback(null,result)
        return
    })//La password ya es la versión Hasheada desde el controller anterior
}
//Busca un usuario por correo y trae también el nombre de su rol (JOIN con roles)
function searchUserByEmail(email,callback) {
    const query = `SELECT u.id, u.name, u.email, u.password, r.name AS rol FROM users AS u JOIN roles AS r ON u.role_id = r.id WHERE u.email = ?`//No agregamos la password, ya que es más fácil al momento de comparar solo el email, ya que si el email por defecto esta mal compararemos la contra para nada
    conexion.query(query,[email], (error,results)=>{
        if(error){
            //Falló la consulta (problema del servidor o la base de datos)
            callback("Error del servidor",null)
            return
        }
        if(results.length===0){
            //No hay ningún usuario con ese correo
            callback("Credenciales invalidas",null)
            return
        }
        //Como nos devuelve una lista, simplemente seleccionamos el primero ya que solo seleccionamos 1 user
        const result = results[0];
        //Se convierte a objeto User para devolver una estructura ordenada
        const newUser=new User(result.id,result.name,result.email,result.password,result.rol)
        callback(null,newUser)
    })
}
module.exports = { 
    newUser ,
    searchUserByEmail
};