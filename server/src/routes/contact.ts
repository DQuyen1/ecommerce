import { Router } from "express";
import * as contactController from "../controllers/contactController";

const router = Router();

router.get("/", contactController.listContacts);
router.post("/", contactController.createContact);
router.delete("/:id", contactController.deleteContact);

export default router;
