const Joi = require('joi');

function loginValidation(data) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(), 
    });

    return schema.validate(data);
}

module.exports = { loginValidation };