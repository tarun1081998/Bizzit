const Joi = require('joi');

const userSchema = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    mobileNumber: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required(),
    gender: Joi.string().valid('Male', 'Female', 'Other').required(),
    profilePhoto: Joi.string().uri().optional(),
});

module.exports = { userSchema };
