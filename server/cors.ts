import type { Request, Response, NextFunction } from "express";

const DEFAULT_CORS_ORIGINS = [
  "https://urban-rohr.com",
  "https://www.urban-rohr.com",
  "https://urban-rohr.de",
  "https://www.urban-rohr.de",
];

function buildAllowedOrigins(): Set<string> {
  const configured = (process.env.CORS_ORIGIN || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return new Set(configured.length > 0 ? configured : DEFAULT_CORS_ORIGINS);
}

function isAllowedOrigin(origin: string, allowedOrigins: Set<string>): boolean {
  if (allowedOrigins.has(origin)) {
    return true;
  }

  try {
    const { hostname, protocol } = new URL(origin);
    if (protocol !== "https:" && protocol !== "http:") {
      return false;
    }

    return (
      hostname === "urban-rohr.com" ||
      hostname.endsWith(".urban-rohr.com") ||
      hostname === "urban-rohr.de" ||
      hostname.endsWith(".urban-rohr.de")
    );
  } catch {
    return false;
  }
}

export function createCorsMiddleware() {
  const allowedOrigins = buildAllowedOrigins();

  return (req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin;

    if (origin && isAllowedOrigin(origin, allowedOrigins)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Vary", "Origin");
    }

    if (req.method === "OPTIONS") {
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS",
      );

      const requestedHeaders = req.headers["access-control-request-headers"];
      res.setHeader(
        "Access-Control-Allow-Headers",
        requestedHeaders || "Content-Type, Authorization, Accept",
      );
      res.setHeader("Access-Control-Max-Age", "86400");
      res.status(204).end();
      return;
    }

    next();
  };
}
