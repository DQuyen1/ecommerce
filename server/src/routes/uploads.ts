import { Router } from "express";
import { requireAdmin } from "../middleware/requireAdmin";
import { productImageUpload } from "../middleware/upload";
import * as uploadController from "../controllers/uploadController";

const router = Router();

router.post("/image", requireAdmin, productImageUpload.single("image"), uploadController.uploadImage);

export default router;
