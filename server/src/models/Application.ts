import mongoose, { Document, Schema, Types } from "mongoose";
import { toJSONOptions } from "./toJSON";

export interface IApplication extends Document {
  job: Types.ObjectId;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  cvFile: string | null;
  appliedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema = new Schema<IApplication>(
  {
    job: { type: Schema.Types.ObjectId, ref: "Job", required: true, index: true },
    jobTitle: { type: String, required: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    message: { type: String, default: "" },
    cvFile: { type: String, default: null },
    appliedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

applicationSchema.set("toJSON", toJSONOptions);

export default mongoose.model<IApplication>("Application", applicationSchema);
