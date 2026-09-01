import mongoose, { Document, Schema } from "mongoose";
import { toJSONOptions } from "./toJSON";

export interface IArticle extends Document {
  title: string;
  slug: string;
  topic: string;
  content: string;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const articleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    topic: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

articleSchema.pre("validate", function preValidate() {
  if (this.title && (!this.slug || this.isModified("title"))) {
    this.slug = slugify(this.title);
  }
});

articleSchema.set("toJSON", toJSONOptions);

export default mongoose.model<IArticle>("Article", articleSchema);
