const ChatMessage = require('../models/Chat');

const initSocketIO = (io) => {
  io.on('connection', (socket) => {
    console.log(`⚡ Socket client connected: ${socket.id}`);

    // Join a specific user private room for notifications
    socket.on('join_user_room', (userId) => {
      if (userId) {
        socket.join(`user_${userId}`);
        console.log(`User ${userId} joined room user_${userId}`);
      }
    });

    // Join a specific booking or job room
    socket.on('join_booking', (bookingId) => {
      if (bookingId) {
        socket.join(`booking_${bookingId}`);
        console.log(`Client ${socket.id} joined room booking_${bookingId}`);
      }
    });

    // Leave a booking room
    socket.on('leave_booking', (bookingId) => {
      if (bookingId) {
        socket.leave(`booking_${bookingId}`);
      }
    });

    // Driver or Provider sends live GPS coordinates
    socket.on('update_location', (data) => {
      // data: { bookingId, role, lat, lng, heading }
      if (data && data.bookingId) {
        io.to(`booking_${data.bookingId}`).emit('location_updated', {
          role: data.role,
          lat: data.lat,
          lng: data.lng,
          heading: data.heading || 0,
          timestamp: new Date()
        });
      }
    });

    // Status change event broadcast
    socket.on('status_change', (data) => {
      // data: { bookingId, status, updatedBy, message }
      if (data && data.bookingId) {
        io.to(`booking_${data.bookingId}`).emit('status_changed', data);
      }
    });

    // Live chat message between customer and driver/provider
    socket.on('send_message', async (data) => {
      // data: { bookingId, senderId, receiverId, text, senderName, senderAvatar, senderRole }
      try {
        if (!data.bookingId || !data.text) return;

        // Save to DB
        const chatMsg = await ChatMessage.create({
          bookingId: data.bookingId,
          senderId: data.senderId,
          receiverId: data.receiverId,
          text: data.text
        });

        const broadcastData = {
          _id: chatMsg._id,
          bookingId: data.bookingId,
          senderId: {
            _id: data.senderId,
            name: data.senderName,
            avatar: data.senderAvatar,
            role: data.senderRole
          },
          text: data.text,
          createdAt: chatMsg.createdAt
        };

        // Broadcast to booking room
        io.to(`booking_${data.bookingId}`).emit('new_message', broadcastData);

        // Also notify recipient's personal room
        if (data.receiverId) {
          io.to(`user_${data.receiverId}`).emit('chat_notification', {
            bookingId: data.bookingId,
            senderName: data.senderName,
            text: data.text
          });
        }
      } catch (err) {
        console.error('Socket chat message error:', err);
      }
    });

    // SOS Emergency Broadcast
    socket.on('sos_alert', (data) => {
      // Broadcast to all connected clients & admin
      io.emit('emergency_sos_broadcast', {
        ...data,
        timestamp: new Date()
      });
    });

    socket.on('disconnect', () => {
      console.log(`🔌 Socket client disconnected: ${socket.id}`);
    });
  });
};

module.exports = initSocketIO;
