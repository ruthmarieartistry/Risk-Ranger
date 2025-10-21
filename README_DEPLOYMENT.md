# 🚀 Deploy Risk Ranger in 3 Minutes

## ✨ Super Easy Method (Recommended)

### Netlify Drop - No account, no CLI, just drag & drop!

**Step 1:** Run the build script
```bash
cd /Users/ruthellis/surrogacy-risk-assessment
./deploy-netlify-drop.sh
```

**Step 2:** Drag the `dist` folder to the browser window that opens

**Step 3:** Copy your new URL (looks like `https://abc123.netlify.app`)

**Done!** 🎉

---

## 🔧 Alternative: Vercel

**One command:**
```bash
cd /Users/ruthellis/surrogacy-risk-assessment
./deploy-vercel.sh
```

Follow the prompts, get your URL.

---

## ❌ Troubleshooting

### Permission Error
If you see "permission denied":
```bash
chmod +x deploy-netlify-drop.sh
chmod +x deploy-vercel.sh
```

### Script Not Found
Make sure you're in the right folder:
```bash
cd /Users/ruthellis/surrogacy-risk-assessment
pwd  # Should show: /Users/ruthellis/surrogacy-risk-assessment
```

### Build Fails
Clear and rebuild:
```bash
rm -rf node_modules dist
npm install
npm run build
```

---

## 📝 After Deploying

Update `side-by-side-embed.html`:

```javascript
const config = {
    neonearbyUrl: 'https://nicu-finder.alcea.com',
    riskRangerUrl: 'https://YOUR-NEW-URL-HERE.netlify.app',  // ← Paste here
};
```

---

## 🎯 Quick Commands

| Action | Command |
|--------|---------|
| **Deploy (Easiest)** | `./deploy-netlify-drop.sh` |
| **Deploy (Vercel)** | `./deploy-vercel.sh` |
| **Build Only** | `npm run build` |
| **Test Locally** | `npm run preview` |
| **Update Live Site** | Re-run deploy script |

---

## ✅ You're Ready!

Pick one method above and your Risk Ranger will be live in minutes!

**Need help?** See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.
