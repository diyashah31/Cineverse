# VibeStream - Quick Start Guide ⚡

## 5-Minute Setup

### 1. Get Watchmode API Key
1. Visit https://api.watchmode.com/
2. Sign up (free)
3. Copy your API key

### 2. Setup Project
```bash
# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Edit .env.local and add your API key
# WATCHMODE_API_KEY=your_key_here
```

### 3. Run It
```bash
npm run dev
```

Visit `http://localhost:3000` 🎉

---

## What's Included

✅ Complete Next.js 15 app  
✅ TypeScript setup  
✅ Tailwind CSS with custom doodle styles  
✅ Framer Motion animations  
✅ Watchmode API integration  
✅ 4-step quiz flow  
✅ Results grid with detail modal  
✅ Mobile-responsive design  
✅ Deployment ready (Vercel)  

---

## File Structure at a Glance

```
/app
  ├── layout.tsx (Root + metadata)
  ├── globals.css (All styles)
  └── page.tsx (Quiz/Results orchestrator)

/components
  ├── Quiz.tsx (Main quiz logic)
  ├── ProgressStepper.tsx (Progress visualization)
  ├── *.tsx (Other components)
  └── /steps
      ├── GenreStep.tsx
      ├── MoodStep.tsx
      ├── PlatformsStep.tsx
      └── TimeStep.tsx

/lib
  ├── api.ts (Server Actions + Watchmode calls)
  ├── types.ts (TypeScript interfaces)
  └── utils.ts (Helper functions)
```

---

## Key Features Explained

### 🎨 Pure Black & White
- No gradients, shadows, or greys
- Only `#000000` (black) and `#ffffff` (white)
- Sketch/doodle aesthetic throughout

### ✏️ Hand-Drawn Animations
- Stroke drawing effects
- Wobble on hover
- Ink splash on click
- Scribble fill selection
- Page flip transitions

### 🎯 4-Step Quiz
1. **Genre** - Action, Romance, Horror, Sci-Fi, Comedy, Drama
2. **Mood** - Energetic, Romantic, Scary, Intellectual, Relaxed, Mind-blown
3. **Platforms** - Netflix, Hulu, Prime Video, Disney+, HBO, Apple TV
4. **Time Period** - Year range slider

### 📺 Movie Recommendations
- Up to 30 results per search
- Filtering by genre, platform, year
- Detail modal with IMDb links
- Platform availability info

### 📱 Mobile First
- Responsive grid layout
- Touch-friendly buttons
- Readable on all screen sizes

---

## Customization

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  "doodle-black": "#000000", // Change here
  "doodle-white": "#ffffff", // Or here
}
```

### Add More Genres/Moods
1. Add to arrays in `components/steps/GenreStep.tsx` or `MoodStep.tsx`
2. Create matching SVG icon in `DoodleIcons.tsx`
3. Add mapping in `lib/api.ts` if needed

### Modify Animations
Edit `tailwind.config.ts` keyframes or `app/globals.css`

### Change Fonts
Edit `app/layout.tsx` Google Fonts link

---

## Deployment (Vercel)

```bash
# Push to GitHub
git init && git add . && git commit -m "Initial"
git push origin main

# In Vercel dashboard:
# 1. Import repo
# 2. Add WATCHMODE_API_KEY env var
# 3. Deploy!
```

---

## Troubleshooting

**API not working?**
- Verify key in `.env.local`
- Restart dev server
- Check Watchmode dashboard

**No results?**
- Watchmode data gaps for some filters
- Try broader selections
- Check year range

**Animations choppy?**
- Enable hardware acceleration
- Use latest browser version
- Check network speed

---

## Next Steps

- [ ] Get Watchmode API key
- [ ] Install dependencies `npm install`
- [ ] Create `.env.local` with API key
- [ ] Run `npm run dev`
- [ ] Test the quiz
- [ ] Customize colors/fonts if desired
- [ ] Deploy to Vercel

---

## Need Help?

- Watchmode Docs: https://api.watchmode.com/docs/
- Next.js Docs: https://nextjs.org/docs
- Framer Motion: https://www.framer.com/motion/

**Happy vibe streaming! 🎬✨**
