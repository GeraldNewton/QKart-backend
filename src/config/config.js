const dotenv=require("dotenv")
const path=require("path")


dotenv.config({path:path.join(__dirname,'../../.env')})  //? Useful in places where config.js and .env is not present in the same folder
// dotenv.config({path:path.resolve(__dirname,'../../.env')})  // ?can use this also


module.exports={
    PORT:process.env.PORT,
    MONGODB_URL:process.env.MONGODB_URL,
    DEFAULT_ADDRESS:process.env.DEFAULT_ADDRESS,
    DEFAULT_WALLET_MONEY:process.env.DEFAULT_WALLET_MONEY,
    JWT_EXPIRESIN:process.env.JWT_EXPIRESIN,
    JWT_SECRETKEY:process.env.JWT_SECRETKEY,
    REGEX_USERPASS:new RegExp(process.env.REGEX_USERPASS),
    REGEX_MSG:"password should fullfill the following requirements of having atleast:one lowercase letter,one uppercase letter,one digit,one special character from the set `@$!%*?` & and should be at least 8 characters long",
    EMAIL_MESSAGE:"Incorrect Email",
    PRODUCT_CATEGORIES:process.env.PRODUCT_CATEGORIES.split(","),
    EMAIL_REGEX:new RegExp(process.env.EMAIL_REGEX),
    MOGOID_REGEX:new RegExp(process.env.MOGOID_REGEX),
    MOGOID_REGEX_MSG:"incorrect id",
    MONGODB_URL_ORG:process.env.MONGODB_URL_ORG,
}