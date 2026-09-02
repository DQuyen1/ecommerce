import { Router } from "express";
import * as jobController from "../controllers/jobController";
import { cvUpload } from "../middleware/upload";
import { requireAdmin } from "../middleware/requireAdmin";

const router = Router();

router.get("/", jobController.listJobs);
router.get("/:id", jobController.getJob);
router.post("/", requireAdmin, jobController.createJob);
router.put("/:id", requireAdmin, jobController.updateJob);
router.delete("/:id", requireAdmin, jobController.deleteJob);

router.post("/:id/apply", cvUpload.single("cv"), jobController.applyToJob);
// Applicant PII (name, email, phone, CV link) — admin only.
router.get("/:id/applications", requireAdmin, jobController.listApplications);

export default router;
