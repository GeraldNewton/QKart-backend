const user_model = require("../models/usermodel");
const custom_error = require("../utility/custom_error");
const http = require("http-status");

const set_user_add_by_id = async (id, newadd, pass) => {
  const user = await user_model.findById(id);
  if (!user)
    throw new custom_error(
      http.BAD_REQUEST,
      "InvalidUser",
      "user not present in Database"
    );
  const match = await user.isPasswordMatch(pass);
  if (!match)
    throw new custom_error(
      http.BAD_REQUEST,
      "InvalidUser",
      "password is incorrect"
    );

  const update = {
    address: newadd,
  };
  const options = {
    runValidators: true,
    new: true,
  };
  const updated_user = await user_model.findByIdAndUpdate(id, update, options);

  return updated_user.address;
};

const get_user_add_by_id = async (id) => {
  const add = await user_model.findById(id, "address -_id");
  if (!add)
    throw new custom_error(
      http.BAD_REQUEST,
      "InvalidUser",
      "user not present in Database"
    );
  return add;
};

module.exports = { set_user_add_by_id, get_user_add_by_id };
