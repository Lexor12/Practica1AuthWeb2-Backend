//auth.controller.js
const authService = require('../services/auth.service')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function register(user,callback){
    const passwordHash = await bcrypt.hash(user.password,10);
    user.password=passwordHash
    authService.newUser(user,(error,result)=>{
        if(error){
            callback(error,null)
            return
        }
        callback(null,result)
    })
}
async function login(user,callback){
    authService.searchUserByEmail(user.email,async(error,result)=>{
        if(error){
            callback(error,null)
            return
        }
        const passwordValido = await bcrypt.compare(user.password,result.password);
        if(!passwordValido){
            callback("Credenciales invalidas",null)
            return
        }
        const token = jwt.sign(
            { id: result.id, rol: result.rol },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )
        callback(null, { token, name: result.name, rol: result.rol })
    })
}

module.exports = { register, login }