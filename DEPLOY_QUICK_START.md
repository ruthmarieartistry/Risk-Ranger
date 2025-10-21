# Deploy Risk Ranger - Quick Start

## ⚡ Fastest Way (5 Minutes)

### Option 1: Netlify Drop (Easiest - No CLI!)

```bash
cd /Users/ruthellis/surrogacy-risk-assessment
./deploy-netlify-drop.sh
```

What happens:
1. ✅ Builds your app
2. ✅ Opens Netlify Drop in browser
3. ✅ You drag the `dist` folder
4. ✅ Get instant live URL

**No account setup, no CLI install, just drag & drop!**

---

### Option 2: Vercel (One Command)

```bash
cd /Users/ruthellis/surrogacy-risk-assessment
./deploy-vercel.sh
```

What happens:
1. ✅ Builds your app
2. ✅ Deploys using `npx` (no install needed)
3. ✅ Gives you a live URL

**First time:** You'll login to Vercel (free account)

---

### Option 3: Manual Deploy

**Netlify (Simplest):**
```bash
npm run build
# Then go to https://app.netlify.com/drop
# Drag the dist/ folder
```

**Vercel:**
```bash
npm run build
npx vercel --prod
```

---

## 📝 After Deploying

### Update Your Embed File

```javascript
// In side-by-side-embed.html, update this:
const config = {
    neonearbyUrl: 'http://localhost:3000',
    riskRangerUrl: 'YOUR_NEW_URL_HERE',  // ← Paste your deployment URL
};
```

### Example:
```javascript
const config = {
    neonearbyUrl: 'https://nicu-finder.alcea.com',
    riskRangerUrl: 'https://risk-ranger-abc123.vercel.app',
};
```

---

## 🎯 What You Get

**After deployment, you'll receive a URL like:**
- Vercel: `https://risk-ranger-abc123.vercel.app`
- Netlify: `https://random-name-123456.netlify.app`

**This URL is:**
- ✅ Live on the internet
- ✅ HTTPS enabled (secure)
- ✅ Accessible from anywhere
- ✅ Fast (global CDN)
- ✅ Free (on free tier)

---

## 🔄 How to Update Later

### Vercel:
```bash
npm run build
vercel --prod
```

### Netlify:
```bash
npm run build
# Then drag new dist/ folder to netlify.com/drop
```

---

## ❓ Troubleshooting

**Command not found: vercel**
```bash
npm install -g vercel
```

**Build failed**
```bash
rm -rf node_modules dist
npm install
npm run build
```

**Permission denied: ./deploy-vercel.sh**
```bash
chmod +x deploy-vercel.sh
```

---

## 📚 Full Documentation

For detailed deployment options and advanced configuration, see:
- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Complete deployment guide
- **[EMBEDDING_GUIDE.md](EMBEDDING_GUIDE.md)** - Side-by-side embed guide

---

## ✅ Deployment Checklist

After deploying, verify:

- [ ] URL loads without errors
- [ ] Can enter text and click "Analyze"
- [ ] Results display correctly
- [ ] File upload works
- [ ] Works on mobile
- [ ] Logos appear correctly
- [ ] HTTPS lock icon in browser

---

**You're ready to deploy! Run `./deploy-vercel.sh` to get started!** 🚀
