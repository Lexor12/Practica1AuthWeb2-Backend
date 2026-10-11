//database.js
//Aqui se importa la libreria para hacer la conexión hacia la base de datos
const mysql = require('mysql2')

//Aquí definimos el objeto que se va a exportar tipo singletone para la conexión a la base de datos
//Los datos de conexión vienen del .env, así no quedan escritos en el código
const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//Se conecta una sola vez al iniciar el servidor y avisa en consola si funcionó
conexion.connect((error)=>{
    if(error){
        console.log('Error al acceder a la base de datos',error)
        return;
    }
    console.log('Conectado correctamente con MySQL')
})
//Se exporta la misma conexión para que la usen los services
module.exports=conexion