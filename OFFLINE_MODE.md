# Offline Mode & Backend Fallback System

## Overview

The portfolio application now includes a comprehensive offline fallback system that automatically uses local storage when the backend is unavailable. This ensures the application continues to work seamlessly even when the backend server is down or unreachable.

## How It Works

### 1. **Automatic Detection**
The system automatically detects when the backend is unavailable:
- Network timeouts (10 seconds for main API, 3 seconds for health checks)
- Connection errors
- Server errors (500, 503, etc.)

### 2. **Seamless Fallback**
When the backend is unavailable, the app automatically:
- Switches to local storage mode
- Uses seed data if no local data exists
- Continues all CRUD operations locally
- Shows status indicator to inform users

### 3. **Data Persistence**
- All changes are saved to browser's localStorage
- Data persists across browser sessions
- Automatic sync when backend becomes available again

## Architecture

```
┌─────────────────────────────────────────────────────┐
│         Application Components                       │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│     Unified API Client (Auto Fallback)              │
│  - Try backend first                                 │
│  - Fallback to local storage on failure             │
│  - Cache backend data locally                        │
└─────────┬───────────────────┬───────────────────────┘
          │                   │
          ▼                   ▼
┌──────────────────┐  ┌──────────────────┐
│  Backend API     │  │  Local Storage   │
│  Client          │  │  Client          │
│                  │  │                  │
│  - REST API      │  │  - localStorage  │
│  - Network calls │  │  - Seed data     │
└──────────────────┘  └──────────────────┘
```

## Files Created

### Core System Files

1. **`app/data/seedData.ts`**
   - Comprehensive seed data for all content types
   - Projects, Skills, Experience, Certificates
   - localStorage helper utilities
   - Data transformation functions

2. **`app/lib/local-api-client.ts`**
   - Full CRUD operations using localStorage
   - Mirrors backend API structure
   - Automatic ID generation
   - Data validation

3. **`app/lib/unified-api-client.ts`**
   - Automatic backend/local fallback logic
   - Health check system
   - Sync capabilities
   - Status tracking

4. **`app/components/BackendStatus.tsx`**
   - Visual status indicator
   - Shows current data source (Backend/Local)
   - Hover for detailed information
   - Auto-updates every 30 seconds

## Usage

### Using the Unified API Client

Replace your current `apiClient` imports with `unifiedApiClient`:

```typescript
// Before
import { apiClient } from '@/lib/api-client';

// After
import { unifiedApiClient } from '@/lib/unified-api-client';

// Usage (exactly the same API)
const projects = await unifiedApiClient.getProjects();
const newProject = await unifiedApiClient.createProject(projectData);
```

### Adding Backend Status Indicator

Add the status component to your layout:

```typescript
import { BackendStatus } from '@/components/BackendStatus';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <BackendStatus />
      </body>
    </html>
  );
}
```

### Manual Control

Force local mode:
```typescript
await unifiedApiClient.forceLocalMode();
```

Reset and recheck backend:
```typescript
await unifiedApiClient.resetBackendCheck();
```

Check current status:
```typescript
const isOnline = unifiedApiClient.getBackendStatus();
// Returns: true (backend), false (local), or null (unknown)
```

## Seed Data

The system comes with pre-populated seed data:

- **5 Projects**: HitamoSpace, Hotel Platform, ExploreHub, AI Task Manager, Voting System
- **8 Skills**: React, TypeScript, Next.js, Node.js, PostgreSQL, MongoDB, Docker, Git
- **3 Experiences**: Senior Developer, Full-Stack Developer, Junior Developer
- **4 Certificates**: AWS, Scrum, React, MongoDB certifications

### Customizing Seed Data

Edit `app/data/seedData.ts` to add your own data:

```typescript
export const seedProjects: Project[] = [
  {
    id: 'seed-proj-1',
    title: "Your Project",
    description: "Your description",
    technologies: ["React", "Node.js"],
    // ... other fields
  },
  // Add more projects
];
```

## Local Storage Keys

The system uses these localStorage keys:

- `portfolio_projects` - Project data
- `portfolio_skills` - Skill data
- `portfolio_experience` - Experience data
- `portfolio_certificates` - Certificate data
- `portfolio_last_sync` - Last sync timestamp
- `portfolio_use_local` - Local mode preference

## Features

### ✅ Automatic Fallback
- Seamless switch to local storage on backend failure
- No user intervention required
- Graceful error handling

### ✅ Data Persistence
- All CRUD operations work offline
- Data saved to localStorage
- Survives page refreshes and browser restarts

### ✅ Visual Feedback
- Status indicator shows current mode
- Hover for detailed information
- Color-coded: Green (backend) / Orange (local)

### ✅ Sync Ready
- Backend data cached locally
- Ready for future sync implementation
- Tracks last sync time

### ✅ Development Friendly
- Console logs for debugging
- Easy to test offline mode
- Reset and clear utilities

## Testing Offline Mode

### Method 1: Block Backend URL

Add to your `.env.local`:
```bash
NEXT_PUBLIC_BACKEND_API_URL=http://invalid-backend-url.com
```

### Method 2: Browser DevTools

1. Open DevTools (F12)
2. Go to Network tab
3. Select "Offline" from throttling dropdown
4. Refresh the page

### Method 3: Force Local Mode

In your code or browser console:
```typescript
import { unifiedApiClient } from '@/lib/unified-api-client';
await unifiedApiClient.forceLocalMode();
```

## Debugging

### Check Current Mode

Open browser console:
```javascript
console.log('Backend Status:', unifiedApiClient.getBackendStatus());
console.log('Local Data:', {
  projects: localStorage.getItem('portfolio_projects'),
  skills: localStorage.getItem('portfolio_skills'),
  experience: localStorage.getItem('portfolio_experience'),
  certificates: localStorage.getItem('portfolio_certificates')
});
```

### Clear Local Data

```javascript
localStorage.clear();
// Or specific keys
localStorage.removeItem('portfolio_projects');
```

### Reset to Seed Data

```javascript
import { localApiClient } from '@/lib/local-api-client';
localApiClient.resetToSeedData();
```

## Future Enhancements

Potential additions to the offline system:

1. **Conflict Resolution**
   - Detect conflicts between local and backend data
   - Merge strategies (last-write-wins, manual resolution)

2. **Background Sync**
   - Automatically sync when backend becomes available
   - Queue local changes for upload
   - Show sync progress

3. **IndexedDB Migration**
   - Move from localStorage to IndexedDB
   - Support larger datasets
   - Better performance

4. **Offline Detection**
   - Listen to browser offline/online events
   - Automatic mode switching
   - User notifications

5. **Sync History**
   - Track sync operations
   - Show last sync time
   - Sync logs and conflicts

## Browser Compatibility

The offline system uses:
- ✅ localStorage (all modern browsers)
- ✅ Fetch API (all modern browsers)
- ✅ Promises/Async-Await (all modern browsers)

Minimum supported versions:
- Chrome 50+
- Firefox 50+
- Safari 10+
- Edge 79+

## Security Considerations

### Data Privacy
- All local data is stored in browser localStorage
- Data is not encrypted by default
- Clear localStorage when logging out

### Recommended Practices
- Don't store sensitive data in local mode
- Implement data expiration policies
- Add encryption for sensitive fields
- Clear cache on logout

## Troubleshooting

### Issue: Data not saving locally

**Solution**: Check localStorage quota
```javascript
// Check storage usage
const estimate = await navigator.storage.estimate();
console.log(`Using ${estimate.usage} of ${estimate.quota} bytes`);
```

### Issue: Old data showing after backend recovery

**Solution**: Clear local cache and refresh
```javascript
localStorage.clear();
window.location.reload();
```

### Issue: Status indicator not updating

**Solution**: The indicator updates every 30 seconds. Force update:
```javascript
await unifiedApiClient.resetBackendCheck();
```

## License

Part of the portfolio application. See main LICENSE file.
