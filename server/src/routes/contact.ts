import { Router } from "express";
import * as contactController from "../controllers/contactController";
import { requireAdmin } from "../middleware/requireAdmin";

const router = Router();

// Submissions carry name/email/phone — admin only to read or remove them.
router.get("/", requireAdmin, contactController.listContacts);
router.post("/", contactController.createContact);
router.delete("/:id", requireAdmin, contactController.deleteContact);

export default router;
