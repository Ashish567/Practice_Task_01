const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  emailAddress: Joi.string().allow("").optional(),
  Contact_Model: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),
});

module.exports = userSchema;
