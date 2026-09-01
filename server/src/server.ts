import "dotenv/config";

import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import fs from "fs";

import connectDB from "./config/db";
import { notFound, errorHandler } from "./middleware/errorHandler";
import { UPLOAD_DIR } from "./middleware/upload";
import routes from "./routes";

fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.get("/", (_req: Request, res: Response) => {
  res.json({
    name: "Company Site API",
    endpoints: ["/api/products", "/api/news", "/api/jobs", "/api/contact"],
  });
});

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 3000;

async function start(): Promise<void> {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
  });
}

start().catch((err: Error) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

export default app;
