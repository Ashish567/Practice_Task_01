const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  email: Joi.string(),
  Contact_Model: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),
  password: Joi.string().required(),
});

module.exports = userSchema;
