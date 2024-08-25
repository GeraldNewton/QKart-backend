const { get_orders_by_email,delete_orders_by_emailAndid } = require("../services/order_service.js");
const custom_error = require("../utility/custom_error.js");
const http = require("http-status");

const get_orders = async (req, res) => {
  try {
    const { email } = req.headers;
    const orders = await get_orders_by_email(email);
    res.send(orders);
  } catch (e) {
    let error = new custom_error(
      http.INTERNAL_SERVER_ERROR,
      "Internal Server Error",
      "Cannot get order list due to internl server error"
    );
    return res
      .status(error.code)
      .send({ code: error.code, name: error.name, message: error.message });
  }
};

const delete_orders=async(req,res)=>{
    try {
        const { email,id } = req.body;
        const orders = await delete_orders_by_emailAndid(email,id);
        res.send(orders);
      } catch (e) {
        let error;
        if(e.name=="InvalidUser")
        error=e
        else
        error = new custom_error(
          http.INTERNAL_SERVER_ERROR,
          "Internal Server Error",
          "Cannot delete order due to internl server error"
        );
        return res
          .status(error.code)
          .send({ code: error.code, name: error.name, message: error.message });
      }
}

module.exports = { get_orders,delete_orders };
