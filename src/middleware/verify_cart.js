const custom_error = require("../utility/custom_error.js");
const http = require("http-status");
const { EMAIL_REGEX } = require("../config/config.js");
const validator = require("validator");
const joibase_schema_Verifycart = require("../config/joibase_schema_Verifycart.js");

const verifyGetCart = (req, res, next) => {
  const { email } = req.body;
  const { error, value } = joibase_schema_Verifycart.validate({ email });
  if (error) {
    const err_arr = error.details.map((obj) => obj.message);
    const err = new custom_error(
      http.BAD_REQUEST,
      "InvalidRequest",
      "Request parameters are invalid"
    );
    const err_obj = {
      code: err.code,
      name: err.name,
      message: err.message,
      err_arr,
    };
    res.status(err_obj.code).send(err_obj);
  } else next();
};

const verifySetCart = (req, res, next) => {
  const { email, productId, count } = req.body;
  joi_schema_Verifycart = joibase_schema_Verifycart.fork(
    ["productId", "count"],
    (schema) => schema.required());
  const { error, value } = joi_schema_Verifycart.validate({
    email,
    productId,
    count,
  });
  if (error) {
    const err_arr = error.details.map((obj) => obj.message);
    const err = new custom_error(
      http.BAD_REQUEST,
      "InvalidRequest",
      "Request parameters are invalid"
    );
    const err_obj = {
      code: err.code,
      name: err.name,
      message: err.message,
      err_arr,
    };
    res.status(err_obj.code).send(err_obj);
  } else next();
};

module.exports = { verifyGetCart, verifySetCart };
