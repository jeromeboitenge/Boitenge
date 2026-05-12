#!/bin/bash

# Pre-Deployment Verification Script
# Run this before pushing to ensure everything is ready for deployment

echo "🚀 Starting Pre-Deployment Verification..."
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  Warning: .env.local not found"
    echo "   Create it from .env.local.example if needed for local development"
else
    echo "✅ .env.local found"
fi

# Check Node version
NODE_VERSION=$(node -v)
echo "📦 Node version: $NODE_VERSION"

# Install dependencies
echo ""
echo "📥 Installing dependencies..."
npm install

# Run TypeScript check
echo ""
echo "🔍 Checking TypeScript..."
npx tsc --noEmit
if [ $? -eq 0 ]; then
    echo "✅ TypeScript check passed"
else
    echo "❌ TypeScript errors found - please fix before deploying"
    exit 1
fi

# Run linting
echo ""
echo "🔍 Running linter..."
npm run lint
if [ $? -eq 0 ]; then
    echo "✅ Linting passed"
else
    echo "⚠️  Linting warnings found - review before deploying"
fi

# Try to build
echo ""
echo "🏗️  Building application..."
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed - please fix errors before deploying"
    exit 1
fi

echo ""
echo "✅ All checks passed! Ready for deployment."
echo ""
echo "Next steps:"
echo "1. Commit your changes: git add . && git commit -m 'Ready for deployment'"
echo "2. Push to GitHub: git push origin main"
echo "3. Render will automatically deploy your changes"
