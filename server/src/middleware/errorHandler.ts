import { Request, Response, NextFunction } from "express";
import { Error as MongooseError } from "mongoose";

interface AppError extends Error {
  status?: number;
  code?: number;
  keyValue?: Record<string, unknown>;
}

export function notFound(_req: Request, res: Response): void {
  res.status(404).json({ error: "Not found" });
}

export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof MongooseError.ValidationError) {
    const messages = Object.values(err.errors).map((e) => e.message);
    res.status(400).json({ error: messages.join(", ") });
    return;
  }
  if (err instanceof MongooseError.CastError) {
    res.status(400).json({ error: `Invalid ${err.path}: ${err.value}` });
    return;
  }
  if (err.code === 11000) {
    res.status(409).json({ error: "Duplicate value", keyValue: err.keyValue });
    return;
  }
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Internal server error" });
}
