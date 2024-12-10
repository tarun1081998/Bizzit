const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');

// Create a new chat
router.post('/create', chatController.createChat);

// Get chat history between a user and a service provider
router.get('/:userId/:serviceProviderId', chatController.getChatHistory);

// Send a message in an existing chat
router.post('/send-message', chatController.sendMessage);

module.exports = router;
