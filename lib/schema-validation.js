// ------------------------------------------------------------------------------
// Schema Validation, Joi

const Joi = require("joi");

const productSchemaValidation = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    price: Joi.number().required(),
    status: Joi.string().required(),
});

const userSchemaValidation = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
    username: Joi.string().required(),
    confirmPassword: Joi.ref("password"),
});

const userLoginSchemaValidation = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
});

module.exports = {
    productSchemaValidation,
    userSchemaValidation,
    userLoginSchemaValidation,
};
