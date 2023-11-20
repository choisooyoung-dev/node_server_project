// ------------------------------------------------------------------------------
// Schema Validation, Joi

const Joi = require("joi");

const productSchemaValidation = Joi.object({
    title: Joi.string().required().trim(),
    content: Joi.string().required().trim(),
    price: Joi.string().required().trim(),
    status: Joi.string().valid("FOR_SALE", "SOLD_OUT").trim(),
});

const userSchemaValidation = Joi.object({
    email: Joi.string().required().trim(),
    password: Joi.string().min(6).required().trim(),
    username: Joi.string().required().trim(),
    confirmPassword: Joi.ref("password"),
});

const userLoginSchemaValidation = Joi.object({
    email: Joi.string().required().trim(),
    password: Joi.string().min(6).required().trim(),
});

module.exports = {
    productSchemaValidation,
    userSchemaValidation,
    userLoginSchemaValidation,
};
