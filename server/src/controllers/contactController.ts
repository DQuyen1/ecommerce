import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Contact from "../models/Contact";

export const listContacts = asyncHandler(async (_req: Request, res: Response) => {
  const contacts = await Contact.find().sort({ submittedAt: -1 });
  res.json(contacts);
});

export const createContact = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, phone, message } = req.body;
  const contact = await Contact.create({ name, email, phone, message });
  res.status(201).json(contact);
});

export const deleteContact = asyncHandler(async (req: Request, res: Response) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) {
    res.status(404).json({ error: "Contact not found" });
    return;
  }
  res.json(contact);
});
