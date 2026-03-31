# Web App Guide

This guide covers the browser version.

## Files

1. `web-app/index.html` - page layout
2. `web-app/styles.css` - styling
3. `web-app/app.js` - ffmpeg.wasm logic
4. `web-app/server.js` - local static server
5. `run-web-app.bat` - local launcher

## Local run

### Start

Double-click:

```text
run-web-app.bat
```

Then open:

```text
http://127.0.0.1:5173
```

### Features

1. Upload or drag video
2. Set output as "images per second" (for example 1 image/sec, 10 images/sec)
3. Optional: export every frame
4. Output format: PNG/JPG/WEBP
5. Output modes:
   - Download ZIP (all browsers)
   - Import to Eagle App (Eagle desktop must be running, and this mode only works on local app URL `http://127.0.0.1:5173`)
   - Write directly to folder (Chrome/Edge only)

### Notes

1. Web app does not need local `ffmpeg.exe`
2. ffmpeg worker/runtime wrappers are bundled in `web-app/vendor`
3. ffmpeg core wasm is loaded from CDN on first run
4. Large videos use significant memory in browser

## Deploy to Vercel

This repo already includes:

1. `vercel.json` - routes + COOP/COEP headers for ffmpeg.wasm
2. `.vercelignore` - excludes local binaries and generated outputs

### Steps

1. Push repo to GitHub
2. Import project in Vercel
3. Framework preset: `Other`
4. Build command: empty
5. Output directory: empty
6. Deploy

## Deploy to Cloudflare Workers

This repo includes:

1. `wrangler.jsonc` (assets directory = `web-app`)
2. `web-app/_headers` (COOP/COEP for ffmpeg.wasm)

Cloudflare dashboard fields:

1. Project name: `FrameCut` (or any unique name)
2. Build command: leave empty
3. Deploy command: `npx wrangler deploy`
