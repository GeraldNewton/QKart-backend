const { REGEX_USERPASS, REGEX_MSG } = require("../config/config.js");

const customPassEvaluation = (value, helpers) => {
  const bool = REGEX_USERPASS.test(value);
  if (bool) return value;
  else    return helpers.message(REGEX_MSG);
};

module.exports = customPassEvaluation;
