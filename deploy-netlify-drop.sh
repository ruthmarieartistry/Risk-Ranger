#!/bin/bash

# Risk Ranger - Deploy to Netlify Drop (Simplest Method!)
# No CLI installation needed - just builds and opens Netlify Drop

echo "🚀 Risk Ranger - Netlify Drop Deployment"
echo "========================================"
echo ""
echo "This is the EASIEST deployment method!"
echo "No account needed, no CLI to install."
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

# Open Netlify Drop in browser
echo "🌐 Opening Netlify Drop in your browser..."
echo ""
echo "📝 Instructions:"
echo "   1. Drag the 'dist' folder onto the Netlify Drop page"
echo "   2. Wait for upload to complete (~30 seconds)"
echo "   3. Copy your new URL (will look like: https://random-name-123456.netlify.app)"
echo "   4. Update side-by-side-embed.html with your URL"
echo ""
echo "Opening browser in 3 seconds..."
sleep 3

# Open Netlify Drop
open https://app.netlify.com/drop

echo ""
echo "✅ Browser opened!"
echo ""
echo "📂 Your 'dist' folder is ready to drag:"
echo "   Location: $(pwd)/dist/"
echo ""
echo "💡 Tip: Open Finder and drag the dist folder to the browser window"
echo ""
