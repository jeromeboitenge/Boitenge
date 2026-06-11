# Quick Setup: Offline Mode

## Step 1: Import Unified API Client

Replace all existing `apiClient` imports in your components with `unifiedApiClient`:

### Before:
```typescript
import { apiClient } from '@/lib/api-client';
```

### After:
```typescript
import { unifiedApiClient } from '@/lib/unified-api-client';
```

## Step 2: Use the Same API

The `unifiedApiClient` has the exact same interface as `apiClient`, so no code changes needed:

```typescript
// All these work the same
const projects = await unifiedApiClient.getProjects();
const skills = await unifiedApiClient.getSkills();
const experience = await unifiedApiClient.getExperience();
const certificates = await unifiedApiClient.getCertificates();

// CRUD operations
await unifiedApiClient.createProject(projectData);
await unifiedApiClient.updateSkill(id, skillData);
await unifiedApiClient.deleteExperience(id);
```

## Step 3: Add Status Indicator (Optional)

Add the backend status indicator to show users which mode is active:

### In `app/layout.tsx`:
```typescript
import { BackendStatus } from '@/components/BackendStatus';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <BackendStatus />
        <Toaster />
      </body>
    </html>
  );
}
```

## Step 4: Test It!

### Test Offline Mode:

1. **Method 1: DevTools**
   - Open DevTools (F12)
   - Network tab → Set throttling to "Offline"
   - Refresh the page
   - ✅ App should still work with local data

2. **Method 2: Invalid Backend URL**
   - Edit `.env.local`:
   ```bash
   NEXT_PUBLIC_BACKEND_API_URL=http://invalid-url.com
   ```
   - Restart dev server
   - ✅ App should use local storage

3. **Method 3: Console**
   - Open browser console
   - Type: `await unifiedApiClient.forceLocalMode()`
   - Refresh the page
   - ✅ Status indicator should show "Local"

## That's It!

Your app now:
- ✅ Automatically uses local storage when backend is down
- ✅ Syncs with backend when available
- ✅ Persists data across sessions
- ✅ Shows status indicator
- ✅ No user intervention needed

## Seed Data Included

The app comes with pre-populated data:
- 5 Projects
- 8 Skills
- 3 Work Experiences
- 4 Certificates

All data can be modified through the admin dashboard and changes persist locally.

## Need Help?

See `OFFLINE_MODE.md` for detailed documentation.
