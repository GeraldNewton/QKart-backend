const express=require("express")
const router=express.Router();
const {get_products_by_category,get_all_products}=require("../controllers/product_controller.js")

router.get("/",get_all_products);
router.get("/:category",get_products_by_category);

module.exports=router