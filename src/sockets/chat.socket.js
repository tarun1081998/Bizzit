const Chat = require('../models/chat.model'); // Import the Chat model

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Join a chat room
    socket.on('joinRoom', ({ userId, serviceProviderId }) => {
      if (!userId || !serviceProviderId) {
        console.error('Invalid room details provided');
        return;
      }
      const roomId = `${userId}-${serviceProviderId}`;
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });

    // Handle sending a message
    socket.on('sendMessage', async ({ userId, serviceProviderId, sender, content }) => {
      if (!userId || !serviceProviderId || !sender || !content) {
        console.error('Invalid message details provided');
        socket.emit('error', { message: 'Invalid message details' });
        return;
      }

      const roomId = `${userId}-${serviceProviderId}`;
      const message = { sender, content, timestamp: new Date() };

      try {
        // Find or create the chat in the database
        let chat = await Chat.findOne({ userId, serviceProviderId });
        if (!chat) {
          chat = new Chat({ userId, serviceProviderId, messages: [] });
        }
        chat.messages.push(message);
        chat.lastUpdated = new Date();

        await chat.save();

        // Emit the message to the room
        io.to(roomId).emit('receiveMessage', message);
        console.log(`Message sent to room ${roomId}`);
      } catch (error) {
        console.error('Error saving message:', error.message);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });
};
