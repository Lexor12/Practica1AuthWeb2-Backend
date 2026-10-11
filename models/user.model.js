//user.model.js
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