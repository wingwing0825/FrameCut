const http = require("http");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const host = "127.0.0.1";
const port = 5173;
const root = __dirname;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".wasm": "application/wasm",
};

function resolvePath(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]);
  const safePath = clean === "/" ? "/index.html" : clean;
  const fullPath = path.normalize(path.join(root, safePath));
  if (!fullPath.startsWith(root)) {
    return null;
  }
  return fullPath;
}

const server = http.createServer((req, res) => {
  const fullPath = resolvePath(req.url || "/");
  if (!fullPath) {
    res.statusCode = 403;
    res.end("Forbidden");
    return;
  }

  fs.stat(fullPath, (statErr, stats) => {
    if (statErr || !stats.isFile()) {
      res.statusCode = 404;
      res.end("Not Found");
      return;
    }

    const ext = path.extname(fullPath).toLowerCase();
    res.setHeader("Content-Type", mimeTypes[ext] || "application/octet-stream");
    // Needed for ffmpeg.wasm in modern browsers.
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    res.setHeader("Cache-Control", "no-store");

    const stream = fs.createReadStream(fullPath);
    stream.on("error", () => {
      res.statusCode = 500;
      res.end("Server Error");
    });
    stream.pipe(res);
  });
});

server.listen(port, host, () => {
  const url = `http://${host}:${port}`;
  console.log(`Web app running at ${url}`);
  console.log("Press Ctrl+C to stop.");

  if (process.platform === "win32") {
    try {
      exec(`start "" "${url}"`, (err) => {
        if (err) {
          console.log(`Auto-open failed. Open this URL manually: ${url}`);
        }
      });
    } catch (_err) {
      console.log(`Auto-open failed. Open this URL manually: ${url}`);
    }
  }
});
