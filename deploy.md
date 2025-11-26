# Deployment Guide

## Quick Deploy Options

### 1. Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts to connect to GitHub and deploy
```

### 2. Netlify
```bash
# Build the project
npm run build

# Drag and drop the 'dist' folder to netlify.com
# Or use Netlify CLI:
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### 3. GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"homepage": "https://yourusername.github.io/portfolio",
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

### 4. Firebase Hosting
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Initialize Firebase
firebase init hosting

# Build and deploy
npm run build
firebase deploy
```

## Environment Setup

For production deployment, make sure to:

1. Update social media links in `src/components/Footer.tsx`
2. Update email addresses in contact forms
3. Add real project URLs in `src/data/projects.ts`
4. Optimize images for web (consider WebP format)
5. Add Google Analytics if needed
6. Set up proper domain and SSL certificate

## Performance Optimization

- Images are already set to lazy load
- Tailwind CSS is purged in production
- Vite automatically optimizes the build
- Consider adding a CDN for images if needed
