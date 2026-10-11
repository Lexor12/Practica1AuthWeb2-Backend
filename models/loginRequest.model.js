//loginRequest.model.js
//Modelo de lo que el usuario manda al iniciar sesión
class LoginRequest{
    constructor(email,password){
        this.email=email
        this.password=password
    }
}
module.exports={LoginRequest}