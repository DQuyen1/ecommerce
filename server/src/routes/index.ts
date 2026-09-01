import { Router } from "express";

import productsRouter from "./products";
import newsRouter from "./news";
import jobsRouter from "./jobs";
import contactRouter from "./contact";

const router = Router();

router.use("/products", productsRouter);
router.use("/news", newsRouter);
router.use("/jobs", jobsRouter);
router.use("/contact", contactRouter);

export default router;
