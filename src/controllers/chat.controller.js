const Chat = require('../models/chat.model');

// Create a new chat
exports.createChat = async (req, res) => {
  const { userId, serviceProviderId } = req.body;

  try {
    const existingChat = await Chat.findOne({ userId, serviceProviderId });
    if (existingChat) return res.status(400).json({ message: 'Chat already exists' });

    const newChat = new Chat({ userId, serviceProviderId, messages: [] });
    await newChat.save();
    res.status(201).json({ message: 'Chat created successfully', chat: newChat });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create chat', error: error.message });
  }
};

// Get chat history
exports.getChatHistory = async (req, res) => {
  const { userId, serviceProviderId } = req.params;

  try {
    const chat = await Chat.findOne({ userId, serviceProviderId })
      .populate('userId', 'firstName lastName')
      .populate('serviceProviderId', 'name bio');
    if (!chat) return res.status(404).json({ message: 'Chat not found' });

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch chat history', error: error.message });
  }
};

// Send a message
exports.sendMessage = async (req, res) => {
  const { userId, serviceProviderId, sender, content } = req.body;

  try {
    const chat = await Chat.findOne({ userId, serviceProviderId });
    if (!chat) return res.status(404).json({ message: 'Chat not found' });

    chat.messages.push({ sender, content });
    chat.lastUpdated = new Date();
    await chat.save();

    res.status(200).json({ message: 'Message sent successfully', chat });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message', error: error.message });
  }
};
