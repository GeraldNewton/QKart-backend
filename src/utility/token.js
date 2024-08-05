const {JWT_EXPIRESIN,JWT_SECRETKEY}=require("../config/config.js")
const jwt = require('jsonwebtoken');


const generate_token=async(password)=>{
    const token = await jwt.sign({ password }, JWT_SECRETKEY , { expiresIn: JWT_EXPIRESIN });
    return token;
}        

module.exports={generate_token}