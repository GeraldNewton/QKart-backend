const express=require("express")
const router=express.Router();
const verifyToken=require("../middleware/verify_token.js")
const {verifyDeleteCart}=require("../middleware/verify_cart.js")
const {get_orders,delete_orders}=require("../controllers/order_controller.js")

router.get("/",verifyToken,get_orders);
router.delete("/",verifyToken,verifyDeleteCart,delete_orders);

module.exports=router