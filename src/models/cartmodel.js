const mongoose = require("mongoose");
const { product_schema } = require("./productmodel");

const cart_schema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    cart_items: {
      type: [
        {
          product: product_schema,
          quantity: {
            type: Number,
            min: 1,
          },
        },
      ],
      _id:false
    },
  },
  { timestamps: true }
);

const cart_model = mongoose.model("cart", cart_schema);
module.exports = cart_model;
