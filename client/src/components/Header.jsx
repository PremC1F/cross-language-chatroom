import React from 'react';
import { Wifi, WifiOff, Users, LogOut } from 'lucide-react';

const Header = ({ isConnected, user, onLeave }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">
              🌐 Cross-Language Chat
            </h1>
            <div className="flex items-center space-x-2">
              {isConnected ? (
                <div className="flex items-center space-x-1 text-green-600">
                  <Wifi className="w-4 h-4" />
                  <span className="text-sm font-medium">Connected</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1 text-red-600">
                  <WifiOff className="w-4 h-4" />
                  <span className="text-sm font-medium">Disconnected</span>
                </div>
              )}
            </div>
          </div>

          {user && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="w-4 h-4" />
                <span className="text-sm">
                  Welcome, <span className="font-semibold text-gray-900">{user.username}</span>
                </span>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                  {user.preferredLanguage.toUpperCase()}
                </span>
              </div>
              <button
                onClick={onLeave}
                className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
                title="Leave chat"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Leave</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
