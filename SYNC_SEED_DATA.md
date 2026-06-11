# Sync Seed Data from Database

This guide explains how to update your seed data to match your current database.

## Why Sync Seed Data?

The seed data in `app/data/seedData.ts` is used as a fallback when the backend is unavailable. To ensure users see your actual portfolio data (not placeholder data) when the backend is down, you need to sync it periodically.

## When to Sync

Sync your seed data:
- ✅ **Before deploying to production** - Ensures latest data is bundled
- ✅ **After adding new projects/skills** - Keeps fallback data fresh  
- ✅ **Periodically (weekly/monthly)** - Maintains data accuracy
- ✅ **Before important updates** - Ensures consistency

## How to Sync

### Option 1: Using npm script (Recommended)

```bash
npm run sync-seed
```

This will:
1. Fetch all data from your backend
2. Transform it to match frontend types
3. Generate updated `app/data/seedData.ts`
4. Show summary of synced data

### Option 2: Manual execution

```bash
node scripts/sync-seed-data.js
```

## Expected Output

```
🔄 Syncing seed data from backend...

Fetching: https://portifolio-backend-ptck.onrender.com/api/projects
Fetching: https://portifolio-backend-ptck.onrender.com/api/skills
Fetching: https://portifolio-backend-ptck.onrender.com/api/experience
Fetching: https://portifolio-backend-ptck.onrender.com/api/certificates

✅ Data fetched successfully:
   - 7 projects
   - 15 skills
   - 3 experiences
   - 4 certificates

✅ Seed data file updated successfully!
📁 File: /path/to/app/data/seedData.ts

🎉 Your seed data now matches your database!
💡 Commit this file to ensure production has latest data.
```

## After Syncing

1. **Review the changes:**
   ```bash
   git diff app/data/seedData.ts
   ```

2. **Commit the updated file:**
   ```bash
   git add app/data/seedData.ts
   git commit -m "chore: sync seed data with database"
   ```

3. **Deploy to production:**
   ```bash
   git push
   # Or deploy via Vercel/Netlify dashboard
   ```

## Troubleshooting

### Error: Backend not accessible

**Problem:** Script cannot reach your backend
```
❌ Error syncing seed data: Request failed for /api/projects
```

**Solution:**
1. Verify backend is running
2. Check `NEXT_PUBLIC_BACKEND_API_URL` in `.env.local`
3. Test backend manually: `curl https://your-backend.com/api/projects`

### Error: Invalid JSON response

**Problem:** Backend returned non-JSON data
```
❌ Error syncing seed data: Failed to parse JSON
```

**Solution:**
1. Check backend API endpoints return valid JSON
2. Verify no authentication is required for GET endpoints
3. Test endpoints in browser/Postman

### Error: Missing data fields

**Problem:** Backend response doesn't match expected structure

**Solution:**
1. Check the script's transformation logic in `scripts/sync-seed-data.js`
2. Update the mapping to match your backend structure
3. Ensure all required fields are present

## Automated Syncing

### Add to CI/CD Pipeline

#### GitHub Actions
```yaml
# .github/workflows/deploy.yml
- name: Sync seed data
  run: npm run sync-seed
  
- name: Commit seed data
  run: |
    git config user.name "GitHub Actions"
    git config user.email "actions@github.com"
    git add app/data/seedData.ts
    git diff --quiet && git diff --staged --quiet || git commit -m "chore: auto-sync seed data"
```

#### Pre-deploy Hook
```json
// package.json
{
  "scripts": {
    "prebuild": "npm run sync-seed",
    "build": "next build"
  }
}
```

## Manual Seed Data Updates

If you prefer to manually update seed data instead of syncing:

1. Edit `app/data/seedData.ts` directly
2. Follow the existing structure
3. Ensure all required fields are present
4. Use `new Date()` for date fields

Example:
```typescript
export const seedProjects: Project[] = [
  {
    id: 'manual-1',
    title: 'My New Project',
    description: 'Project description',
    technologies: ['React', 'Node.js'],
    highlights: ['Achievement 1', 'Achievement 2'],
    liveUrl: 'https://project.com',
    imageUrl: '/project-image.png',
    order: 1,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    isPublished: true
  }
];
```

## Best Practices

1. **Sync before deployment** - Always sync before pushing to production
2. **Version control** - Commit seed data changes to Git
3. **Review changes** - Check git diff to see what data changed
4. **Test locally** - After syncing, test with backend disabled to verify fallback
5. **Regular updates** - Sync weekly or after major content updates

## Testing Fallback System

After syncing, test that your seed data works:

1. **Disable backend:**
   ```bash
   # In .env.local
   NEXT_PUBLIC_BACKEND_API_URL=http://invalid-url.com
   ```

2. **Start dev server:**
   ```bash
   npm run dev
   ```

3. **Visit pages:**
   - http://localhost:3000/projects
   - http://localhost:3000/skills
   - http://localhost:3000/experience

4. **Verify:**
   - ✅ Pages load without errors
   - ✅ Your actual data is displayed
   - ✅ Console shows "Using local/seed data"

## Production Deployment Checklist

Before deploying:

- [ ] Run `npm run sync-seed`
- [ ] Verify seed data updated successfully
- [ ] Review changes in git diff
- [ ] Commit updated seed data file
- [ ] Test locally with backend disabled
- [ ] Push to production
- [ ] Verify production fallback works

## Support

If you encounter issues:

1. Check console logs for detailed error messages
2. Verify backend API is accessible
3. Review backend response structure
4. Test individual API endpoints
5. Check seed data file format

The sync script is designed to be resilient, but backend structure changes may require script updates.
