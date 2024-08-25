const user_model = require("../models/usermodel.js");
const http = require("http-status");
const custom_error = require("../utility/custom_error.js");

const create_user = async (body) => {
  let res = await user_model.isEmailPresent(body.email);
  if (res) {
    throw new custom_error(
      http.BAD_REQUEST,
      "DuplicateKeyError",
      "email is already taken"
    );
  }
  res = await user_model.create({ ...body });
  return res 
};


const loginWithEmailAndPassword=async(email,password)=>{
    let res=await user_model.findOne({email})
    if(!res)
    throw new custom_error(
        http.BAD_REQUEST,
        "InvalidUser",
        "user not present in Database"
      );
    const bool=await res.isPasswordMatch(password)
    if(!bool)
    throw new custom_error(
        http.BAD_REQUEST,
        "InvalidUser",
        "password is incorrect"
      );
    return res;
}

module.exports = { create_user ,loginWithEmailAndPassword};
