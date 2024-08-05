const {
  get_cart_by_email,
  set_cart_by_email,
  buy_cart_by_emailAndpassword,
} = require("../services/cart_service.js");
const custom_error = require("../utility/custom_error.js");
const http = require("http-status");

const get_cart = async (req, res) => {
  try {
    const { email } = req.body;
    const cart = await get_cart_by_email(email);
    if (!cart || cart.cart_items.length == 0) {
      let obj = new custom_error(
        http.OK,
        "CartIsEmpty",
        "User has not added anything in cart"
      );
      res.send({ code: obj.code, name: obj.name, message: obj.message });
    } else res.send(cart);
  } catch (e) {
    let error = new custom_error(
      http.INTERNAL_SERVER_ERROR,
      "Internal Server Error",
      "Cannot get cart items due to internl server error"
    );
    return res
      .status(error.code)
      .send({ code: error.code, name: error.name, message: error.message });
  }
};

const set_cart = async (req, res) => {
  try {
    const { email, productId, count } = req.body;
    const cart = await set_cart_by_email(email, productId, count);
    res.send(cart);
  } catch (e) {
    let error;
    if (e.name == "InvalidRequest") error = e;
    else
      error = new custom_error(
        http.INTERNAL_SERVER_ERROR,
        "Internal Server Error",
        "Cannot set contents of cart due to internl server error"
      );
    return res
      .status(error.code)
      .send({ code: error.code, name: error.name, message: error.message });
  }
};

const buy_cart = async (req, res) => {
  try {
    const { email, password } = req.body;
    const buy = await buy_cart_by_emailAndpassword(email, password);
    res.send(buy);
  } catch (e) {
    let error;
    if (e.name == "InvalidRequest") error = e;
    else
      error = new custom_error(
        http.INTERNAL_SERVER_ERROR,
        "Internal Server Error",
        "Cannot set contents of cart due to internl server error"
      );
    return res
      .status(error.code)
      .send({ code: error.code, name: error.name, message: error.message });
  }
};

module.exports = { get_cart, set_cart, buy_cart };
