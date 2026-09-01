import mongoose, { Document, Schema } from "mongoose";
import { toJSONOptions } from "./toJSON";
import { CATEGORIES, ProductCategory } from "../config/catalog";

export { CATEGORIES };
export type { ProductCategory };

export interface IProduct extends Document {
  name: string;
  category: ProductCategory;
  description: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, enum: CATEGORIES },
    description: { type: String, default: "" },
    images: { type: [String], default: [] },
  },
  { timestamps: true }
);

productSchema.set("toJSON", toJSONOptions);

export default mongoose.model<IProduct>("Product", productSchema);
