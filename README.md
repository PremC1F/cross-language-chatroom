# 🌐Cross-Language Chatroom

A real-time cross-language chatroom web application with AI translation and summarization features. Perfect for portfolio demonstration and showcasing modern web development skills.

![Cross-Language Chatroom](https://img.shields.io/badge/React-18.2.0-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![Socket.IO](https://img.shields.io/badge/Socket.IO-Real--time-orange) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.6-cyan)

## ✨ Features

### 🚀 Core Functionality
- **Real-time messaging** with Socket.IO
- **Cross-language translation** (English, Spanish, French, German)
- **Auto-scroll** to latest messages
- **Typing indicators** showing when users are typing
- **User management** with connected users list
- **Mobile-responsive** design

### 🌍 Translation Features
- **Automatic translation** of messages to user's preferred language
- **Dual display** showing both original and translated text
- **Language selection** on join
- **Fallback translation** system for demo purposes

### 🤖 AI Features
- **Chat summarization** of last 10 messages
- **Mock AI service** for demo (easily extensible to real AI)
- **Summary export** capabilities

### 🎨 UI/UX Features
- **Clean, modern interface** with TailwindCSS
- **Message bubbles** with different colors for own/others
- **Timestamps** on all messages
- **User avatars** and status indicators
- **Tabbed interface** (Chat, Users, Summary)
- **Connection status** indicators

## 🏗️ Architecture

```
cross-language-chatroom/
├── server/                 # Backend (Node.js + Express + Socket.IO)
│   ├── index.js           # Main server file
│   ├── package.json       # Server dependencies
│   └── env.example        # Environment variables template
├── client/                # Frontend (React + Vite + TailwindCSS)
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── package.json       # Client dependencies
│   └── vite.config.js     # Vite configuration
├── package.json           # Root package.json with scripts
└── README.md             # This file
```

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   # If you have the project files, navigate to the directory
   cd cross-language-chatroom
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start both the backend server (port 3001) and frontend dev server (port 5173).

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Alternative Setup (Manual)

If you prefer to set up manually:

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Start servers (in separate terminals)
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

## 🎯 Usage

### Joining the Chat
1. Enter your username
2. Select your preferred language
3. Click "Join Chat"

### Sending Messages
1. Type your message in the input field
2. Press Enter to send (Shift+Enter for new line)
3. Your message will be automatically translated for other users

### Features to Try
- **Multiple users**: Open multiple browser tabs/windows to simulate different users
- **Different languages**: Join with different language preferences
- **Typing indicators**: Start typing to see the indicator
- **User list**: Click the "Users" tab to see connected users
- **AI Summary**: Click the "Summary" tab and generate a chat summary

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.IO** - Real-time communication
- **Axios** - HTTP client for translation API
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Socket.IO Client** - Real-time communication
- **Lucide React** - Icon library

### Translation
- **LibreTranslate** - Free, open-source translation API
- **Fallback system** - Demo translations for offline use

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `server/` directory:

```env
# Server Configuration
PORT=3001

# Translation Service (optional)
LIBRETRANSLATE_URL=https://libretranslate.de/translate
TRANSLATION_API_KEY=your_api_key_here

# AI Summary Service (optional)
OPENAI_API_KEY=your_openai_api_key_here
HUGGINGFACE_API_KEY=your_huggingface_api_key_here
```

### Customization

- **Languages**: Add more languages in `client/src/components/JoinForm.jsx`
- **Translation**: Modify translation logic in `server/index.js`
- **Styling**: Customize TailwindCSS in `client/tailwind.config.js`
- **Ports**: Change ports in `server/index.js` and `client/vite.config.js`

## 🚀 Deployment

### Local Production Build

```bash
# Build the client
cd client
npm run build

# Start the server in production mode
cd ../server
npm start
```

### Cloud Deployment

#### Frontend (Vercel/Netlify)
1. Build the client: `cd client && npm run build`
2. Deploy the `dist/` folder to your hosting service
3. Update the Socket.IO URL in the client code

#### Backend (Railway/Heroku/DigitalOcean)
1. Deploy the `server/` folder
2. Set environment variables
3. Update CORS settings for your domain

## Customization Ideas

### Easy Extensions
1. **Add more languages** - Extend the language list and translation mappings
2. **Custom themes** - Add dark mode or custom color schemes
3. **Message reactions** - Add emoji reactions to messages
4. **File sharing** - Allow users to share images or files

### Advanced Extensions
1. **User authentication** - Add login/signup with JWT
2. **Persistent storage** - Integrate with MongoDB or PostgreSQL
3. **Private rooms** - Create separate chat rooms
4. **Voice messages** - Add audio recording and playback
5. **Video calls** - Integrate WebRTC for video chat

### AI Enhancements
1. **Real AI integration** - Connect to OpenAI GPT or Hugging Face
2. **Sentiment analysis** - Analyze message sentiment
3. **Smart replies** - Suggest responses based on context
4. **Language detection** - Auto-detect message language

## 🐛 Troubleshooting

### Common Issues

**Connection failed**
- Ensure the server is running on port 3001
- Check that no firewall is blocking the connection
- Verify the Socket.IO URL in the client code

**Translation not working**
- The app uses a fallback translation system for demo purposes
- For real translations, configure LibreTranslate API
- Check browser console for translation errors

**Messages not appearing**
- Check browser console for Socket.IO errors
- Ensure both client and server are running
- Try refreshing the page

**Styling issues**
- Ensure TailwindCSS is properly configured
- Check that all CSS files are imported
- Verify PostCSS configuration

## 📱 Mobile Support

The application is fully responsive and works on:
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Tablet devices

## 🤝 Contributing

This is a portfolio demo project, but feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project for your portfolio or learning purposes.

## 🎯 Interview Talking Points

When presenting this project, you can highlight:

### Technical Skills
- **Full-stack development** with modern technologies
- **Real-time communication** with WebSockets
- **API integration** and error handling
- **Responsive design** and mobile-first approach
- **Component-based architecture** with React

### Problem-Solving
- **Cross-language communication** challenge
- **Real-time synchronization** of messages
- **Fallback systems** for external API failures
- **User experience** considerations

### Scalability Considerations
- **Modular architecture** for easy extension
- **Environment-based configuration**
- **Error handling** and graceful degradation
- **Performance optimization** with efficient re-renders

---

**Built with ❤️ for portfolio demonstration**

*Perfect for showcasing modern web development skills in interviews!*
