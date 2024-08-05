const express=require("express")
const router=express.Router();
const {set_user_address,get_user_address}=require("../controllers/user_controller.js")
const verifyToken=require("../middleware/verify_token.js")
const {verifyGetAdd,verifySetAdd}=require("../middleware/verify_address.js")

router.get("/getAdd/:id",verifyToken,verifyGetAdd,get_user_address);
router.put("/setAdd/:id",verifyToken,verifySetAdd,set_user_address);

module.exports=router