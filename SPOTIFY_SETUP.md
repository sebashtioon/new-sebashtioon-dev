# Spotify Integration Setup Guide

## 🎵 How to Set Up Your Spotify "Now Playing" Widget

### Step 1: Create a Spotify App
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Click "Create App"
3. Fill in:
   - App name: "sebashtioon.dev Now Playing"
   - App description: "Shows currently playing track on my portfolio"
   - Redirect URI: `http://localhost:3000/callback` (for testing)
   - Which API/SDKs: Web API

### Step 2: Get Your Credentials
1. Copy your **Client ID** and **Client Secret** from the app dashboard
2. Add them to your `.env.local` file

### Step 3: Get Refresh Token (One-time setup)
1. Go to this URL (replace YOUR_CLIENT_ID):
```
https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://localhost:3000/callback&scope=user-read-currently-playing
```

2. Authorize the app and copy the `code` parameter from the redirect URL

3. Use this code to get your refresh token:
```bash
curl -H "Authorization: Basic BASE64_OF_CLIENT_ID:CLIENT_SECRET" \
  -d grant_type=authorization_code \
  -d code=YOUR_CODE \
  -d redirect_uri=http://localhost:3000/callback \
  https://accounts.spotify.com/api/token
```

4. Copy the `refresh_token` from the response to your `.env.local`

### Step 4: Update Environment Variables
Your `.env.local` should look like:
```
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_actual_client_id
NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET=your_actual_client_secret  
NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN=your_actual_refresh_token
```

### Step 5: Test It!
- Start playing music on Spotify
- Refresh your website
- You should see your current track in the floating widget! 🎉

## 🔥 Features
- Shows current track name, artist, and album art
- Real-time updates every 30 seconds
- Animated sound bars when playing
- Click to open track on Spotify
- Falls back to mock data if API fails

## 🛠️ Troubleshooting
- Make sure you're playing music on Spotify when testing
- Check browser console for any API errors
- Verify your environment variables are loaded correctly
- The widget shows "not listening" when no music is playing