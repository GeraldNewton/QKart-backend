const express=require("express")
const router=express.Router();
const {signup,login}=require("../controllers/auth_controller.js")
const verifyCred=require("../middleware/verify_cred.js")

router.get("/login",verifyCred("login"),login);
router.post("/signup",verifyCred("signup"),signup)

module.exports=router