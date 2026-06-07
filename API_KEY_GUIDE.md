# Getting Your Watchmode API Key 🔑

This is a critical step to make VibeStream work! Follow this guide.

## Step-by-Step

### 1. Visit Watchmode Website
Go to: https://api.watchmode.com/

You'll see a page with "API Docs" and a signup button.

### 2. Create an Account

Click **"Sign Up"** in the top right corner.

You'll need to provide:
- Email address
- Password
- Agree to terms

No credit card required! 🎉

### 3. Verify Your Email

Check your email inbox for a verification link from Watchmode.

Click the link to verify your account.

### 4. Get Your API Key

After logging in, go to your **Dashboard** or **API Settings**.

You should see your **API Key** displayed.

It looks like: `YOUR_LONG_API_KEY_HERE`

**Copy this key to clipboard!** (There should be a copy button)

### 5. Add to Your Project

In your VibeStream project:

1. Find the file `.env.local` (created from `.env.example`)
2. Open it in a text editor
3. Find this line:
   ```
   WATCHMODE_API_KEY=your_api_key_here
   ```
4. Replace `your_api_key_here` with your actual API key:
   ```
   WATCHMODE_API_KEY=abc123def456ghi789jkl...
   ```
5. **Save the file** (Ctrl+S or Cmd+S)

6. **Restart your dev server** if it was running:
   - Stop it (Ctrl+C in terminal)
   - Run `npm run dev` again

### 6. Test It Works

When you start the app:
1. Go to `http://localhost:3000`
2. Click through the quiz
3. Complete all 4 steps
4. You should see movie/series recommendations!

If you see recommendations, **it works! 🎉**

---

## Troubleshooting

### API Key Not Found
**Issue**: You see an error about a missing API key

**Solution**:
1. Make sure `.env.local` file exists in your root directory
2. Check the filename is exactly `.env.local` (not `.env` or `.env.local.txt`)
3. Verify the key is spelled correctly (no extra spaces)
4. Restart the dev server

### API Responds Error 401
**Issue**: "Unauthorized" or "API key invalid"

**Solution**:
1. Double-check your API key is from Watchmode
2. Make sure you didn't add extra characters
3. Try generating a new key in Watchmode dashboard
4. Wait a few seconds and try again

### Still No Results
**Issue**: Quiz completes but no movies show up

**Solution**:
1. Try different filter combinations
2. Pick broader genre/platform filters
3. Use wider year range
4. Check Watchmode dashboard - API might be rate limited
5. Wait a few minutes and try again

### Rate Limit Exceeded
**Issue**: After many searches, API stops working

**Note**: Watchmode free tier has limits (~100-500 requests/day)

**Solution**:
1. Wait a few hours
2. Consider upgrading to paid plan for production use
3. Implement query caching (already done in code!)

---

## API Key Best Practices

✅ **Do**:
- Keep your API key private
- Don't share `.env.local` publicly
- Don't commit `.env.local` to GitHub
- Use environment variables for production
- Regenerate key if you think it leaked

❌ **Don't**:
- Put API key in version control
- Share `.env.local` file
- Post key on forums/social media
- Expose key on the client side (we use Server Actions to prevent this)

---

## Watchmode Pricing

**Free Tier** ✅ Great for learning/hobby use:
- Limited requests per day (100-1000)
- Access to all endpoints
- Full data available
- Perfect for VibeStream!

**Paid Plans**: If you want unlimited requests:
- Starter plans available
- Check https://api.watchmode.com/pricing

---

## Still Stuck?

1. Check Watchmode docs: https://api.watchmode.com/docs/
2. Verify your email in Watchmode dashboard
3. Try logging out and back in
4. Generate a new API key
5. Check project `.env.local` is in root directory

**You've got this! Once the key works, VibeStream is ready to go.** 🚀

---

## What Each Watchmode Endpoint Does

Once you have your key, here's what VibeStream uses:

### `/genres/`
Gets list of available genres (Action, Comedy, Horror, etc.)

### `/sources/`
Gets list of streaming platforms (Netflix, Hulu, Prime Video, etc.)

### `/list-titles/`
Searches for movies/series based on:
- Genre IDs
- Platform/Source IDs
- Year range
- Returns: 20-30 results sorted by popularity

All requests include your API key automatically (via Server Actions).

---

## Environment Variable Setup Complete ✅

Once you've added your API key to `.env.local`:

```
✅ API key secured (in .env.local, not exposed to client)
✅ Server Actions will handle API calls
✅ Data will be fetched securely on the server
✅ Results will be passed to the client
✅ No security issues!
```

**Now you can run `npm run dev` and visit `http://localhost:3000`!**

---

**Questions? See README.md or SETUP.md for more info!**
