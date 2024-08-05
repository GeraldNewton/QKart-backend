const customPassEvaluation = require("../utility/custom_pass_evaluation.js");
const joi=require("joi")
const customMongoIdEvaluation = require("../utility/custom_mongoid_evaluation.js");


const joibase_scehma_VerifyAddress = joi
  .object({
    id: joi.string().required().custom(customMongoIdEvaluation).messages({
      "string.base":"id has to be a string",
      "any.required":"id is Required"
    }),
    pass: joi.string().custom(customPassEvaluation).messages({
      "string.base":"password has to be a string",
      "any.required":"password is required"
    }),
    newadd: joi.string().messages({
        "string.base":"newadd has to be a string",
        "any.required":"newadd is Required"
      })
  })
  .options({ abortEarly: false });

module.exports = joibase_scehma_VerifyAddress;
