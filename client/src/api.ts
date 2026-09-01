import type {
  Application,
  ApplyPayload,
  Article,
  Contact,
  ContactPayload,
  Job,
  Paginated,
  Product,
  ProductCategory,
} from "./types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export const API_ORIGIN = BASE_URL;

/**
 * Resolves an image path for display. Uploads are stored server-relative
 * (`/uploads/...`) and would otherwise resolve against the web origin instead of
 * the API, so they need the base prefixed. Absolute URLs pass through untouched.
 */
export function assetUrl(src: string): string {
  if (/^(https?:)?\/\//i.test(src) || src.startsWith("data:")) return src;
  return `${BASE_URL}${src.startsWith("/") ? "" : "/"}${src}`;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}/api${path}`, init);
  const body = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      body && typeof body === "object" && "error" in body
        ? String((body as { error: unknown }).error)
        : `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return body as T;
}

function jsonPost<T>(path: string, payload: unknown): Promise<T> {
  return request<T>(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export const api = {
  products: {
    list: (category?: ProductCategory | "") =>
      request<Product[]>(`/products${category ? `?category=${category}` : ""}`),
    get: (id: string) => request<Product>(`/products/${id}`),
    categories: () => request<ProductCategory[]>("/products/categories"),
  },

  news: {
    list: (params: { topic?: string; page?: number; limit?: number } = {}) => {
      const query = new URLSearchParams();
      if (params.topic) query.set("topic", params.topic);
      if (params.page) query.set("page", String(params.page));
      if (params.limit) query.set("limit", String(params.limit));
      const qs = query.toString();
      return request<Paginated<Article>>(`/news${qs ? `?${qs}` : ""}`);
    },
    get: (idOrSlug: string) => request<Article>(`/news/${idOrSlug}`),
    topics: () => request<string[]>("/news/topics"),
  },

  jobs: {
    list: () => request<Job[]>("/jobs"),
    get: (id: string) => request<Job>(`/jobs/${id}`),
    apply: (id: string, payload: ApplyPayload) => {
      const form = new FormData();
      form.append("fullName", payload.fullName);
      form.append("email", payload.email);
      form.append("phone", payload.phone);
      if (payload.message) form.append("message", payload.message);
      if (payload.cv) form.append("cv", payload.cv);
      return request<Application>(`/jobs/${id}/apply`, { method: "POST", body: form });
    },
  },

  contact: {
    create: (payload: ContactPayload) => jsonPost<Contact>("/contact", payload),
  },
};
