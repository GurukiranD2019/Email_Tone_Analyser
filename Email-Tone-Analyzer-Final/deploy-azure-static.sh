#!/bin/bash

# Azure Static Site Deployment Script
# This script prepares the dist folder for Azure deployment

echo "🚀 Preparing Email Tone Analyzer for Azure deployment..."

# Build the application
echo "📦 Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo ""
    echo "📁 Ready for Azure deployment:"
    echo "   Deploy the contents of the 'dist/' folder to Azure"
    echo ""
    echo "📋 Azure Configuration:"
    echo "   - Type: Static Web App"
    echo "   - Root Directory: /dist"
    echo "   - Build Command: npm run build"
    echo "   - Output Location: dist"
    echo ""
    echo "📝 Files to deploy:"
    ls -la dist/
    echo ""
    echo "🌐 Your app will be available at: https://your-app-name.azurestaticapps.net"
else
    echo "❌ Build failed! Please fix the errors and try again."
    exit 1
fi
