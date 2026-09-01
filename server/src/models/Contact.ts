import mongoose, { Document, Schema } from "mongoose";
import { toJSONOptions } from "./toJSON";

export interface IContact extends Document {
  name: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, default: "" },
    message: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

contactSchema.set("toJSON", toJSONOptions);

export default mongoose.model<IContact>("Contact", contactSchema);
