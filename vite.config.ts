import { defineConfig } from "vite";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const appRoutes = new Set(["/", "/demo", "/play", "/privacy", "/terms"]);

function localNotFound() {
  const middleware = (file: string) => (req: { method?: string; url?: string; headers: { accept?: string } }, res: { statusCode: number; setHeader(name: string, value: string): void; end(body: Buffer): void }, next: () => void) => {
    const pathname = new URL(req.url || "/", "http://localhost").pathname.replace(/\/+$/, "") || "/";
    if (req.method !== "GET" || !req.headers.accept?.includes("text/html") || appRoutes.has(pathname)) return next();
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(readFileSync(file));
  };
  return {
    name: "trace-before-run-local-404",
    configureServer(server: { middlewares: { use(handler: ReturnType<typeof middleware>): void } }) {
      server.middlewares.use(middleware(resolve(process.cwd(), "public/404.html")));
    },
    configurePreviewServer(server: { middlewares: { use(handler: ReturnType<typeof middleware>): void } }) {
      server.middlewares.use(middleware(resolve(process.cwd(), "dist/404.html")));
    },
  };
}

export default defineConfig({
  plugins: [localNotFound()],
  build: {
    target: "es2022",
    outDir: "dist",
    assetsInlineLimit: 2048,
    sourcemap: true,
  },
});
