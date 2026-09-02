import { Router } from "express";
import * as productController from "../controllers/productController";
import { requireAdmin } from "../middleware/requireAdmin";

const router = Router();

router.get("/categories", productController.listCategories);
router.get("/", productController.listProducts);
router.get("/:id", productController.getProduct);
router.post("/", requireAdmin, productController.createProduct);
router.put("/:id", requireAdmin, productController.updateProduct);
router.delete("/:id", requireAdmin, productController.deleteProduct);

export default router;
