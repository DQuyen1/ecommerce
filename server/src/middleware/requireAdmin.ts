import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/**
 * Gates the admin-only routes (content mutations, PII reads like contacts
 * and job applications). A single shared password issues a JWT on login;
 * this middleware just checks that token is present and valid — there are
 * no per-admin roles or permissions to distinguish.
 */
export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
}
