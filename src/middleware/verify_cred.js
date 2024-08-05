const joibase_scehma_Verifycred = require("../config/joibase_scehma_Verifycred");
const custom_error=require("../utility/custom_error.js")
const http=require("http-status")


const verifyCred = (val) => (req, res, next) => {
  const { username, email, password } = req.body;
  let joi_scehma_Verifycred = joibase_scehma_Verifycred;
  if (val == "signup")
    joi_scehma_Verifycred = joi_scehma_Verifycred.fork(["username"], (schema) =>
      schema.required().messages({
        "string.base": "username has to be a string",
        "any.required": "username is required for signup",
      })
    );
  const { error, value } = joi_scehma_Verifycred.validate({
    username,
    email,
    password,
  });
  if (error) {
    err_arr=error.details.map((obj)=>obj.message)
    err = new custom_error(
      http.BAD_REQUEST,
      "InvaildUser",
      "authentcation parameters invalid"
    );
  return res
    .status(err.code)
    .send({ code: err.code, name: err.name, message: err.message,err_arr });
  } else next();
};

module.exports = verifyCred;
