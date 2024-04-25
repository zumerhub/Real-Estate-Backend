const Joi = require('joi');

function createUserValidation(data) {
    const schema = Joi.object({
        username: Joi.string().min(5).max(255).required(),
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().required(),
        password: Joi.string().min(8).required(), // Minimum password length of 8 characters
        phone: Joi.string().required(), // You may want to use a more specific phone number validation
        address: Joi.string().required().allow('') // Optional address field that allows an empty string
    });    
        return schema.validate(data);

}

function updateUserValidation(data) {
    // const schema = Joi.object({
    //     email: Joi.objectId().required(),  // adding objectId to the customerId property
    //     phone: Joi.objectId().required(),    // adding objectId to the movieId property
    //     address: Joi.date().optional(),
    // }).min(1);
    // return schema.validate(data);
};

module.exports = { createUserValidation, updateUserValidation };