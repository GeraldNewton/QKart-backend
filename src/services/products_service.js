const { product_model } = require("../models/productmodel");
const { PRODUCT_CATEGORIES } = require("../config/config.js");

const get_allProducts = async () => {
  const products = await product_model.find();
  return products;
};

const get_productsByCategory = async (category) => {
  category = category.toLowerCase();
  const categories = PRODUCT_CATEGORIES.filter((val) => {
    const ind = val.indexOf(category);
    if (ind != -1) return true;
    else return false;
  });
  const products = await product_model.find({
    category: { $in: [...categories] },
  });
  return products;
};

module.exports = { get_allProducts, get_productsByCategory };
