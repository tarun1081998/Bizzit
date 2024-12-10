const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  serviceProviderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceProvider',
    required: true,
  },
  messages: [
    {
      sender: { type: String, enum: ['User', 'ServiceProvider'], required: true },
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Chat', chatSchema);
