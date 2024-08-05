// const user_schema =require("../")
const { generate_token } = require("../utility/token.js");
const {
  create_user,
  loginWithEmailAndPassword,
} = require("../services/auth_service.js");
const custom_error = require("../utility/custom_error.js");
const http = require("http-status");

const signup =  async (req, res) => {
  try {
    const user = await create_user(req.body);
    const token = await generate_token(req.body.password);
    return res.status(http.OK).send({ user, token });
  } catch (e) {
    let error;
    if (e.name == "DuplicateKeyError") error = e;
    else if (e.name == "ValidationError")
      error = new custom_error(http.BAD_REQUEST, e.name, e.message);
    else
      error = new custom_error(
        http.INTERNAL_SERVER_ERROR,
        "Internal Server Error",
        "Cannot Create User due to internl server error"
      );
    return res
      .status(error.code)
      .send({ code: error.code, name: error.name, message: error.message });
  }
};

const login =  async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await loginWithEmailAndPassword(email, password);
      const token = await generate_token(req.body.password);
      res.status(http.OK).send({ user,token }); 
  } catch (e) {
    let error;
    if (e.name == "InvalidUser") error = e;
    else
      error = new custom_error(
        http.INTERNAL_SERVER_ERROR,
        "Internal Server Error",
        "Cannot Login due to internl server error"
      );
    res
      .status(error.code)
      .send({ code: error.code, name: error.name, message: error.message });
  }
};

module.exports = { signup ,login};
