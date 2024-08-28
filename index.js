const mongoose=require("mongoose");
const { MONGODB_URL, PORT } = require("./src/config/config.js");
const app=require("./app.js");
const user_schema = require("./src/models/usermodel.js");


mongoose.connect("mongodb://127.0.0.1:27017/qkart").then(async()=>await user_schema.init()).then(()=>{
    app.listen(PORT,()=>{
        console.log(`server started on port ${PORT}`)
    })
}).catch((e)=>{
    console.log(`not able to connect due to the error= ${e}`)
})