const Joi = require('joi');

function createEstateValidation(data) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(255).required(),
        price: Joi.string().min(5).required(),
        description: Joi.string().required(),
        imageUrl: Joi.string().required().allow(),
        address: Joi.string().required(),

    });

    return schema.validate(data);
}
module.exports = createEstateValidation;