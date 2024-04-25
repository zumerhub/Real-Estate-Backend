const Joi = require('joi');

// function updateForgothValidation(data) {
//     const schema = Joi.object({
//         name: Joi.string().min(5).max(255).required(),
//         email: Joi.string().email().required(),
//         password: Joi.string().min(8).required()
//     });

//     return schema.validate(data);
// }

function loginValidation(data) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(), 
    });

    return schema.validate(data);
}

module.exports = { loginValidation };