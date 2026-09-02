import { Router } from "express";
import * as articleController from "../controllers/articleController";
import { requireAdmin } from "../middleware/requireAdmin";

const router = Router();

router.get("/topics", articleController.listTopics);
router.get("/", articleController.listArticles);
router.get("/:idOrSlug", articleController.getArticle);
router.post("/", requireAdmin, articleController.createArticle);
router.put("/:id", requireAdmin, articleController.updateArticle);
router.delete("/:id", requireAdmin, articleController.deleteArticle);

export default router;
