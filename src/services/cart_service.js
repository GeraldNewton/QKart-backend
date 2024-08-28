const cart_model = require("../models/cartmodel.js");
const { product_model } = require("../models/productmodel.js");
const custom_error = require("../utility/custom_error.js");
const http = require("http-status");
const user_model = require("../models/usermodel.js");
const bcrypt = require("bcryptjs");
const order_model = require("../models/ordermodel.js");

const get_cart_by_email = async (email) => {
  const cart = await cart_model.findOne({ email });
  return cart;
};

const set_cart_by_email = async (email, id, count) => {
  const cart = await cart_model.findOne({ email });
  const product = await product_model.findById(id);
  if (!product) {
    throw new custom_error(
      http.BAD_REQUEST,
      "InvalidRequest",
      "No product found for given product id"
    );
  }
  let updated_cart;
  if (cart) {
    let ind = -1;
    const pro = cart.cart_items.find((obj, index) => {
      if (obj.product._id.toString() === id) {
        ind = index;
        return true;
      }
      return false;
    });
    if (ind != -1) {
      cart.cart_items[ind].quantity = count;
      if (cart.cart_items[ind].quantity <= 0) {
        cart.cart_items.splice(ind, 1);
      }
    } else {
      const pro_obj = {
        product,
        quantity: count,
      };
      cart.cart_items.push(pro_obj);
    }
    updated_cart = await cart.save();
  } else {
    const user = await user_model.findOne({ email });
    if (!user) {
      throw new custom_error(
        http.BAD_REQUEST,
        "InvalidRequest",
        "User not present in database"
      );
    }
    const cart_obj = {
      email,
      cart_items: [
        {
          product,
          quantity: count,
        },
      ],
    };
    updated_cart = await cart_model.create(cart_obj);
  }
  return updated_cart;
};

const find_cart_cost = (cart_items) => {
  const cost = cart_items.reduce((acc, obj) => {
    return obj.product.cost * obj.quantity + acc;
  }, 0);
  return cost;
};

const buy_cart_by_emailAndpassword = async (email, password) => {
  let user = await user_model.findOne({ email });
  let cart = await cart_model.findOne({ email });
  if (!user)
    throw new custom_error(
      http.BAD_REQUEST,
      "InvalidRequest",
      "User not present in database"
    );
  const match = await bcrypt.compare(password, user.password);
  if (!match)
    throw new custom_error(
      http.BAD_REQUEST,
      "InvalidRequest",
      "Incorrect password"
    );
  const cost = find_cart_cost(cart.cart_items);
  if (user.walletmoney < cost)
    throw new custom_error(
      http.BAD_REQUEST,
      "InvalidRequest",
      "User does not have enough money to buy cart items"
    );

    
    let order = await order_model.findOne({ email });
    let entry = {
      date: new Date(),
      products: 
        cart.cart_items.map((obj) => {
          let pro = {
            _id: obj.product._id,
            name: obj.product.name,
            cost: obj.product.cost,
            units: obj.quantity,
            image:obj.product.image
          };
          return pro;
        }),
    };

  if (order) {
    order.orders.push(entry)
    await order.save();
  } else {
    order = new order_model();
    order.email = email;
    order.orders = entry
    order=await order.save();
  }
  cart.cart_items = [];
  
  const update = {
    walletmoney: user.walletmoney - cost,
  };
  const options = {
    runValidators: true, //!validates only those keys whose values are changed hence not check the password against userSchema as it is saved after conversion using bcrypt hence it cannot pass the mongoose validaton we provided
    new: true,
  };
  
  user = await user_model.findOneAndUpdate({ email }, update, options);
  cart = await cart.save();

  return { wallet_money: user.walletmoney };
};


module.exports = {
  get_cart_by_email,
  set_cart_by_email,
  buy_cart_by_emailAndpassword,
}
