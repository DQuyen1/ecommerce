import type { ProductCategory } from "./config/site";

// Product categories live in `config/site.ts` alongside the rest of the
// company-specific content; this file describes the API response shapes.
export type { ProductCategory };

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  topic: string;
  content: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Paginated<T> {
  total: number;
  page: number;
  limit: number;
  items: T[];
}

export interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
  requirements: string;
  benefits: string;
  postedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  job: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  cvFile: string | null;
  appliedAt: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: string;
}

export interface ApplyPayload {
  fullName: string;
  email: string;
  phone: string;
  message?: string;
  cv?: File | null;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

/* ------------------------------------------------------------------
   Admin dashboard payloads — writes always send the full object, so
   these mirror the read shapes minus id/timestamps.
   ------------------------------------------------------------------ */

export interface ProductPayload {
  name: string;
  category: ProductCategory;
  description: string;
  images: string[];
}

export interface ArticlePayload {
  title: string;
  topic: string;
  content: string;
}

export interface JobPayload {
  title: string;
  location: string;
  type: string;
  requirements: string;
  benefits: string;
}
