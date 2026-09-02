import { Router } from "express";
import * as applicationController from "../controllers/applicationController";
import { requireAdmin } from "../middleware/requireAdmin";

const router = Router();

router.get("/", requireAdmin, applicationController.listAllApplications);
router.delete("/:id", requireAdmin, applicationController.deleteApplication);

export default router;
