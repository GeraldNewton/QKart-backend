const joibase_scehma_VerifyAddress = require("../config/joibase_schema-VerifyAddress.js");
const custom_error = require("../utility/custom_error.js");
const http=require("http-status")

const verifyGetAdd = (req, res, next) => {
  const { id } = req.params;
  const { error, value } = joibase_scehma_VerifyAddress.validate({id});
  if (error) {
    const err_arr=error.details.map((obj)=>obj.message)
    const err_obj=new custom_error(http.BAD_REQUEST,"ValidationError","Validation failed for particular keys")
    res.send({ code: err_obj.code, name: err_obj.name, message: err_obj.message, err_arr });
  } else next();
};

const verifySetAdd=(req,res,next)=>{
  const { id } = req.params;
  const {pass,newadd}=req.body;
  const joi_scehma_VerifyAddress=joibase_scehma_VerifyAddress.fork(["newadd","pass"],(schema)=>schema.required())
  const {error,value}=joi_scehma_VerifyAddress.validate({id,newadd,pass})
  if (error) {
    const err_arr=error.details.map((obj)=>obj.message)
    const err_obj=new custom_error(http.BAD_REQUEST,"ValidationError","Validation failed for particular keys")
    res.send({ code: err_obj.code, name: err_obj.name, message: err_obj.message, err_arr });
  } else next();
}

module.exports = {verifyGetAdd,verifySetAdd};
