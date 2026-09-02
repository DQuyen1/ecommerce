import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

/** Returns the server-relative path; the client resolves it against the API origin. */
export const uploadImage = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }
  res.status(201).json({ url: `/uploads/products/${req.file.filename}` });
});
