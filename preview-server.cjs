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
  ".ico": "image/x-icon",
};

function sendFile(req, res, target) {
  const extension = path.extname(target).toLowerCase();
  const contentType = types[extension] || "application/octet-stream";

  if ([".mp3", ".mp4"].includes(extension) && req.headers.range) {
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

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${host}:${port}`);

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
