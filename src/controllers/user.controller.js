const userService = require("../services/user.services")
const { userSchema } = require("../validations/user.validation")

exports.registerUser = async (req, res) => {
    const { error, value } = userSchema.validate(req.body)
    
    if (error) {
        return res.status(400).json({ message: `Validation error: ${error.details[0].message}` });
    }

    try {
        const newUser = await userService.createUser(req.body);
        return res.status(201).json({ message: 'User registered successfully', data: newUser });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error });
    }
};