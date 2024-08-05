const customPassEvaluation = require("../utility/custom_pass_evaluation.js");
const joi=require("joi")

const joibase_scehma_Verifycred = joi
  .object({
    username: joi.string().messages({
      "string.base":"username has to be a string"
    }),
    password: joi.string().required().custom(customPassEvaluation).messages({
      "string.base":"password has to be a string",
      "any.required":"password has to be present"
    }),
    email: joi.string().email().required().messages({
        "string.base":"email has to be a string",
        "string.email":"invalid email address",
        "any.required":"email has to be present"
    }),
  })
  .options({ abortEarly: false });

module.exports = joibase_scehma_Verifycred;
