const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobileNumber: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    profilePhoto: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);