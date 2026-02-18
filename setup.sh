#!/bin/bash

# CUBIQO Platform Setup Script

echo "🚀 Setting up CUBIQO Platform..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Setup Backend
echo ""
echo "📦 Setting up Backend..."
cd backend

if [ ! -f ".env" ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please update .env file with your configuration"
fi

echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "✅ Backend setup complete"

# Setup Frontend
echo ""
echo "📦 Setting up Frontend..."
cd ../frontend

if [ ! -f "package-lock.json" ]; then
    echo "Installing Node.js dependencies..."
    npm install
else
    echo "Installing Node.js dependencies..."
    npm ci
fi

echo "✅ Frontend setup complete"

# Final instructions
echo ""
echo "🎉 Setup complete!"
echo ""
echo "To start the development servers:"
echo ""
echo "Backend (Terminal 1):"
echo "  cd backend"
echo "  python server_v2.py"
echo ""
echo "Frontend (Terminal 2):"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo "📚 Documentation: PLATFORM_ARCHITECTURE.md"
echo "🔗 API Docs: http://localhost:8000/docs"
echo "🌐 Frontend: http://localhost:3000"
echo ""
echo "⚠️  Remember to:"
echo "  1. Update backend/.env with your MongoDB connection"
echo "  2. Update backend/.env with secure SECRET_KEY and ENCRYPTION_KEY"
echo "  3. Configure external API keys if needed (OpenAI, Anthropic)"
