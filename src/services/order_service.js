const order_model = require("../models/ordermodel");
const custom_error = require("../utility/custom_error");
const http = require("http-status");

const get_orders_by_email = async (email) => {
  const orders = await order_model.findOne({ email });
  return orders;
};

const delete_orders_by_emailAndid = async (email, id) => {
  let order = await order_model.findOne({ email });
  if (!order)
    throw new custom_error(
      http.BAD_REQUEST,
      "InvalidUser",
      "user not present in database"
    );
  order.orders = order.orders.filter((obj) => obj._id.toString() !== id);
  order = await order.save();
  return order;
};

module.exports = { get_orders_by_email, delete_orders_by_emailAndid };
