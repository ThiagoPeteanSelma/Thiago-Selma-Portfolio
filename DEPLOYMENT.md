<!-- GitHub Pages Configuration -->
<!-- This file enables GitHub Pages deployment -->
<!-- No additional configuration needed - GitHub will serve the site automatically -->

# Portfolio Deployment Guide

## GitHub Pages Setup

1. **Enable GitHub Pages:**
   - Go to Settings → Pages
   - Select "Deploy from a branch"
   - Branch: `main` (or your main branch)
   - Folder: `/ (root)`
   - Click "Save"

2. **Your site will be live at:**
   ```
   https://thiagopeteanselma.github.io/Thiago-Selma-Portfolio/
   ```

## Local Development

### Option 1: Using Node.js
```bash
node server.js
# Opens at http://localhost:8000
```

### Option 2: Using Python
```bash
python3 -m http.server 8000
# Opens at http://localhost:8000
```

### Option 3: VS Code Live Server Extension
- Right-click `index.html`
- Select "Open with Live Server"

## Build Process (Optional - for minification)

```bash
# Install dependencies
npm install

# Build (minify CSS/JS)
npm run build

# Deploy
npm run deploy
```

## Project Structure

```
Thiago-Selma-Portfolio/
├── index.html                 # Main entry point
├── src/
│   ├── js/
│   │   ├── config.js         # Global configuration
│   │   ├── core/             # Core modules
│   │   │   ├── Portfolio.js  # Main orchestrator
│   │   │   ├── DataManager.js
│   │   │   ├── ThemeManager.js
│   │   │   ├── LanguageManager.js
│   │   │   └── StorageManager.js
│   │   ├── ui/               # UI rendering
│   │   │   ├── Timeline.js
│   │   │   ├── Tooltip.js
│   │   │   ├── ProjectRenderer.js
│   │   │   ├── EducationRenderer.js
│   │   │   └── EmailHandler.js
│   │   └── utils/            # Utilities
│   │       ├── sanitizer.js  # XSS prevention
│   │       ├── validator.js  # Data validation
│   │       └── logger.js     # Error logging
│   ├── css/
│   │   └── main.css          # Styling
│   └── assets/
│       ├── content.json      # Content & translations
│       ├── profile.jpg       # Profile photo
│       └── social-icons/     # Icons (if separate)
└── README.md
```

## Key Features

- ✅ **Multilingual:** Portuguese, English, Spanish
- ✅ **Dark/Light Theme:** Auto-detect + manual toggle
- ✅ **Responsive Design:** Mobile-first approach
- ✅ **Security:** No innerHTML, XSS prevention
- ✅ **Performance:** Lazy loading, optimized assets
- ✅ **Accessibility:** WCAG 2.1 compliant
- ✅ **SEO Ready:** Meta tags, Open Graph support

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Targets

- **Lighthouse Score:** 90+
- **First Paint:** < 1s
- **Total Bundle:** < 200KB

## Troubleshooting

### Issue: CSS not loading
**Solution:** Clear browser cache (Ctrl+Shift+Delete) and reload

### Issue: JavaScript errors in console
**Solution:** Check browser console for detailed error messages. Open DevTools (F12)

### Issue: Images not showing
**Solution:** Verify `assets/profile.jpg` exists and path is correct

## Support & Contact

- **Portfolio:** https://github.com/thiagopeteanselma/Thiago-Selma-Portfolio
- **Email:** thiagopetean@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/thiagopeteanselma
