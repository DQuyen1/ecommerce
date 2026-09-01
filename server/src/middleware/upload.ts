import path from "path";
import { randomUUID } from "crypto";
import multer from "multer";

export const UPLOAD_DIR = path.join(__dirname, "..", "..", "uploads", "cv");

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    cb(null, `${randomUUID()}${path.extname(file.originalname)}`);
  },
});

export const cvUpload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = [".pdf", ".doc", ".docx"];
    if (!allowed.includes(path.extname(file.originalname).toLowerCase())) {
      return cb(new Error("Only PDF, DOC, DOCX files are allowed"));
    }
    cb(null, true);
  },
});
