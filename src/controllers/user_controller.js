const custom_error=require("../utility/custom_error.js")
const http=require("http-status")
const {get_user_add_by_id,set_user_add_by_id}=require("../services/user_service.js")

const get_user_address = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await get_user_add_by_id(id);
    res.send(user);
  } catch (e) {
    let error;
    if (e.name == "InvalidUser") error = e;
    else
      error = new custom_error(
        http.INTERNAL_SERVER_ERROR,
        "Internal Server Error",
        "Cannot get User address"
      );
    res
      .status(error.code)
      .send({ code: error.code, name: error.name, message: error.message });
  }
};

const set_user_address = async (req, res) => {
  try {
    const { id } = req.params;
    const { newadd, pass } = req.headers;
    const user = await set_user_add_by_id(id, newadd, pass);
    res.send({address:user});
  } catch (e) {
    let error;
    if (e.name == "InvalidUser") error = e;
    else
      error = new custom_error(
        http.INTERNAL_SERVER_ERROR,
        "Internal Server Error",
        "Cannot set User address"
      );
    res
      .status(error.code)
      .send({ code: error.code, name: error.name, message: error.message });
  }
};

module.exports={get_user_address,set_user_address}