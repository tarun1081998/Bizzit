const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String }, // Optional: categorize services
  image: { type: String }, // URL for service image
  providers: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider' },
  ],
});

module.exports = mongoose.model('Service', serviceSchema);
