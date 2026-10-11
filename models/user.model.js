//user.model.js
//Aqui definimos la estructura de un usuario, esta coincide con la tabla de la base de datos
class User{
    constructor(id,name,email,password,rol){
        this.id=id
        this.name=name
        this.email=email
        this.password=password
        this.rol=rol
    }
}
module.exports={User}