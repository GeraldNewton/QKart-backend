const { MOGOID_REGEX, MOGOID_REGEX_MSG } = require("../config/config.js");

const customMongoIdEvaluation = (value, helpers) => {
  const bool = MOGOID_REGEX.test(value);
  console.log("in custom",bool)
  if (bool) return value;
  else    return helpers.message(MOGOID_REGEX_MSG);
};

module.exports = customMongoIdEvaluation;
