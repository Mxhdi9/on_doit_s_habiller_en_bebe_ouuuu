const http = require("http");
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const port = Number(process.env.ASCALON_PORT || process.argv[2] || 4181);
const host = process.env.ASCALON_HOST || "127.0.0.1";
const localMediaConfigPath = path.join(root, "local-media.config.json");
const localMedia = fs.existsSync(localMediaConfigPath)
  ? JSON.parse(fs.readFileSync(localMediaConfigPath, "utf8"))
  : {};

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".ico": "image/x-icon",
};

function sendFile(req, res, target) {
  const extension = path.extname(target).toLowerCase();
  const contentType = types[extension] || "application/octet-stream";

  if ([".mp3", ".mp4", ".webm"].includes(extension) && req.headers.range) {
    fs.stat(target, (error, stats) => {
      if (error) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Not found");
        return;
      }

      const [rawStart, rawEnd] = req.headers.range.replace(/bytes=/, "").split("-");
      const start = Number(rawStart);
      const end = rawEnd ? Number(rawEnd) : stats.size - 1;
      const chunkSize = end - start + 1;

      res.writeHead(206, {
        "Accept-Ranges": "bytes",
        "Cache-Control": "no-store",
        "Content-Length": chunkSize,
        "Content-Range": `bytes ${start}-${end}/${stats.size}`,
        "Content-Type": contentType,
      });
      fs.createReadStream(target, { start, end }).pipe(res);
    });
    return;
  }

  fs.readFile(target, (error, data) => {
    if (error) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }

    res.writeHead(200, {
      "Cache-Control": "no-store",
      "Content-Type": contentType,
    });
    res.end(data);
  });
}

// This public WebM route streams independently of the legacy preview handlers.
function sendPublicVideo(req, res) {
  const headers = {
    "Content-Type": "video/webm",
    "Content-Disposition": "inline",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
    "Access-Control-Allow-Headers": "Range",
    "Access-Control-Expose-Headers": "Accept-Ranges, Content-Length, Content-Range, Content-Type",
    "Cross-Origin-Resource-Policy": "cross-origin",
    "Accept-Ranges": "bytes",
    "Cache-Control": "no-store",
  };
  const finish = (status, extra = {}) => {
    res.writeHead(status, { ...headers, ...extra });
    res.end();
  };

  if (req.method === "OPTIONS") {
    finish(204);
    return;
  }
  if (req.method !== "GET" && req.method !== "HEAD") {
    finish(405, { "Allow": "GET, HEAD, OPTIONS", "Content-Length": 0 });
    return;
  }

  const target = path.join(root, "videos", "video.webm");
  fs.stat(target, (error, stats) => {
    if (error || !stats.isFile()) {
      finish(error && error.code !== "ENOENT" ? 500 : 404, { "Content-Length": 0 });
      return;
    }

    const size = stats.size;
    // Range is defined for GET; HEAD always describes the complete resource.
    if (req.method === "HEAD") {
      finish(200, { "Content-Length": size });
      return;
    }

    let start = 0;
    let end = size - 1;
    let status = 200;
    const range = req.headers.range;
    const unsatisfied = () => finish(416, {
      "Content-Range": "bytes */" + size,
      "Content-Length": 0,
    });
    // Multiple ranges are intentionally ignored instead of producing multipart.
    if (range !== undefined && (typeof range !== "string" || !range.includes(","))) {
      const match = typeof range === "string" && /^bytes=(\d*)-(\d*)$/i.exec(range.trim());
      if (!match || (!match[1] && !match[2]) || size === 0) {
        unsatisfied();
        return;
      }
      if (!match[1]) {
        const suffix = Number(match[2]);
        if (!Number.isSafeInteger(suffix) || suffix <= 0) {
          unsatisfied();
          return;
        }
        start = Math.max(0, size - suffix);
      } else {
        start = Number(match[1]);
        const requestedEnd = match[2] ? Number(match[2]) : end;
        if (!Number.isSafeInteger(start) || !Number.isSafeInteger(requestedEnd) || start >= size || requestedEnd < start) {
          unsatisfied();
          return;
        }
        end = Math.min(requestedEnd, end);
      }
      status = 206;
    }

    const responseHeaders = { ...headers, "Content-Length": size === 0 ? 0 : end - start + 1 };
    if (status === 206) responseHeaders["Content-Range"] = "bytes " + start + "-" + end + "/" + size;
    if (size === 0) {
      finish(200, { "Content-Length": 0 });
      return;
    }

    const stream = fs.createReadStream(target, { start, end });
    res.once("close", () => stream.destroy());
    stream.once("open", () => {
      if (res.destroyed) {
        stream.destroy();
        return;
      }
      res.writeHead(status, responseHeaders);
      stream.pipe(res);
    });
    stream.once("error", streamError => {
      if (res.destroyed) return;
      if (res.headersSent) {
        res.destroy();
        return;
      }
      finish(streamError.code === "ENOENT" ? 404 : 500, { "Content-Length": 0 });
    });
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${host}:${port}`);

  if (url.pathname === "/videos/video.webm") {
    sendPublicVideo(req, res);
    return;
  }

  if (localMedia[url.pathname]) {
    sendFile(req, res, localMedia[url.pathname]);
    return;
  }

  const relativePath = url.pathname === "/" ? "index.html" : decodeURIComponent(url.pathname.slice(1));
  const target = path.resolve(root, relativePath);

  if (!target.startsWith(root)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  sendFile(req, res, target);
});

server.on("error", (error) => {
  console.error("ASCALON preview error:", error.message);
  console.error("Change le port avec : node preview-server.cjs 4182");
});

server.listen(port, host, () => {
  console.log(`ASCALON actif : http://${host}:${port}/`);
  console.log("Garde cette fenetre ouverte pendant que tu utilises le site.");
});
