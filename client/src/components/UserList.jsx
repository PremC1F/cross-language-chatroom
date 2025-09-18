import React from 'react';
import { Users, Globe, Clock } from 'lucide-react';

const UserList = ({ users, currentUser }) => {
  const getLanguageFlag = (langCode) => {
    const flags = {
      'en': '🇺🇸',
      'es': '🇪🇸',
      'fr': '🇫🇷',
      'de': '🇩🇪'
    };
    return flags[langCode] || '🌐';
  };

  const getLanguageName = (langCode) => {
    const names = {
      'en': 'English',
      'es': 'Español',
      'fr': 'Français',
      'de': 'Deutsch'
    };
    return names[langCode] || langCode.toUpperCase();
  };

  const formatJoinTime = (joinTime) => {
    const now = new Date();
    const join = new Date(joinTime);
    const diffMinutes = Math.floor((now - join) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return join.toLocaleDateString();
  };

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center space-x-2 mb-6">
          <Users className="w-5 h-5 text-primary-500" />
          <h2 className="text-xl font-semibold text-gray-900">
            Connected Users ({users.length})
          </h2>
        </div>

        {users.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No users connected</p>
          </div>
        ) : (
          <div className="space-y-3">
            {users.map((user) => (
              <div
                key={user.id}
                className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm transition-colors ${
                  user.id === currentUser?.id ? 'ring-2 ring-primary-500 bg-primary-50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-semibold">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-gray-900">
                          {user.username}
                        </h3>
                        {user.id === currentUser?.id && (
                          <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                            You
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Globe className="w-3 h-3" />
                          <span>
                            {getLanguageFlag(user.preferredLanguage)} {getLanguageName(user.preferredLanguage)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>Joined {formatJoinTime(user.joinTime)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-500">Online</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">💡 How it works</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Messages are automatically translated to your preferred language</li>
            <li>• You can see both original and translated text</li>
            <li>• All users can communicate regardless of their language</li>
            <li>• Real-time typing indicators show when someone is typing</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserList;
