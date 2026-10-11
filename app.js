//Aquí definimos las librerias que vamos a utilizar e importar
//Usamos CORS para acceder desde el frontend con el backend, evitamos usar la forma tracional de usar path
const dotenv =require('dotenv')

dotenv.config()

const express = require('express')
const cors = require('cors')
const authRouter = require('./routes/auth.route')


//Aqui creamos el objeto de express que permitirá utilizar el framework mediante las configuraciones posteriores
const app = express()

//Aquí definimos los diferentes middlewares que tendra nuestra aplicacion
app.use(cors())
app.use(express.json())
app.use('/api',authRouter)

app.get('/',(req,res)=>{
    return res.json("Servidor Activo")
})


app.listen(process.env.PORT,()=>{
    console.log(`Servidor ejecutandose en el puert: ${process.env.PORT}    -> http://localhost:${process.env.PORT}`)
})
