#!/bin/bash

# Risk Ranger - Quick Deploy to Vercel
# This script builds and deploys Risk Ranger in one command
# Uses npx (no installation required!)

echo "🚀 Risk Ranger Deployment Script"
echo "================================"
echo ""

# Build the app
echo "📦 Building Risk Ranger for production..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

# Deploy to Vercel using npx (no install needed)
echo "🌐 Deploying to Vercel..."
echo ""
echo "📝 Note: You may need to login to Vercel on first run"
echo ""

npx vercel --prod

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "🎉 Your Risk Ranger is now live!"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Copy the deployment URL shown above"
    echo "   2. Update side-by-side-embed.html with your new URL:"
    echo ""
    echo "   const config = {"
    echo "       riskRangerUrl: 'YOUR_URL_HERE',"
    echo "   };"
    echo ""
    echo "   3. Test your deployed app"
    echo ""
else
    echo "❌ Deployment failed. Please check the errors above."
    exit 1
fi
