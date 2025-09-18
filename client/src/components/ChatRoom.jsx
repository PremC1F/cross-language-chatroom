import React, { useState, useEffect, useRef } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import UserList from './UserList';
import ChatSummary from './ChatSummary';
import { MessageSquare, Users, FileText } from 'lucide-react';

const ChatRoom = ({ socket, user }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    // Listen for new messages
    socket.on('new_message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    // Listen for recent messages (when joining)
    socket.on('recent_messages', (recentMessages) => {
      setMessages(recentMessages);
    });

    // Listen for user updates
    socket.on('users_updated', (updatedUsers) => {
      setUsers(updatedUsers);
    });

    // Listen for typing indicators
    socket.on('user_typing', (typingData) => {
      setTypingUsers(prev => {
        if (typingData.isTyping) {
          return [...prev.filter(u => u !== typingData.username), typingData.username];
        } else {
          return prev.filter(u => u !== typingData.username);
        }
      });
    });

    // Listen for system messages
    socket.on('user_joined', (data) => {
      setMessages(prev => [...prev, {
        id: Date.now() + Math.random(),
        type: 'system',
        message: data.message,
        timestamp: new Date()
      }]);
    });

    socket.on('user_left', (data) => {
      setMessages(prev => [...prev, {
        id: Date.now() + Math.random(),
        type: 'system',
        message: data.message,
        timestamp: new Date()
      }]);
    });

    return () => {
      socket.off('new_message');
      socket.off('recent_messages');
      socket.off('users_updated');
      socket.off('user_typing');
      socket.off('user_joined');
      socket.off('user_left');
    };
  }, [socket]);

  const handleSendMessage = (text) => {
    if (socket && text.trim()) {
      socket.emit('send_message', { text: text.trim() });
    }
  };

  const handleTyping = (isTyping) => {
    if (socket) {
      if (isTyping) {
        socket.emit('typing_start');
      } else {
        socket.emit('typing_stop');
      }
    }
  };

  const handleRequestSummary = () => {
    if (socket) {
      socket.emit('request_summary');
      setShowSummary(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('chat')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === 'chat'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat</span>
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === 'users'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Users ({users.length})</span>
            </button>
            <button
              onClick={handleRequestSummary}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === 'summary'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Summary</span>
            </button>
          </nav>
        </div>

        <div className="flex h-96">
          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {activeTab === 'chat' && (
              <>
                <MessageList 
                  messages={messages} 
                  currentUser={user}
                  typingUsers={typingUsers}
                />
                <div ref={messagesEndRef} />
                <MessageInput 
                  onSendMessage={handleSendMessage}
                  onTyping={handleTyping}
                />
              </>
            )}

            {activeTab === 'users' && (
              <UserList users={users} currentUser={user} />
            )}

            {activeTab === 'summary' && (
              <ChatSummary 
                socket={socket}
                showSummary={showSummary}
                onClose={() => setShowSummary(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
