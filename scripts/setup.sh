#!/usr/bin/env bash
set -e

echo "🚀 Initializing ResumeMatch AI Monorepo Environment..."

if [ ! -f .env ]; then
    echo "📋 Copying .env.example to .env..."
    cp .env.example .env
fi

if [ ! -f backend/.env ]; then
    echo "📋 Copying backend/.env.example to backend/.env..."
    cp backend/.env.example backend/.env
fi

if [ ! -f frontend/.env.local ]; then
    echo "📋 Copying frontend/.env.example to frontend/.env.local..."
    cp frontend/.env.example frontend/.env.local
fi

echo "✅ All Environment files ready."
echo "🎉 Setup completed. Run 'docker compose up --build' to start services."
