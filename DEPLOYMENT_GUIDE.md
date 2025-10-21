# Risk Ranger Deployment Guide
## Hosting Your Surrogacy Risk Assessment Tool

Yes, you need to host Risk Ranger on a web server to use it in production! Here are your options from easiest to most advanced.

---

## 🎯 Quick Summary

**Build Status:** ✅ Complete (2.1 MB)
**Build Location:** `/Users/ruthellis/surrogacy-risk-assessment/dist/`
**What to Deploy:** Everything in the `dist/` folder

---

## 🚀 Deployment Options (Easiest First)

### Option 1: Vercel (Recommended - Free & Easiest)

**Best for:** Quick deployment, automatic HTTPS, free hosting

**Steps:**

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
cd /Users/ruthellis/surrogacy-risk-assessment
vercel --prod
```

3. **Follow prompts:**
   - Login/create account
   - Confirm project settings
   - Get your URL: `https://risk-ranger.vercel.app`

**Pros:**
- ✅ Free tier is generous
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Easy updates (`vercel --prod` to redeploy)
- ✅ Custom domains available

**Cons:**
- ❌ Requires Vercel account

**Cost:** FREE

---

### Option 2: Netlify (Also Easy & Free)

**Best for:** Drag-and-drop deployment, great for non-technical users

**Steps:**

1. **Go to:** https://app.netlify.com/drop

2. **Drag the `dist` folder** onto the page

3. **Get your URL:** `https://random-name-123456.netlify.app`

4. **Custom domain (optional):**
   - Site settings → Domain management
   - Add custom domain like `risk-ranger.alcea.com`

**Pros:**
- ✅ No CLI needed
- ✅ Free tier
- ✅ Automatic HTTPS
- ✅ Easy updates (drag new dist folder)

**Cons:**
- ❌ Manual updates (no auto-deploy)

**Cost:** FREE

---

### Option 3: GitHub Pages (Free, Good for Open Source)

**Best for:** If you're already using GitHub

**Steps:**

1. **Initialize git (if not already):**
```bash
cd /Users/ruthellis/surrogacy-risk-assessment
git init
git add .
git commit -m "Initial commit"
```

2. **Create GitHub repo:**
   - Go to github.com/new
   - Create `risk-ranger` repository

3. **Push code:**
```bash
git remote add origin https://github.com/YOUR_USERNAME/risk-ranger.git
git branch -M main
git push -u origin main
```

4. **Deploy to GitHub Pages:**
```bash
npm install -g gh-pages
npm run build
npx gh-pages -d dist
```

5. **Enable Pages:**
   - Go to Settings → Pages
   - Source: `gh-pages` branch
   - Get URL: `https://YOUR_USERNAME.github.io/risk-ranger/`

**Pros:**
- ✅ Free
- ✅ Integrated with GitHub
- ✅ Custom domains

**Cons:**
- ❌ Extra step for updates
- ❌ Public repository (unless paid)

**Cost:** FREE

---

### Option 4: Your Own Server (Most Control)

**Best for:** If you have an existing server/hosting

#### A. Via FTP/File Manager

1. **Zip the dist folder:**
```bash
cd /Users/ruthellis/surrogacy-risk-assessment
zip -r risk-ranger-build.zip dist/*
```

2. **Upload via FTP:**
   - Use FileZilla, Cyberduck, or cPanel File Manager
   - Upload contents to `public_html/risk-ranger/`

3. **Access at:**
   - `https://yourdomain.com/risk-ranger/`

#### B. Via Command Line (SSH)

```bash
# On your server
cd /var/www/html
mkdir risk-ranger

# From your Mac, upload files
cd /Users/ruthellis/surrogacy-risk-assessment/dist
scp -r * user@yourserver.com:/var/www/html/risk-ranger/
```

**Pros:**
- ✅ Full control
- ✅ Can use existing domain
- ✅ No third-party dependency

**Cons:**
- ❌ Requires server management
- ❌ Must configure HTTPS yourself
- ❌ More complex

**Cost:** Depends on hosting ($5-50/month)

---

### Option 5: AWS S3 + CloudFront (Enterprise)

**Best for:** High traffic, enterprise deployments

**Steps:**

1. **Create S3 bucket:**
```bash
aws s3 mb s3://risk-ranger-app
```

2. **Enable static website hosting:**
```bash
aws s3 website s3://risk-ranger-app/ --index-document index.html
```

3. **Upload files:**
```bash
cd /Users/ruthellis/surrogacy-risk-assessment
aws s3 sync dist/ s3://risk-ranger-app/ --acl public-read
```

4. **Set up CloudFront (CDN):**
   - Go to CloudFront console
   - Create distribution
   - Origin: Your S3 bucket
   - Get URL: `https://d123456789abcd.cloudfront.net`

**Pros:**
- ✅ Scalable to millions of users
- ✅ Global CDN
- ✅ Very fast
- ✅ 99.99% uptime

**Cons:**
- ❌ More complex setup
- ❌ Costs money (but cheap)

**Cost:** ~$1-5/month (low traffic)

---

## 🎯 Recommended Setup

### For Development/Testing
**Use:** Vercel or Netlify
**Why:** Free, fast, easy updates

### For Production (Alcea)
**Option A - Simple:** Vercel with custom domain
```
https://risk-ranger.alcea.com
```

**Option B - Control:** Your existing Alcea web server
```
https://alcea.com/tools/risk-ranger/
```

---

## 🔧 Configuration After Deployment

### 1. Update side-by-side-embed.html

```javascript
const config = {
    neonearbyUrl: 'https://nicu-finder.alcea.com',        // NeonearBy
    riskRangerUrl: 'https://risk-ranger.alcea.com',       // Risk Ranger (deployed)
};
```

### 2. Custom Domain Setup

#### Vercel:
```bash
vercel domains add risk-ranger.alcea.com
```

Then add DNS record:
```
Type: CNAME
Name: risk-ranger
Value: cname.vercel-dns.com
```

#### Netlify:
1. Go to Site settings → Domain management
2. Add custom domain: `risk-ranger.alcea.com`
3. Add DNS record:
```
Type: CNAME
Name: risk-ranger
Value: your-site-name.netlify.app
```

---

## 📋 Pre-Deployment Checklist

- [ ] Build completes without errors
- [ ] Test locally (`npm run build && npm run preview`)
- [ ] Logo files are included (alcea-logo.png, carry-calc-logo.png)
- [ ] All assets load correctly
- [ ] Forms work (text input, file upload)
- [ ] Results display properly
- [ ] Mobile responsive
- [ ] HTTPS enabled (automatic with Vercel/Netlify)

---

## 🔄 How to Update After Deployment

### Vercel:
```bash
cd /Users/ruthellis/surrogacy-risk-assessment
npm run build
vercel --prod
```

### Netlify:
1. Drag new `dist/` folder to https://app.netlify.com/drop
2. Or use CLI: `netlify deploy --prod --dir=dist`

### GitHub Pages:
```bash
npm run build
npx gh-pages -d dist
```

### Your Server (FTP):
1. Build: `npm run build`
2. Upload new `dist/` contents via FTP

---

## 🧪 Testing Your Deployment

### 1. Check URL loads:
```
https://your-risk-ranger-url.com
```

### 2. Test key features:
- [ ] Enter text and click "Analyze"
- [ ] Upload a PDF file
- [ ] Check results display
- [ ] Try on mobile device
- [ ] Test all three clinic types show

### 3. Performance check:
- Use Google PageSpeed Insights
- Should load in <3 seconds
- Mobile score should be >80

---

## 🔒 Security Considerations

### HTTPS
- ✅ Vercel/Netlify: Automatic
- ❌ Your server: Need to configure (Let's Encrypt)

### CORS
If embedding on different domain:
```javascript
// Add to vite.config.js
server: {
  cors: {
    origin: ['https://alcea.com', 'https://yourdomain.com']
  }
}
```

### Environment Variables
For Claude API key (if using):
```bash
# Create .env file
VITE_CLAUDE_API_KEY=your_key_here
```

Never commit `.env` to git!

---

## 💰 Cost Comparison

| Option | Cost | Ease | Speed | Custom Domain |
|--------|------|------|-------|---------------|
| Vercel | FREE | ⭐⭐⭐⭐⭐ | Very Fast | ✅ |
| Netlify | FREE | ⭐⭐⭐⭐⭐ | Very Fast | ✅ |
| GitHub Pages | FREE | ⭐⭐⭐⭐ | Fast | ✅ |
| Your Server | $5-50/mo | ⭐⭐⭐ | Varies | ✅ |
| AWS S3 | $1-5/mo | ⭐⭐ | Very Fast | ✅ |

---

## 🎯 Quick Start (Absolute Easiest)

**Using Vercel (5 minutes):**

```bash
# 1. Install Vercel
npm install -g vercel

# 2. Deploy
cd /Users/ruthellis/surrogacy-risk-assessment
vercel --prod

# 3. Done! You'll get a URL like:
# https://risk-ranger-abc123.vercel.app
```

**Update the embed:**
```javascript
// In side-by-side-embed.html
const config = {
    riskRangerUrl: 'https://risk-ranger-abc123.vercel.app',
};
```

---

## 🐛 Troubleshooting

### Build fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### 404 errors after deploy
- Check `dist/index.html` exists
- Verify all paths are relative (not absolute)
- Check server is serving SPA correctly

### Assets don't load
- Verify `alcea-logo.png` is in `dist/`
- Check browser console for 404s
- Ensure paths use `/` not `./`

### Slow loading
- Enable gzip compression
- Use CDN (Vercel/Netlify do this automatically)
- Check bundle size warnings

---

## 📞 Need Help?

1. **Check build output:** Any warnings?
2. **Test locally first:** `npm run preview`
3. **Verify files:** Check `dist/` folder
4. **Read deployment logs:** Most services show detailed errors

---

## ✅ Success Criteria

Your Risk Ranger is properly deployed when:

- ✅ URL loads without errors
- ✅ Forms accept input
- ✅ Analysis completes
- ✅ Results display correctly
- ✅ Works on mobile
- ✅ HTTPS enabled
- ✅ Loads in <3 seconds

---

## 🎉 You're Done!

Once deployed, your side-by-side embed will work with both apps hosted online!

**Next Steps:**
1. Deploy Risk Ranger (choose option above)
2. Update `side-by-side-embed.html` with production URL
3. Deploy the embed page (same method)
4. Share the embed URL with users!

---

**Questions?** Check the troubleshooting section or re-run the build command.

**Made for Alcea Surrogacy**
**© RME 2025**
