// Load environment variables from .env file FIRST, before any other imports
import dotenv from 'dotenv';
dotenv.config();

import express, { type Request, Response, NextFunction } from "express";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: false, limit: '100mb' }));

const DEFAULT_SITE_ACCESS_PASSWORD = "konti-maintenance";
const SITE_ACCESS_PASSWORD = (process.env.SITE_ACCESS_PASSWORD || DEFAULT_SITE_ACCESS_PASSWORD).trim();
const SITE_ACCESS_COOKIE_NAME = "site_access";
const SITE_ACCESS_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days
const SITE_ACCESS_ENABLED = (process.env.SITE_ACCESS_ENABLED || "false").trim().toLowerCase() === "true";
const BLOCKED_PDF_FILENAME = "DE - Katallogu per WEB - PDF.pdf";

function parseCookies(cookieHeader?: string): Record<string, string> {
  if (!cookieHeader) return {};

  return cookieHeader
    .split(";")
    .map((pair) => pair.trim())
    .filter(Boolean)
    .reduce<Record<string, string>>((acc, cookie) => {
      const separatorIndex = cookie.indexOf("=");
      if (separatorIndex === -1) return acc;

      const key = decodeURIComponent(cookie.slice(0, separatorIndex));
      const value = decodeURIComponent(cookie.slice(separatorIndex + 1));
      acc[key] = value;
      return acc;
    }, {});
}

function getSiteAccessSecret(): string {
  return process.env.SITE_ACCESS_SECRET || SITE_ACCESS_PASSWORD || "fallback-site-access-secret";
}

function createSiteAccessCookieValue(expiresAt: number): string {
  const payload = String(expiresAt);
  const signature = crypto
    .createHmac("sha256", getSiteAccessSecret())
    .update(payload)
    .digest("hex");

  return `${payload}.${signature}`;
}

function hasValidSiteAccessCookie(req: Request): boolean {
  const cookies = parseCookies(req.headers.cookie);
  const cookieValue = cookies[SITE_ACCESS_COOKIE_NAME];

  if (!cookieValue) return false;

  const separatorIndex = cookieValue.indexOf(".");
  if (separatorIndex === -1) return false;

  const expiresAtRaw = cookieValue.slice(0, separatorIndex);
  const signature = cookieValue.slice(separatorIndex + 1);
  const expiresAt = Number(expiresAtRaw);

  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
    return false;
  }

  const expectedValue = createSiteAccessCookieValue(expiresAt);
  const expectedSignature = expectedValue.slice(expectedValue.indexOf(".") + 1);

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature, "utf8"),
      Buffer.from(expectedSignature, "utf8"),
    );
  } catch {
    return false;
  }
}

function sanitizeReturnTo(returnTo: unknown): string {
  if (typeof returnTo !== "string" || !returnTo.startsWith("/") || returnTo.startsWith("//")) {
    return "/";
  }

  return returnTo;
}

function renderSiteAccessPage(invalidPassword = false, returnTo = "/"): string {
  const message = invalidPassword ? "<p style='color:#b91c1c;margin:0 0 12px;'>Wrong password. Please try again.</p>" : "";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Protected Access</title>
    <style>
      body {
        margin: 0;
        min-height: 100vh;
        font-family: Arial, sans-serif;
        display: grid;
        place-items: center;
        background: linear-gradient(135deg, #f8fafc, #e2e8f0);
      }
      .card {
        width: min(92vw, 420px);
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(15, 23, 42, 0.12);
        padding: 24px;
      }
      h1 {
        margin: 0 0 8px;
        font-size: 1.4rem;
      }
      p {
        margin: 0 0 16px;
        color: #475569;
      }
      label {
        display: block;
        margin-bottom: 6px;
        font-weight: 600;
      }
      input {
        width: 100%;
        box-sizing: border-box;
        padding: 12px;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        margin-bottom: 12px;
      }
      button {
        width: 100%;
        border: none;
        border-radius: 8px;
        padding: 12px;
        background: #0f172a;
        color: #ffffff;
        font-weight: 600;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <form class="card" method="post" action="/site-access">
      <h1>Site Under Maintenance</h1>
      <p>Enter the access password to continue.</p>
      ${message}
      <label for="password">Password</label>
      <input id="password" name="password" type="password" autocomplete="current-password" required />
      <input name="returnTo" type="hidden" value="${returnTo}" />
      <button type="submit">Enter Website</button>
    </form>
  </body>
</html>`;
}

function siteAccessMiddleware(req: Request, res: Response, next: NextFunction) {
  const setNoStore = () => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
  };

  if (req.path.startsWith("/api")) {
    next();
    return;
  }

  if (req.method === "POST" && req.path === "/site-access") {
    const submittedPassword = typeof req.body?.password === "string" ? req.body.password : "";
    const returnTo = sanitizeReturnTo(req.body?.returnTo);
    const isSecureRequest = req.secure || req.headers["x-forwarded-proto"] === "https";

    if (submittedPassword === SITE_ACCESS_PASSWORD) {
      const expiresAt = Date.now() + SITE_ACCESS_TTL_SECONDS * 1000;
      const cookieValue = createSiteAccessCookieValue(expiresAt);
      const secureCookie = isSecureRequest ? "; Secure" : "";

      res.setHeader(
        "Set-Cookie",
        `${SITE_ACCESS_COOKIE_NAME}=${encodeURIComponent(cookieValue)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SITE_ACCESS_TTL_SECONDS}${secureCookie}`,
      );
      setNoStore();
      res.redirect(returnTo);
      return;
    }

    setNoStore();
    res.status(401).type("html").send(renderSiteAccessPage(true, returnTo));
    return;
  }

  if (req.method === "GET" && req.path === "/site-access/logout") {
    const isSecureRequest = req.secure || req.headers["x-forwarded-proto"] === "https";
    const secureCookie = isSecureRequest ? "; Secure" : "";
    res.setHeader(
      "Set-Cookie",
      `${SITE_ACCESS_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secureCookie}`,
    );
    setNoStore();
    res.redirect("/site-access");
    return;
  }

  if (req.method === "GET" && req.path === "/site-access") {
    if (hasValidSiteAccessCookie(req)) {
      setNoStore();
      res.redirect("/");
      return;
    }

    setNoStore();
    res.status(200).type("html").send(renderSiteAccessPage(false, "/"));
    return;
  }

  if (hasValidSiteAccessCookie(req)) {
    next();
    return;
  }

  setNoStore();
  res.status(401).type("html").send(renderSiteAccessPage(false, sanitizeReturnTo(req.originalUrl)));
}

if (SITE_ACCESS_ENABLED) {
  app.use(siteAccessMiddleware);
  log("site access lock is enabled");
} else {
  log("site access lock is disabled");
}

app.use((req, res, next) => {
  const requestedPath = decodeURIComponent(req.path || "");
  const isBlockedPdfPath =
    requestedPath.endsWith(`/${BLOCKED_PDF_FILENAME}`) ||
    requestedPath === `/${BLOCKED_PDF_FILENAME}`;
  const isAttachedAssetRequest = requestedPath.startsWith("/attached_assets/");

  if (isBlockedPdfPath && !isAttachedAssetRequest) {
    res.status(404).end();
    return;
  }

  next();
});

// Serve attached assets statically from all known production/dev locations.
const attachedAssetsCandidates = [
  path.resolve(__dirname, "..", "attached_assets"),
  path.resolve(__dirname, "..", "dist", "public", "attached_assets"),
  path.resolve(__dirname, "..", "client", "public", "attached_assets"),
];

const attachedAssetsPaths = attachedAssetsCandidates.filter(
  (candidatePath, index, arr) =>
    arr.indexOf(candidatePath) === index && fs.existsSync(candidatePath),
);

for (const attachedAssetsPath of attachedAssetsPaths) {
  app.use("/attached_assets", express.static(attachedAssetsPath));
}

if (attachedAssetsPaths.length === 0) {
  log("warning: no attached_assets directory found in expected locations");
} else {
  log(`attached_assets served from: ${attachedAssetsPaths.join(", ")}`);
}

// Serve uploads directory statically (for both development and production)
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
