// Simple test script to verify server dependencies
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const axios = require('axios');

console.log('✅ All dependencies loaded successfully');
console.log('✅ Express:', express.version || 'loaded');
console.log('✅ Socket.IO:', socketIo.version || 'loaded');
console.log('✅ CORS:', 'loaded');
console.log('✅ Axios:', axios.VERSION || 'loaded');

// Test basic server creation
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

console.log('✅ Server components created successfully');
console.log('✅ Ready for deployment!');
