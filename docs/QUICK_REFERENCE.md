# VibeStream - Quick Reference Guide 📋

## 🚀 Essential Commands

```bash
# Install dependencies (DO THIS FIRST!)
npm install

# Start development server (port 3000)
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Check for errors
npm run type-check
```

## 📁 Important Files & Locations

### Configuration
- `.env.local` ← **Put your API key here!**
- `tailwind.config.ts` ← Change colors/animations
- `next.config.ts` ← Next.js settings
- `package.json` ← Dependencies

### Application Code
- `app/page.tsx` ← Main app logic
- `app/layout.tsx` ← Root layout + fonts
- `app/globals.css` ← All styles in one place

### Components
- `components/Quiz.tsx` ← Quiz orchestration
- `components/Results.tsx` ← Results display
- `components/steps/` ← 4 quiz steps
- `components/DetailModal.tsx` ← Movie details

### API & Utils
- `lib/api.ts` ← Watchmode API calls
- `lib/types.ts` ← TypeScript types
- `lib/utils.ts` ← Helper functions

## 🔑 API Key Setup

```bash
# 1. Get key from https://api.watchmode.com/
# 2. Create .env.local (if not exists)
cp .env.example .env.local

# 3. Edit .env.local with your key:
WATCHMODE_API_KEY=your_api_key_here

# 4. Restart dev server (Ctrl+C, then npm run dev)
```

## 🎨 Common Customizations

### Change Background Color
Edit `tailwind.config.ts`:
```typescript
colors: {
  "doodle-black": "#000000", // ← Change here
}
```

### Change Text Color
Edit `tailwind.config.ts`:
```typescript
colors: {
  "doodle-white": "#ffffff", // ← Change here
}
```

### Change Fonts
Edit `app/layout.tsx`:
```typescript
link href="https://fonts.googleapis.com/css2?family=Inter&family=Patrick+Hand"
// ↑ Change family names here
```

### Add New Animation
Edit `tailwind.config.ts`:
```typescript
keyframes: {
  myAnimation: {
    "0%": { opacity: "0" },
    "100%": { opacity: "1" },
  }
}
```

### Add New Genre/Mood
1. Edit `components/steps/GenreStep.tsx` or `MoodStep.tsx`
2. Add to GENRES/MOODS array
3. Create icon in `components/DoodleIcons.tsx`
4. Add mapping in `lib/api.ts` if needed

## 🌐 Deployment Checklist

### Before Deploying
- [ ] Code works locally (`npm run dev`)
- [ ] No console errors
- [ ] Quiz completes
- [ ] Results display
- [ ] Mobile responsive
- [ ] API key works

### Deploy to Vercel
```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git push origin main

# Then:
# 1. Go to vercel.com
# 2. Connect your GitHub repo
# 3. Add WATCHMODE_API_KEY environment variable
# 4. Deploy!
```

### Deploy to Other Platforms
```bash
# Build
npm run build

# The .next folder contains everything needed
# Deploy this to your hosting provider
```

## 📊 File Tree (Quick Reference)

```
vibestream/
├── app/
│   ├── layout.tsx (root + metadata)
│   ├── globals.css (all styles)
│   └── page.tsx (main app)
├── components/
│   ├── Quiz.tsx
│   ├── ProgressStepper.tsx
│   ├── LoadingScreen.tsx
│   ├── Results.tsx
│   ├── ResultsCard.tsx
│   ├── DetailModal.tsx
│   ├── DoodleIcons.tsx
│   └── steps/
│       ├── GenreStep.tsx
│       ├── MoodStep.tsx
│       ├── PlatformsStep.tsx
│       └── TimeStep.tsx
├── lib/
│   ├── api.ts
│   ├── types.ts
│   └── utils.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── postcss.config.js
├── .env.local (← Put API key here)
├── .env.example
├── .gitignore
├── vercel.json
└── README.md
```

## 🔍 Finding Things

**Looking for...?**  
- Quiz logic → `components/Quiz.tsx`
- Styles → `app/globals.css` or `tailwind.config.ts`
- API calls → `lib/api.ts`
- Types → `lib/types.ts`
- Main app → `app/page.tsx`
- Animations → `app/globals.css` (keyframes)
- Fonts → `app/layout.tsx`
- Components → `components/` folder

## 📚 Documentation Files

- `README.md` - Full docs
- `SETUP.md` - 5-min setup
- `PROJECT_SUMMARY.md` - Overview
- `CHECKLIST.md` - Features & deployment
- `ARCHITECTURE.md` - App structure diagrams
- `API_KEY_GUIDE.md` - Get API key
- `QUICK_REFERENCE.md` - This file!

## ✅ Troubleshooting Quick Links

**Issue: API key not working**  
→ See `API_KEY_GUIDE.md`

**Issue: Can't install dependencies**  
→ Make sure you have Node.js 18+

**Issue: No results showing**  
→ Check API key in `.env.local`

**Issue: App won't start**  
→ Run `npm install` first

**Issue: Styles look wrong**  
→ Check `app/globals.css` and `tailwind.config.ts`

**Issue: Animations choppy**  
→ Check browser is up-to-date

## 🎯 Success Indicators

✅ All working if:
- `npm run dev` starts without errors
- App loads on `http://localhost:3000`
- Quiz starts and steps are clickable
- Results display after quiz
- No red errors in console
- Mobile view is responsive

❌ Something wrong if:
- Build fails (`npm run build`)
- Port 3000 already in use
- API returns 401/unauthorized
- Blank screen on load
- Error messages in console

## 🚨 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| `.env.local` not found | Run `cp .env.example .env.local` |
| API key not working | Check it's in `.env.local` not `.env` |
| Port 3000 in use | Kill process: `lsof -ti:3000 \| xargs kill` |
| Dependencies broken | Delete `node_modules`, run `npm install` |
| Styles look plain | Check `app/globals.css` loaded |
| No results | Try broader genre/platform filters |
| Animations missing | Check browser hardware acceleration |

## 📞 Get Help

1. **API Issues** → `API_KEY_GUIDE.md`
2. **Setup Issues** → `SETUP.md`
3. **Understanding** → `PROJECT_SUMMARY.md`
4. **Details** → `README.md`
5. **Architecture** → `ARCHITECTURE.md`
6. **Deployment** → `CHECKLIST.md`

## 🎓 Learning Path

1. Read `PROJECT_SUMMARY.md` (understand what you have)
2. Read `SETUP.md` (get it running)
3. Read `API_KEY_GUIDE.md` (add API key)
4. Run `npm run dev` (start development)
5. Explore `app/page.tsx` (understand flow)
6. Explore `components/` (understand structure)
7. Read `ARCHITECTURE.md` (understand connections)
8. Customize! (change colors, add features)
9. Deploy! (push to Vercel)

## 💡 Pro Tips

- Use `npm run type-check` before deploying
- Check console for errors (F12)
- Test on mobile before deploying
- Backup `.env.local` (don't commit it!)
- Keep API key private
- Restart dev server after changing `.env.local`

---

**Stuck? Read the appropriate doc file above!**

**Ready to build? Run: `npm install && npm run dev`**
