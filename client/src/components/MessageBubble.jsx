import React from 'react';
import { Clock, Globe } from 'lucide-react';

const MessageBubble = ({ message, isOwn, currentUser }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getLanguageFlag = (langCode) => {
    const flags = {
      'en': '🇺🇸',
      'es': '🇪🇸',
      'fr': '🇫🇷',
      'de': '🇩🇪'
    };
    return flags[langCode] || '🌐';
  };

  // System message styling
  if (message.type === 'system') {
    return (
      <div className="flex justify-center">
        <div className="bg-gray-200 text-gray-600 px-4 py-2 rounded-full text-sm">
          {message.message}
        </div>
      </div>
    );
  }

  // Regular message
  const translatedText = message.translations?.[currentUser?.preferredLanguage];
  const showTranslation = translatedText && translatedText !== message.originalText;

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs lg:max-w-md ${isOwn ? 'ml-12' : 'mr-12'}`}>
        {/* Username */}
        {!isOwn && (
          <div className="text-xs text-gray-500 mb-1 px-2">
            {message.username}
          </div>
        )}

        {/* Message bubble */}
        <div
          className={`px-4 py-3 rounded-2xl shadow-sm ${
            isOwn
              ? 'bg-primary-500 text-white'
              : 'bg-white text-gray-800 border border-gray-200'
          }`}
        >
          {/* Original message */}
          <div className="text-sm leading-relaxed">
            {message.originalText}
          </div>

          {/* Translation */}
          {showTranslation && (
            <div className={`mt-2 pt-2 border-t ${
              isOwn ? 'border-primary-400' : 'border-gray-200'
            }`}>
              <div className="flex items-center space-x-1 mb-1">
                <Globe className={`w-3 h-3 ${isOwn ? 'text-primary-200' : 'text-gray-400'}`} />
                <span className={`text-xs ${isOwn ? 'text-primary-200' : 'text-gray-500'}`}>
                  {getLanguageFlag(currentUser?.preferredLanguage)} Translated
                </span>
              </div>
              <div className={`text-sm leading-relaxed ${
                isOwn ? 'text-primary-100' : 'text-gray-600'
              }`}>
                {translatedText}
              </div>
            </div>
          )}
        </div>

        {/* Timestamp */}
        <div className={`text-xs text-gray-400 mt-1 px-2 ${
          isOwn ? 'text-right' : 'text-left'
        }`}>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{formatTime(message.timestamp)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
