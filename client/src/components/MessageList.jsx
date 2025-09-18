import React from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

const MessageList = ({ messages, currentUser, typingUsers }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 chat-scroll">
      {messages.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <div className="text-4xl mb-2">💬</div>
          <p>No messages yet. Start the conversation!</p>
        </div>
      ) : (
        messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwn={message.userId === currentUser?.id || message.username === currentUser?.username}
            currentUser={currentUser}
          />
        ))
      )}
      
      {typingUsers.length > 0 && (
        <TypingIndicator users={typingUsers} />
      )}
    </div>
  );
};

export default MessageList;
