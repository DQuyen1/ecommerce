import { Router } from "express";
import * as articleController from "../controllers/articleController";

const router = Router();

router.get("/topics", articleController.listTopics);
router.get("/", articleController.listArticles);
router.get("/:idOrSlug", articleController.getArticle);
router.post("/", articleController.createArticle);
router.put("/:id", articleController.updateArticle);
router.delete("/:id", articleController.deleteArticle);

export default router;
