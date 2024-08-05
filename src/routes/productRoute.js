const express=require("express")
const router=express.Router();
const {get_products_by_category,get_all_products}=require("../controllers/product_controller.js")
const verifyToken=require("../middleware/verify_token.js")

router.get("/",verifyToken,get_all_products);
router.get("/:category",verifyToken,get_products_by_category);

module.exports=router