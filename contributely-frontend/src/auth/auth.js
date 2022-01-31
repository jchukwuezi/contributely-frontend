//this class will be called 

//the instance of this class will be called once instead of all the time
class Auth{
    constructor() {
        this.authenticated = false;
    }

    //cb here is a callback function to the server side ("auth/user")
    authUser(cb){
        this.authenticated = true
        cb()
    }

    logUserOut(cb){
        this.authenticated = false
        cb()
    }

    //this will return the auth status
    isAuth(){
        return this.authenticated
    }
}

export default new Auth()