class custom_error extends Error{
    constructor(code,name,message){
        super(message);
        this.code=code;
        this.message=message;
        this.name=name;
    }
}

module.exports=custom_error