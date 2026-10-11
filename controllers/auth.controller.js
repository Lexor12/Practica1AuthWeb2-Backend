//auth.controller.js
//El controller aplica la lógica: hashear contraseñas, compararlas y generar el token
const authService = require('../services/auth.service')
const bcrypt = require('bcrypt')//Para hashear y comparar contraseñas
const jwt = require('jsonwebtoken')//Para crear el token de sesión

async function register(user,callback){
    //Se hashea con 10 rondas; en la base de datos nunca se guarda la contraseña real
    const passwordHash = await bcrypt.hash(user.password,10);
    user.password=passwordHash
    //Ya con el hash, se manda al service para guardarlo
    authService.newUser(user,(error,result)=>{
        if(error){
            callback(error,null)
            return
        }
        callback(null,result)
    })
}
async function login(user,callback){
    //buscamos al usuario por su correo
    authService.searchUserByEmail(user.email,async(error,result)=>{
        if(error){
            callback(error,null)
            return
        }
        //comparamos la contraseña escrita contra el hash guardado previamente
        const passwordValido = await bcrypt.compare(user.password,result.password);
        if(!passwordValido){
            //Mismo mensaje que si el correo no existe, para no dar pistas
            callback("Credenciales invalidas",null)
            return
        }
        //creamos el token con el id y el rol, firmado con la clave secreta del .env
        const token = jwt.sign(
            { id: result.id, rol: result.rol },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }//El token deja de servir después de 1 hora
        )
        //Esto es lo que recibe Angular
        callback(null, { token, name: result.name, rol: result.rol })
    })
}

module.exports = { register, login }