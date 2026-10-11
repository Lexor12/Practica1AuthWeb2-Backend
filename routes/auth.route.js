// auth.route.js
const { Router } = require("express");
const route = Router()

const { User } = require("../models/user.model");
const authController = require('../controllers/auth.controller')
const {LoginRequest} = require('../models/loginRequest.model')

route.post('/auth/register',async(req,res)=>{
    /*
    Lo que hacemos es definir el dato a hashear, y basicamente le hacemos varias operaciones aritmeticas, y el segundo parametro, es cuantas iteraciones le haremos, entre más
    grande el número más seguro es ya que son más vueltas y es más aleatorio. La cualidad de usar hash es que el resultado es imposible de regresar al texto inicial

    Cuando guardamos se guarda el hash, cuando comparamos, debemos hashear ese valor con el mismo proceso y debe de darnos el mismo valor

    En el hasheo nosotros convertimos nuestras contraseñas y datos sensibles en digamos "en un tamaño y formato específico", por ejemplo, 128 caracteres (así que es posible que 2 contraseñas diferentes tengan el mismo valor hash, esto
    se conoce como colisión), la razón de lo anterior es que un valor aleatorio, tiene a un tamaño infiito, como lo limitamos puede existir una colisión 
    */
    //const {name,email,password,rol} = req.body
    //const user = new User(null,name,email,password,rol)
    const user = new User(null,"Juan Perez","juape@gmail.com","juanperez123",1)//El será admin
    const user2 = new User(null,"Roberto Lopez","robelo@gmail.com","robertolopez123",3)//El será de almacen
    authController.register(user,(error)=>{
        if(error){
            return res.status(400).json({
                message:error
            })
        }
        authController.register(user2,(error,result)=>{
            if(error){
                return res.status(400).json({
                    message:error
                })
            }
            return res.status(201).json({message:result})
        })
    })
})

route.post('/auth/login',(req,res)=>{
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "Email y password son obligatorios" })
    }
    const loginRequest = new LoginRequest(email, password)
    authController.login(loginRequest, (error, data) => {
        if (error) return res.status(401).json({ message: error })
        return res.status(200).json(data)   // { token, name, rol }
    })
})  
module.exports=route