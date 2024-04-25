const Joi = require('joi');

function createBookingValidation(Booking) {
    const schema = Joi.object({
        estateId: Joi.string().min(5).max(255).required(),
        userId: Joi.string().min(5).max(255).required()
    });

    return schema.validate(Booking);
}
    module.exports =  createBookingValidation;