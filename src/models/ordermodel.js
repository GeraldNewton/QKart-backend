const mongoose = require("mongoose");

const order_entries = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  products: [
    {
      _id: String,
      name: String,
      cost: Number,
      units: Number,
      image:String,
    },
  ],
});

const order_schema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  orders: [order_entries],
});

const order_model = mongoose.model("order", order_schema);

module.exports = order_model;
