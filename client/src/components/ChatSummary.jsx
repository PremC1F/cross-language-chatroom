import React, { useState, useEffect } from 'react';
import { FileText, RefreshCw, X, Clock, MessageSquare } from 'lucide-react';

const ChatSummary = ({ socket, showSummary, onClose }) => {
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!socket) return;

    const handleSummary = (data) => {
      setSummary(data);
      setIsLoading(false);
      setError(null);
    };

    socket.on('chat_summary', handleSummary);

    return () => {
      socket.off('chat_summary', handleSummary);
    };
  }, [socket]);

  const handleRequestSummary = () => {
    if (socket) {
      setIsLoading(true);
      setError(null);
      socket.emit('request_summary');
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-primary-500" />
            <h2 className="text-xl font-semibold text-gray-900">
              Chat Summary
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Summary Request Button */}
          <div className="text-center">
            <button
              onClick={handleRequestSummary}
              disabled={isLoading}
              className="bg-primary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2 mx-auto"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Generating Summary...</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  <span>Generate AI Summary</span>
                </>
              )}
            </button>
            <p className="text-sm text-gray-500 mt-2">
              Get an AI-powered summary of the last 10 messages
            </p>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-red-800">
                <span>⚠️</span>
                <span className="font-medium">Error generating summary</span>
              </div>
              <p className="text-red-700 text-sm mt-1">{error}</p>
            </div>
          )}

          {/* Summary Content */}
          {summary && (
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  📝 Conversation Summary
                </h3>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{formatTime(summary.timestamp)}</span>
                </div>
              </div>

              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {summary.summary}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>{summary.messageCount} total messages</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FileText className="w-4 h-4" />
                    <span>AI-generated summary</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Demo Info */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-900 mb-2">🤖 AI Summary Feature</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Uses AI to analyze the last 10 messages</li>
              <li>• Provides a concise overview of the conversation</li>
              <li>• Perfect for catching up on missed messages</li>
              <li>• Demo version uses a mock AI service</li>
            </ul>
          </div>

          {/* Extension Ideas */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">🚀 Possible Extensions</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Integrate with OpenAI GPT for real AI summaries</li>
              <li>• Add sentiment analysis of conversations</li>
              <li>• Export summaries as PDF or text files</li>
              <li>• Schedule automatic daily/weekly summaries</li>
              <li>• Add conversation topics and keywords extraction</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSummary;
