// ------------------------------------------------------------------------------
// Schema Validation, Joi

const Joi = require("joi");

const productSchemaValidation = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    price: Joi.number().required(),
    status: Joi.string().required(),
});

module.exports = { productSchemaValidation };
