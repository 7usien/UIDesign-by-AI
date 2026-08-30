---
name: vercel-deploy
description: Step-by-step workflow and best practices for building, previewing, and deploying this Vite React web application to Vercel.
---

# Vercel Deployment Skill for Vite & React

## 1. Quick Fix for the 404 / "No static directory" Error

This warning happens when Vercel CLI doesn't get the clean output directory or when custom fields in `vercel.json` conflict with Vite auto-detection.

### Solution A: Direct Root Deploy with Cloud Build (Recommended)
From the project root `d:\ai-projects\ui-design`:
```bash
vercel --prod
```
When prompted:
- Set up and deploy? **Y**
- Which scope? **Select your account**
- Link to existing project? **N** (or **Y** if updating)
- Project name? **egydes-security**
- In which directory is your code located? `./`
- Auto-detected Project Settings: **Vite**
- Want to modify these settings? **N**

---

### Solution B: Deploy Pre-built `dist` Folder Directly (Fastest & Guaranteed)
Build locally first, then deploy the `dist` folder:
```bash
npm run build
vercel dist --prod
```
*When deploying the `dist` folder directly, Vercel uploads the already built HTML/CSS/JS assets immediately without needing a cloud build.*

---

## 2. Configuration (`vercel.json`)
The `vercel.json` should only contain SPA routing rewrites:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
