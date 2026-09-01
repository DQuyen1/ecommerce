import { Router } from "express";
import * as jobController from "../controllers/jobController";
import { cvUpload } from "../middleware/upload";

const router = Router();

router.get("/", jobController.listJobs);
router.get("/:id", jobController.getJob);
router.post("/", jobController.createJob);
router.put("/:id", jobController.updateJob);
router.delete("/:id", jobController.deleteJob);

router.post("/:id/apply", cvUpload.single("cv"), jobController.applyToJob);
router.get("/:id/applications", jobController.listApplications);

export default router;
