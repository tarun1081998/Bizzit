const mongoose = require('mongoose');

const serviceProviderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String },
  followers: { type: Number, default: 0 },
  catalog: [{ title: String, image: String }],
  contactInfo: {
    phone: String,
    email: String,
    location: String,
  },
  socialLinks: {
    instagram: String,
    twitter: String,
    facebook: String,
  },
});

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);
