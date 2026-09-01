import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Job from "../models/Job";
import Application from "../models/Application";

export const listJobs = asyncHandler(async (_req: Request, res: Response) => {
  const jobs = await Job.find().sort({ postedAt: -1 });
  res.json(jobs);
});

export const getJob = asyncHandler(async (req: Request, res: Response) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    res.status(404).json({ error: "Job not found" });
    return;
  }
  res.json(job);
});

export const createJob = asyncHandler(async (req: Request, res: Response) => {
  const { title, location, type, requirements, benefits } = req.body;
  const job = await Job.create({ title, location, type, requirements, benefits });
  res.status(201).json(job);
});

export const updateJob = asyncHandler(async (req: Request, res: Response) => {
  const { title, location, type, requirements, benefits } = req.body;
  const job = await Job.findByIdAndUpdate(
    req.params.id,
    { title, location, type, requirements, benefits },
    { new: true, runValidators: true, omitUndefined: true }
  );
  if (!job) {
    res.status(404).json({ error: "Job not found" });
    return;
  }
  res.json(job);
});

export const deleteJob = asyncHandler(async (req: Request, res: Response) => {
  const job = await Job.findByIdAndDelete(req.params.id);
  if (!job) {
    res.status(404).json({ error: "Job not found" });
    return;
  }
  res.json(job);
});

export const applyToJob = asyncHandler(async (req: Request, res: Response) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    res.status(404).json({ error: "Job not found" });
    return;
  }

  const { fullName, email, phone, message } = req.body;
  if (!fullName || !email || !phone) {
    res.status(400).json({ error: "fullName, email and phone are required" });
    return;
  }

  const application = await Application.create({
    job: job._id,
    jobTitle: job.title,
    fullName,
    email,
    phone,
    message,
    cvFile: req.file ? `/uploads/cv/${req.file.filename}` : null,
  });

  res.status(201).json(application);
});

export const listApplications = asyncHandler(async (req: Request, res: Response) => {
  const applications = await Application.find({ job: req.params.id }).sort({
    appliedAt: -1,
  });
  res.json(applications);
});
