const mongoose = require('mongoose');

const catalogItemSchema = new mongoose.Schema({
  serviceProviderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceProvider',
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String }, // URL of the catalog item image
  price: { type: Number }, // Optional: price for services/products
});

module.exports = mongoose.model('CatalogItem', catalogItemSchema);
