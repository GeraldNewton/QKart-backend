const mongoose=require("mongoose")

const product_schema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    cost:{
        type:Number,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})

const product_model=mongoose.model("product",product_schema)

module.exports={product_model,product_schema}