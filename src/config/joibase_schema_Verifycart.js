const joi = require("joi");
const customMongoIdEvaluation = require("../utility/custom_mongoid_evaluation.js");

const joibase_schema_Verifycart = joi
  .object({
    email: joi.string().email().required().messages({
      "string.base": "email has to be a string",
      "any.required": "email is required",
      "string.email": "email is invalid",
    }),
    count: joi.number().min(0).messages({
      "any.required": "count is required",
      "number.min": "count cannot be smaller then 0",
      "number.base": "count has to be a number",
    }),
    productId: joi.string().custom(customMongoIdEvaluation).messages({
      "string.base": "productId has to be a string",
      "any.required": "productId is required",
    }),
    id: joi.string().custom(customMongoIdEvaluation).messages({
      "string.base": "id has to be a string",
      "any.required": "id is required",
    }),
  })
  .options({ abortEarly: false });

module.exports = joibase_schema_Verifycart;
