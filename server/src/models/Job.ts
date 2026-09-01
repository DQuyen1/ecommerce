import mongoose, { Document, Schema } from "mongoose";
import { toJSONOptions } from "./toJSON";

export interface IJob extends Document {
  title: string;
  location: string;
  type: string;
  requirements: string;
  benefits: string;
  postedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true, trim: true },
    location: { type: String, default: "" },
    type: { type: String, default: "full-time" },
    requirements: { type: String, default: "" },
    benefits: { type: String, default: "" },
    postedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

jobSchema.set("toJSON", toJSONOptions);

export default mongoose.model<IJob>("Job", jobSchema);
