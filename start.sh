#!/bin/bash

echo "🌐 Starting Cross-Language Chatroom..."
echo ""
echo "Installing dependencies..."
npm run install-all
echo ""
echo "Starting development servers..."
echo "Frontend: http://localhost:5173"
echo "Backend: http://localhost:3001"
echo ""
npm run dev
