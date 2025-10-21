# Side-by-Side Embedding Guide
## NeonearBy & Risk Ranger - Gold Standard Responsive Layout

This guide shows you how to embed both Alcea Surrogacy tools side-by-side with perfect responsive behavior.

---

## 📋 Quick Start

### Option 1: Iframe Embed (Simplest)
Use `side-by-side-embed.html` to display both apps in iframes.

**Setup:**
1. Make sure both apps are running:
   - NeonearBy: `http://localhost:3000`
   - Risk Ranger: `http://localhost:5173`

2. Update URLs in `side-by-side-embed.html`:
```javascript
const config = {
    neonearbyUrl: 'http://localhost:3000',  // Your NeonearBy URL
    riskRangerUrl: 'http://localhost:5173', // Your Risk Ranger URL
};
```

3. Open `side-by-side-embed.html` in your browser

---

## 🎨 Responsive Breakpoints

### Desktop (1536px+) - Side by Side
```
┌─────────────────────────────────────────────────────┐
│  NeonearBy           │         Risk Ranger          │
│  NICU Finder         │         Assessment           │
│                      │                              │
│                      │                              │
└─────────────────────────────────────────────────────┘
```

### Tablet (768px - 1535px) - Stacked Vertically
```
┌─────────────────────────────────────────────────────┐
│                  NeonearBy                          │
│                  NICU Finder                        │
├─────────────────────────────────────────────────────┤
│                  Risk Ranger                        │
│                  Assessment                         │
└─────────────────────────────────────────────────────┘
```

### Mobile (<768px) - Stacked Vertically
```
┌───────────────────┐
│   NeonearBy       │
│   NICU Finder     │
├───────────────────┤
│   Risk Ranger     │
│   Assessment      │
└───────────────────┘
```

---

## 🚀 Production Deployment

### 1. Update Production URLs

```javascript
const config = {
    neonearbyUrl: 'https://nicu-finder.alcea.com',    // Production URL
    riskRangerUrl: 'https://risk-ranger.alcea.com',   // Production URL
};
```

### 2. Build Both Apps

**NeonearBy (Next.js):**
```bash
cd /Users/ruthellis/nicu-finder
npm run build
npm start  # Runs on production server
```

**Risk Ranger (Vite):**
```bash
cd /Users/ruthellis/surrogacy-risk-assessment
npm run build
# Deploy dist/ folder to your hosting
```

### 3. Deploy Embed Page

Upload `side-by-side-embed.html` to your web server. Users can access:
```
https://yourdomain.com/alcea-tools.html
```

---

## 🎯 Embedding in Website

### Embed as Full Page
```html
<iframe
    src="https://yourdomain.com/alcea-tools.html"
    style="width: 100%; min-height: 100vh; border: none;"
    title="Alcea Surrogacy Tools"
></iframe>
```

### Embed in Section
```html
<div style="max-width: 1920px; margin: 0 auto;">
    <iframe
        src="https://yourdomain.com/alcea-tools.html"
        style="width: 100%; height: 1200px; border: none;"
        title="Alcea Surrogacy Tools"
    ></iframe>
</div>
```

---

## 🔧 Customization

### Remove Header
In `side-by-side-embed.html`, delete or comment out:
```html
<!-- <div class="header">...</div> -->
```

### Change Breakpoint
Adjust the side-by-side breakpoint:
```css
/* Change from 1536px to your preferred width */
@media (min-width: 1400px) {
    .apps-grid {
        grid-template-columns: 1fr 1fr;
    }
}
```

### Add Custom Styling
```css
/* Add to <style> section */
.app-frame {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
}
```

---

## 📱 Mobile Optimization

### Auto-scroll to Active App
```javascript
// Add to <script> section
function scrollToApp(appId) {
    if (window.innerWidth < 1536) {
        document.getElementById(appId).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}
```

### Add Tab Navigation (Mobile)
```html
<!-- Add before apps-grid -->
<div class="mobile-tabs" style="display: none;">
    <button onclick="scrollToApp('neonearby-frame')">NICU Finder</button>
    <button onclick="scrollToApp('risk-ranger-frame')">Risk Ranger</button>
</div>

<style>
@media (max-width: 1535px) {
    .mobile-tabs {
        display: flex !important;
        gap: 8px;
        padding: 16px;
        background: white;
        border-bottom: 2px solid #e5e7eb;
    }
    .mobile-tabs button {
        flex: 1;
        padding: 12px;
        background: #f3f4f6;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
    }
    .mobile-tabs button:hover {
        background: #e5e7eb;
    }
}
</style>
```

---

## 🔒 Security Considerations

### Content Security Policy (CSP)
If embedding on a secure site, add CSP headers:
```html
<meta http-equiv="Content-Security-Policy"
      content="frame-ancestors 'self' https://yourdomain.com;">
```

### CORS Headers
Both apps should allow embedding:
```javascript
// In your Next.js/Express config
headers: {
    'X-Frame-Options': 'SAMEORIGIN',
    'Content-Security-Policy': "frame-ancestors 'self' https://yourdomain.com"
}
```

---

## 🎨 Branding Customization

### Change Alcea Colors
```css
:root {
    --alcea-ruby: #7d2431;
    --alcea-green: #217045;
    --alcea-mustard: #e1b321;
    --alcea-brown: #a5630b;
    --alcea-teal: #005567;
}
```

### Add Custom Logo
```html
<div class="header-logo">
    <img src="/your-custom-logo.png" alt="Your Company">
</div>
```

---

## 📊 Performance Optimization

### Lazy Load Second App
```javascript
// Load Risk Ranger only when user scrolls down
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            embedApp('risk-ranger-frame', config.riskRangerUrl, 'Risk Ranger');
            observer.disconnect();
        }
    });
});

observer.observe(document.getElementById('risk-ranger-frame'));
```

### Preconnect to App URLs
```html
<link rel="preconnect" href="http://localhost:3000">
<link rel="preconnect" href="http://localhost:5173">
```

---

## 🧪 Testing Checklist

- [ ] Both apps load on desktop (1536px+)
- [ ] Side-by-side layout works correctly
- [ ] Tablet view (768-1535px) stacks vertically
- [ ] Mobile view (<768px) is readable
- [ ] Header is responsive
- [ ] Scrolling works smoothly
- [ ] Both apps are functional (forms work, buttons work)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Load time is acceptable (<3 seconds)

---

## 🐛 Troubleshooting

### Apps Don't Load
1. Check console for errors
2. Verify both servers are running
3. Check CORS headers
4. Verify URLs in config

### Layout Breaks
1. Check CSS media queries
2. Verify max-width settings
3. Test on different screen sizes
4. Clear browser cache

### Iframe Height Issues
```javascript
// Auto-adjust iframe height
function resizeIframe(iframe) {
    iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
}
```

---

## 📦 File Structure

```
surrogacy-risk-assessment/
├── side-by-side-embed.html          ← Main embed file (use this!)
├── EMBEDDING_GUIDE.md               ← This guide
└── embed.html                       ← Standalone version
```

---

## 🌟 Best Practices

1. **Always test responsive behavior** - Check all breakpoints
2. **Use HTTPS in production** - Security first
3. **Optimize images** - Compress logos and assets
4. **Monitor performance** - Use Lighthouse/PageSpeed
5. **Keep apps updated** - Deploy latest versions
6. **Test cross-browser** - Don't rely on one browser
7. **Add loading states** - Better UX while apps load
8. **Handle errors gracefully** - Show friendly error messages

---

## 💡 Advanced Features

### Cross-App Communication
```javascript
// Send data from NeonearBy to Risk Ranger
window.addEventListener('message', (event) => {
    if (event.data.type === 'nicu-selected') {
        // Forward to Risk Ranger
        const riskRangerFrame = document.querySelector('#risk-ranger-frame iframe');
        riskRangerFrame.contentWindow.postMessage({
            type: 'populate-nicu-data',
            data: event.data.nicu
        }, '*');
    }
});
```

### URL-based Navigation
```javascript
// ?app=risk-ranger scrolls to that app
const urlParams = new URLSearchParams(window.location.search);
const activeApp = urlParams.get('app');
if (activeApp) {
    scrollToApp(`${activeApp}-frame`);
}
```

---

## 🎯 Success!

You now have a **gold standard responsive embed** for both Alcea Surrogacy tools!

**Test it:** Open `side-by-side-embed.html` in your browser and resize the window to see the responsive magic!

**Questions?** Check the troubleshooting section or inspect the code comments.

---

**Made with ❤️ for Alcea Surrogacy**
**© RME 2025**
