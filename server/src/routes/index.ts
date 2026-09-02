import { Router } from "express";

import productsRouter from "./products";
import newsRouter from "./news";
import jobsRouter from "./jobs";
import contactRouter from "./contact";
import applicationsRouter from "./applications";
import authRouter from "./auth";
import uploadsRouter from "./uploads";

const router = Router();

router.use("/products", productsRouter);
router.use("/news", newsRouter);
router.use("/jobs", jobsRouter);
router.use("/contact", contactRouter);
router.use("/applications", applicationsRouter);
router.use("/auth", authRouter);
router.use("/uploads", uploadsRouter);

export default router;
