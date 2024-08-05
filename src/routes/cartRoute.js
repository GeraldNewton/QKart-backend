const express=require("express")
const router=express.Router();
const verifyToken=require("../middleware/verify_token.js")
const {verifySetCart,verifyGetCart}=require("../middleware/verify_cart.js")
const {get_cart,set_cart,buy_cart}=require("../controllers/cart_controller.js")

router.get("/",verifyToken,verifyGetCart,get_cart);
router.put("/",verifyToken,verifySetCart,set_cart);
router.post("/buy",verifyToken,buy_cart)

module.exports=router