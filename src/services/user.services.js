const User = require('../models/user.model'); // Assuming a Mongoose model

// Create a new user
exports.createUser = async (userData) => {
    try {
        console.log("here", userData)
        const user = new User(userData);
        return await user.save();
    } catch (error) {
        throw new Error('Error creating user');
    }
};