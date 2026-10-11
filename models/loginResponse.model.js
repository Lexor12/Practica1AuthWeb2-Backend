//loginResponse.model.js
//Modelo de lo que el servidor responde tras un login correcto
class LoginResponse{
    constructor(token,name,rol){
        this.token=token
        this.name=name
        this.rol=rol
    }
}