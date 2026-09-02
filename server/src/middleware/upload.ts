import path from "path";
import { randomUUID } from "crypto";
import multer from "multer";

/** Rejects with a client error instead of the default 500 an uncaught fileFilter error produces. */
function rejectAs400(message: string): Error & { status: number } {
  return Object.assign(new Error(message), { status: 400 });
}

export const UPLOAD_DIR = path.join(__dirname, "..", "..", "uploads", "cv");

const cvStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    cb(null, `${randomUUID()}${path.extname(file.originalname)}`);
  },
});

export const cvUpload = multer({
  storage: cvStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = [".pdf", ".doc", ".docx"];
    if (!allowed.includes(path.extname(file.originalname).toLowerCase())) {
      return cb(rejectAs400("Only PDF, DOC, DOCX files are allowed"));
    }
    cb(null, true);
  },
});

export const PRODUCT_UPLOAD_DIR = path.join(__dirname, "..", "..", "uploads", "products");

const productImageStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, PRODUCT_UPLOAD_DIR),
  filename: (_req, file, cb) => {
    cb(null, `${randomUUID()}${path.extname(file.originalname)}`);
  },
});

export const productImageUpload = multer({
  storage: productImageStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
    if (!allowed.includes(path.extname(file.originalname).toLowerCase())) {
      return cb(rejectAs400("Only JPG, PNG, WEBP or GIF images are allowed"));
    }
    cb(null, true);
  },
});
