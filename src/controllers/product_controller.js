const {
  get_allProducts,
  get_productsByCategory,
} = require("../services/products_service.js");
const custom_error = require("../utility/custom_error.js");
const http=require("http-status")

const get_all_products = async (req, res) => {
  try {
    const products = await get_allProducts();
    res.send(products);
  } catch (e) {
    let error = new custom_error(
      http.INTERNAL_SERVER_ERROR,
      "Internal Server Error",
      "Cannot get products due to internal server error"
    );
    res
      .status(error.code)
      .send({ code: error.code, name: error.name, message: error.message });
  }
};

const get_products_by_category = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await get_productsByCategory(category);
    res.send(products);
  } catch (e) {
    let error = new custom_error(
      http.INTERNAL_SERVER_ERROR,
      "Internal Server Error",
      "Cannot get products due to internal server error"
    );
    res
      .status(error.code)
      .send({ code: error.code, name: error.name, message: error.message });
  }
};

module.exports = { get_all_products, get_products_by_category };
