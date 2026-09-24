require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const connectDB = require('./config/db');
const initSocketIO = require('./socket/socketHandler');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// Pass io to socket handler
initSocketIO(io);

// Make io accessible globally in app if needed
app.set('socketio', io);

server.listen(PORT, () => {
  console.log(`🚀 Help On Drive Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`🔗 API Base: http://localhost:${PORT}/api`);
});
