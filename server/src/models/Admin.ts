import mongoose, { Document, Schema } from "mongoose";
import { toJSONOptions } from "./toJSON";

export interface IAdmin extends Document {
  username: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

const adminSchema = new Schema<IAdmin>(
  {
    username: { type: String, required: true, unique: true, trim: true, lowercase: true },
    // Excluded by default — callers that need it must `.select("+passwordHash")`,
    // so a stray `Admin.find()` elsewhere in the codebase can never leak it.
    passwordHash: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

adminSchema.set("toJSON", toJSONOptions);

export default mongoose.model<IAdmin>("Admin", adminSchema);
