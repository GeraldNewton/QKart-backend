const mongoose=require("mongoose")
const validator=require("validator")
const {DEFAULT_ADDRESS,DEFAULT_WALLET_MONEY,REGEX_MSG,EMAIL_MESSAGE,REGEX_USERPASS}=require("../config/config.js")
const bcrypt=require("bcrypt")

const user_schema=mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        validate:{
            validator:(val)=>REGEX_USERPASS.test(val),
            message:REGEX_MSG
        }
    },
    email:{
        type:String,
        unique:true,
        required:true,
        validate:{
            validator:(val)=>validator.isEmail(val),
            message:EMAIL_MESSAGE
        }
    },
    address:{
        type:String,
        default:DEFAULT_ADDRESS
    },
    walletmoney:{
        type:Number,
        default:DEFAULT_WALLET_MONEY
    }
},{
    timestamps:true
})

user_schema.methods.isPasswordMatch=async function(pass){
    const res=await bcrypt.compare(pass, this.password)
    return res;
}

user_schema.statics.isEmailPresent=async function(email){
    const res=await this.findOne({email})
    return res?true:false
}

user_schema.pre("save",async function(next){
    const salt=await bcrypt.genSalt();
    const pass=await bcrypt.hash(this.password,salt);
    this.password=pass;
    return next()
})


const user_model=mongoose.model("user",user_schema)

module.exports=user_model