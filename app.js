//Aquí definimos las librerias que vamos a utilizar e importar
//Usamos CORS para acceder desde el frontend con el backend, evitamos usar la forma tracional de usar path
const dotenv =require('dotenv')
//va antes de importar las rutas, porque database.js lee el .env al cargarse
dotenv.config()

const express = require('express')
const cors = require('cors')
const authRouter = require('./routes/auth.route')


//Aqui creamos el objeto de express que permitirá utilizar el framework mediante las configuraciones posteriores
const app = express()

//Aquí definimos los diferentes middlewares que tendra nuestra aplicacion
app.use(cors())//Permite que Angular (otro puerto) haga peticiones a este servidor
app.use(express.json())//Convierte el body de las peticiones a objeto (req.body)
app.use('/api',authRouter)//Todas las rutas de auth quedan bajo /api (ej. /api/auth/login)

//Ruta de prueba para saber si el servidor está vivo
app.get('/',(req,res)=>{
    return res.json("Servidor Activo")
})

//Levanta el servidor en el puerto definido en el .env
app.listen(process.env.PORT,()=>{
    console.log(`Servidor ejecutandose en el puert: ${process.env.PORT}    -> http://localhost:${process.env.PORT}`)
})