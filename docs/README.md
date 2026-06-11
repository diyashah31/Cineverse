# VibeStream 🎬✨

A hyper-aesthetic GenZ movie & series recommendation engine with pure black-and-white hand-drawn doodle aesthetic.

## ✨ Features

- **4-Step Quiz Flow**: Genre → Mood → Platforms → Time Period
- **Hand-Drawn Doodle UI**: Sketch-inspired, imperfect aesthetic (no gradients, no shadows, no greys)
- **Animated Progress**: Real-time drawing animations and wobble effects
- **Smart Recommendations**: Uses Watchmode API for accurate movie/series data
- **Detail Modals**: Full information with IMDb links and platform availability
- **Mobile-First**: Fully responsive design
- **Accessible**: Keyboard navigable with focus states
- **Dark Mode Ready**: Pure black (#000000) background, white (#ffffff) UI

## 🚀 Tech Stack

- **Next.js 15** with TypeScript
- **Tailwind CSS** (customized for doodle aesthetic)
- **Framer Motion** (animations & transitions)
- **lucide-react** (icons)
- **Server Actions** (secure API calls)
- **Watchmode API** (movie & series data)

## 🎨 Design Philosophy

✅ **Pure Aesthetics**
- Only black & white (no greys, gradients, shadows, or glow)
- Imperfection = aesthetic (sketchy, hand-drawn feel)
- Raw, minimal, bold typography
- Handwritten font accents (Patrick Hand)

✅ **Animations**
- Sketch drawing effects (stroke animations)
- Wobble on hover (like ink vibrating)
- Ink splash on click
- Scribble fills for selections
- Page flip transitions

✅ **Accessibility**
- Full keyboard navigation
- ARIA labels
- High contrast (black & white only)
- Focus indicators
- Screen reader friendly

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Watchmode API key (free at https://api.watchmode.com/)

### Steps

1. **Clone/Extract the project**
   ```bash
   cd vibestream
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` and add your Watchmode API key:
   ```
   WATCHMODE_API_KEY=your_api_key_here
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🔧 Configuration

### Watchmode API Key
1. Go to https://api.watchmode.com/
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add to `.env.local`

### Customization

**Colors**: Edit `tailwind.config.ts`
```typescript
colors: {
  "doodle-black": "#000000",
  "doodle-white": "#ffffff",
}
```

**Fonts**: Edit `app/layout.tsx`
```typescript
link href="https://fonts.googleapis.com/css2?family=Inter&family=Patrick+Hand"
```

**Animations**: Custom keyframes in `tailwind.config.ts`

## 📁 Project Structure

```
vibestream/
├── app/
│   ├── layout.tsx           # Root layout with metadata
│   ├── globals.css          # Global styles & animations
│   └── page.tsx             # Home page (Quiz → Results flow)
├── components/
│   ├── Quiz.tsx             # Main quiz orchestrator
│   ├── ProgressStepper.tsx  # Hand-drawn progress stepper
│   ├── LoadingScreen.tsx    # Animated loading state
│   ├── ResultsCard.tsx      # Individual recommendation card
│   ├── Results.tsx          # Results grid
│   ├── DetailModal.tsx      # Full detail modal
│   ├── DoodleIcons.tsx      # SVG doodle icons
│   └── steps/
│       ├── GenreStep.tsx    # Genre selection
│       ├── MoodStep.tsx     # Mood selection
│       ├── PlatformsStep.tsx# Platform selection
│       └── TimeStep.tsx     # Year range slider
├── lib/
│   ├── types.ts             # TypeScript interfaces
│   ├── api.ts               # Watchmode API calls (Server Actions)
│   └── utils.ts             # Utility functions
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
└── next.config.ts
```

## 🎯 User Flow

1. **Quiz Step 1 - Genre**: Select from 6 genres with custom doodle icons
2. **Quiz Step 2 - Mood**: Pick your current mood (energetic, romantic, scary, etc.)
3. **Quiz Step 3 - Platforms**: Choose where you watch (Netflix, Hulu, etc.)
4. **Quiz Step 4 - Time**: Set year range with hand-drawn slider
5. **Results**: Browse 20-30 curated recommendations
6. **Detail Modal**: Click any card for full details, IMDb link, watch platforms

## 🔌 API Integration

### Watchmode Endpoints Used

- `/genres/` - Get available genres
- `/sources/` - Get streaming platforms
- `/list-titles/` - Get filtered movie/series list

### Caching
- Server Actions cache responses for 1 hour (3600s)
- Automatic revalidation for fresh data

### Filtering
- By genre ID
- By platform/source ID
- By release year range
- Sorted by popularity

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to vercel.com
   - Import your GitHub repo
   - Add `WATCHMODE_API_KEY` to environment variables
   - Deploy!

### Other Platforms

```bash
npm run build
npm run start
```

Then deploy the `.next` build output.

## 🎨 Customizing the Aesthetic

### Add More Doodle Icons
Edit `components/DoodleIcons.tsx`:
```tsx
export function YourIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" className="fill-none stroke-current stroke-2">
      {/* SVG path here */}
    </svg>
  );
}
```

### Change Animations
Edit `tailwind.config.ts` keyframes:
```typescript
keyframes: {
  yourAnimation: {
    "0%": { /* ... */ },
    "100%": { /* ... */ },
  },
}
```

### Modify Colors Only
Pure black (#000000) and white (#ffffff) are hardcoded to maintain aesthetic.

## 🐛 Troubleshooting

### API Key Not Working
- Verify key is in `.env.local` (not `.env`)
- Restart dev server after updating `.env.local`
- Check Watchmode dashboard for API limits

### Rankings/Results Empty
- Watchmode may have data gaps for specific filters
- Try broader genre/platform selections
- Check year range isn't too narrow

### Animations Choppy
- Ensure browser hardware acceleration is enabled
- Check browser compatibility (Chrome, Firefox, Safari latest)
- Reduce particle effects in production builds

### Fonts Not Loading
- Check internet connection (Google Fonts requires CDN)
- Verify font URLs in `app/layout.tsx`
- Fall back fonts work even if CDN fails

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## 🔐 Security

- API calls via Server Actions (key never exposed to client)
- No authentication required for public API
- CORS-safe implementation
- Rate limiting handled by Watchmode free tier

## 📄 License

MIT - Feel free to use and modify

## 🙏 Credits

- **Watchmode API** - Movie/series data
- **Framer Motion** - Animations
- **Next.js** - Framework
- **Tailwind CSS** - Styling

## 🎯 Future Ideas

- [ ] Save favorite recommendations
- [ ] Share results
- [ ] Dark mode toggle (already dark)
- [ ] More doodle animations
- [ ] Advanced filter options
- [ ] User ratings/reviews
- [ ] Watchlist integration

## 📧 Support

Have questions? Issues?
- Check Watchmode docs: https://api.watchmode.com/docs/
- Next.js docs: https://nextjs.org/docs
- Framer Motion: https://www.framer.com/motion/
- Tailwind: https://tailwindcss.com/docs

---

**Made with ❤️ and ✏️ for GenZ movie lovers**
