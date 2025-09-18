const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for demo
const connectedUsers = new Map();
const messages = [];
const typingUsers = new Set();

// Translation service configuration
const TRANSLATION_SERVICE = {
  // Using LibreTranslate (free, open-source)
  baseUrl: 'https://libretranslate.de/translate',
  // Fallback to a simple mock translation for demo purposes
  fallback: true
};

// Simple translation mapping for demo (fallback)
const DEMO_TRANSLATIONS = {
  'hello': { es: 'hola', fr: 'bonjour', de: 'hallo' },
  'how are you': { es: '¿cómo estás?', fr: 'comment allez-vous?', de: 'wie geht es dir?' },
  'good morning': { es: 'buenos días', fr: 'bonjour', de: 'guten morgen' },
  'thank you': { es: 'gracias', fr: 'merci', de: 'danke' },
  'goodbye': { es: 'adiós', fr: 'au revoir', de: 'auf wiedersehen' },
  'yes': { es: 'sí', fr: 'oui', de: 'ja' },
  'no': { es: 'no', fr: 'non', de: 'nein' },
  'please': { es: 'por favor', fr: 's\'il vous plaît', de: 'bitte' }
};

// Translation function
async function translateText(text, targetLang) {
  try {
    // Try LibreTranslate first
    if (!TRANSLATION_SERVICE.fallback) {
      const response = await axios.post(TRANSLATION_SERVICE.baseUrl, {
        q: text,
        source: 'auto',
        target: targetLang,
        format: 'text'
      });
      return response.data.translatedText;
    }
  } catch (error) {
    console.log('Translation service unavailable, using fallback');
  }

  // Fallback to demo translations
  const lowerText = text.toLowerCase();
  if (DEMO_TRANSLATIONS[lowerText]) {
    return DEMO_TRANSLATIONS[lowerText][targetLang] || text;
  }
  
  // Simple word-by-word translation for demo
  const words = text.split(' ');
  const translatedWords = words.map(word => {
    const lowerWord = word.toLowerCase();
    if (DEMO_TRANSLATIONS[lowerWord]) {
      return DEMO_TRANSLATIONS[lowerWord][targetLang] || word;
    }
    return word;
  });
  
  return translatedWords.join(' ');
}

// AI Summary function (mock implementation)
function generateSummary(messages) {
  const recentMessages = messages.slice(-10);
  const messageTexts = recentMessages.map(msg => `${msg.username}: ${msg.originalText}`);
  const summary = `Recent conversation summary: ${messageTexts.length} messages exchanged. Topics discussed include greetings, general conversation, and user interactions.`;
  return summary;
}

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle user joining
  socket.on('join', (userData) => {
    const { username, preferredLanguage } = userData;
    connectedUsers.set(socket.id, {
      id: socket.id,
      username,
      preferredLanguage: preferredLanguage || 'en',
      joinTime: new Date()
    });

    // Send current users list to all clients
    io.emit('users_updated', Array.from(connectedUsers.values()));
    
    // Send recent messages to the new user
    socket.emit('recent_messages', messages.slice(-50));
    
    // Notify others about new user
    socket.broadcast.emit('user_joined', {
      username,
      message: `${username} joined the chat`
    });

    console.log(`${username} joined with language: ${preferredLanguage}`);
  });

  // Handle new message
  socket.on('send_message', async (messageData) => {
    const user = connectedUsers.get(socket.id);
    if (!user) return;

    const { text } = messageData;
    const timestamp = new Date();
    
    // Create message object
    const message = {
      id: Date.now() + Math.random(),
      username: user.username,
      originalText: text,
      originalLanguage: 'auto', // Could be detected
      timestamp,
      userId: socket.id
    };

    // Translate message for all connected users
    const translations = {};
    for (const [userId, userInfo] of connectedUsers) {
      if (userInfo.preferredLanguage !== 'en') {
        try {
          const translated = await translateText(text, userInfo.preferredLanguage);
          translations[userInfo.preferredLanguage] = translated;
        } catch (error) {
          console.error('Translation error:', error);
          translations[userInfo.preferredLanguage] = text;
        }
      }
    }

    message.translations = translations;
    messages.push(message);

    // Emit message to all clients
    io.emit('new_message', message);
  });

  // Handle typing indicator
  socket.on('typing_start', () => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      typingUsers.add(user.username);
      socket.broadcast.emit('user_typing', {
        username: user.username,
        isTyping: true
      });
    }
  });

  socket.on('typing_stop', () => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      typingUsers.delete(user.username);
      socket.broadcast.emit('user_typing', {
        username: user.username,
        isTyping: false
      });
    }
  });

  // Handle chat summary request
  socket.on('request_summary', () => {
    const user = connectedUsers.get(socket.id);
    if (!user) return;

    const summary = generateSummary(messages);
    socket.emit('chat_summary', {
      summary,
      messageCount: messages.length,
      timestamp: new Date()
    });
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      connectedUsers.delete(socket.id);
      typingUsers.delete(user.username);
      
      // Update users list
      io.emit('users_updated', Array.from(connectedUsers.values()));
      
      // Notify others about user leaving
      socket.broadcast.emit('user_left', {
        username: user.username,
        message: `${user.username} left the chat`
      });

      console.log(`${user.username} disconnected`);
    }
  });
});

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    connectedUsers: connectedUsers.size,
    totalMessages: messages.length 
  });
});

app.get('/api/messages', (req, res) => {
  res.json(messages.slice(-100)); // Return last 100 messages
});

app.get('/api/users', (req, res) => {
  res.json(Array.from(connectedUsers.values()));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Socket.IO server ready for connections`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
});
