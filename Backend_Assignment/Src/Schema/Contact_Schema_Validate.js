const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  spam: Joi.boolean().default(false),
});

module.exports = contactSchema;
