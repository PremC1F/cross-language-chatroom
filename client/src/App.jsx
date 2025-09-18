import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import ChatRoom from './components/ChatRoom';
import JoinForm from './components/JoinForm';
import Header from './components/Header';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';

function App() {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(SOCKET_URL, {
      transports: ['websocket', 'polling']
    });

    newSocket.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
      setError(null);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      setError('Failed to connect to server. Please make sure the server is running.');
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const handleJoin = (userData) => {
    if (socket && isConnected) {
      socket.emit('join', userData);
      setUser(userData);
    }
  };

  const handleLeave = () => {
    if (socket) {
      socket.disconnect();
    }
    setUser(null);
    setSocket(null);
    setIsConnected(false);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Connection Error</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
            >
              Retry Connection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isConnected={isConnected} user={user} onLeave={handleLeave} />
      
      <main className="container mx-auto px-4 py-8">
        {!user ? (
          <JoinForm onJoin={handleJoin} isConnected={isConnected} />
        ) : (
          <ChatRoom socket={socket} user={user} />
        )}
      </main>
    </div>
  );
}

export default App;
