# Backend Configuration Guide

## Current Setup

Your app is configured to fetch data from the backend with automatic fallback to local data.

## How It Works

1. **Backend First**: App tries to fetch from `https://portifolio-backend-ptck.onrender.com`
2. **10 Second Timeout**: If backend doesn't respond in 10 seconds, automatically switches to local API
3. **Local Fallback**: Uses static data from `/app/data/` files
4. **Status Toast**: Shows connection status in top-right corner

## Quick Fixes

### Option 1: Use Local Data Only (Fastest)

Edit `.env.local`:
```bash
NEXT_PUBLIC_BACKEND_API_URL=/api
```

Then restart dev server:
```bash
npm run dev
```

### Option 2: Wait for Backend (First Load is Slow)

The backend on Render.com goes to sleep after inactivity. First request takes 30-60 seconds to wake up.

**Just wait** - the app will automatically fallback to local data after 10 seconds.

### Option 3: Check Backend Status

Open in browser: https://portifolio-backend-ptck.onrender.com/health

If you see `{"status":"ok",...}` - backend is awake and working.

## Current Behavior

- ✅ App loads immediately with local data
- ✅ Shows "Connecting to backend..." toast
- ✅ After 10s timeout, shows "Using local data"
- ✅ All features work with local data
- ✅ No errors or blank screens

## Recommendation

For development, use local API:
```bash
# .env.local
NEXT_PUBLIC_BACKEND_API_URL=/api
```

For production, use backend URL (it stays awake with traffic):
```bash
# .env.production
NEXT_PUBLIC_BACKEND_API_URL=https://portifolio-backend-ptck.onrender.com
```

## Testing Backend

```bash
# Test if backend is awake
curl https://portifolio-backend-ptck.onrender.com/health

# Test projects endpoint
curl https://portifolio-backend-ptck.onrender.com/api/projects
```

## Troubleshooting

**Problem**: App shows "Using local data" immediately

**Solution**: Backend is sleeping. Either:
1. Wait 30-60 seconds and refresh
2. Use local API (faster for development)

**Problem**: Data not updating

**Solution**: 
1. Check if using local or backend API
2. Clear browser cache
3. Restart dev server

## Files Modified

- `app/lib/api-client.ts` - Added timeout and fallback logic
- `app/components/BackendStatusToast.tsx` - Shows connection status
- `.env.local` - Backend URL configuration
- `app/api/*` - Local API routes with static data
