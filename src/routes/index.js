const express=require("express")
const authRoute=require("./authRoute.js")
const userRoute=require("./userRoute.js")
const productRoute=require("./productRoute.js")
const cartRoute=require("./cartRoute.js")

const router=express.Router()

router.use("/auth",authRoute);
router.use("/users",userRoute);
router.use("/products",productRoute)
router.use("/cart",cartRoute)

module.exports=router