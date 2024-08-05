const jwt = require("jsonwebtoken");
const {JWT_SECRETKEY}=require("../config/config.js")
const custom_error=require("../utility/custom_error.js")
const http = require("http-status");

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  try {
    const match = await jwt.verify(token, JWT_SECRETKEY);
    next();
  } catch (e) {
    let error;
    if (e.name == "TokenExpiredError" || e.name == "JsonWebTokenError")
      error = new custom_error(
        http.UNAUTHORIZED,
        "TokenValidationError",
        "invalid or expired token"
      );
    else
      error = new custom_error(
        http.INTERNAL_SERVER_ERROR,
        "Internal Server Error",
        "Cannot access resources due to internl server error"
      );
    res
      .status(error.code)
      .send({ code: error.code, name: error.name, message: error.message });
  }
};

module.exports=verifyToken

// ? when token is expired following error generates
// ? {
// ?     "name": "TokenExpiredError",
// ?     "message": "jwt expired",
// ?     "expiredAt": "2024-06-26T14:47:49.000Z"
// ? }
// ? when token is invalid following error generates
// ? {
// ?     "name": "JsonWebTokenError",
// ?     "message": "invalid token"
// ? }
