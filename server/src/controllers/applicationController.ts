import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Application from "../models/Application";

/** Every application across every job — the per-job listing lives on jobController. */
export const listAllApplications = asyncHandler(async (_req: Request, res: Response) => {
  const applications = await Application.find().sort({ appliedAt: -1 });
  res.json(applications);
});

export const deleteApplication = asyncHandler(async (req: Request, res: Response) => {
  const application = await Application.findByIdAndDelete(req.params.id);
  if (!application) {
    res.status(404).json({ error: "Application not found" });
    return;
  }
  res.json(application);
});
