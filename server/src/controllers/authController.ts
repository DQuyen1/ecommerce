import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body as { username?: string; password?: string };

  if (!username || !password) {
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }

  const admin = await Admin.findOne({ username: username.trim().toLowerCase() }).select(
    "+passwordHash"
  );

  // Same error for "no such user" and "wrong password" — don't let a login
  // attempt confirm which usernames exist.
  const valid = admin ? await bcrypt.compare(password, admin.passwordHash) : false;
  if (!admin || !valid) {
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }

  const token = jwt.sign(
    { sub: admin.id, username: admin.username },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );
  res.json({ token, username: admin.username });
});
