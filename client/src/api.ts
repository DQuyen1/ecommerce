import { clearToken, getToken } from "./adminAuth";
import type {
  Application,
  ApplyPayload,
  Article,
  ArticlePayload,
  Contact,
  ContactPayload,
  Job,
  JobPayload,
  Paginated,
  Product,
  ProductCategory,
  ProductPayload,
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

async function readBody(res: Response): Promise<unknown> {
  return res.json().catch(() => null);
}

function errorMessage(body: unknown, status: number): string {
  return body && typeof body === "object" && "error" in body
    ? String((body as { error: unknown }).error)
    : `Request failed with status ${status}`;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}/api${path}`, init);
  const body = await readBody(res);
  if (!res.ok) throw new Error(errorMessage(body, res.status));
  return body as T;
}

function jsonPost<T>(path: string, payload: unknown): Promise<T> {
  return request<T>(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

/** Adds the admin bearer token; clears it on a 401 so the next navigation bounces to login. */
async function adminRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(`${BASE_URL}/api${path}`, {
    ...init,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  });
  const body = await readBody(res);
  if (res.status === 401) clearToken();
  if (!res.ok) throw new Error(errorMessage(body, res.status));
  return body as T;
}

function adminJson<T>(path: string, method: "POST" | "PUT", payload: unknown): Promise<T> {
  return adminRequest<T>(path, {
    method,
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

  auth: {
    login: (username: string, password: string) =>
      jsonPost<{ token: string; username: string }>("/auth/login", { username, password }),
  },

  /** Everything here requires the admin bearer token — see `adminAuth.ts`. */
  admin: {
    products: {
      create: (payload: ProductPayload) => adminJson<Product>("/products", "POST", payload),
      update: (id: string, payload: ProductPayload) =>
        adminJson<Product>(`/products/${id}`, "PUT", payload),
      remove: (id: string) => adminRequest<Product>(`/products/${id}`, { method: "DELETE" }),
    },

    news: {
      create: (payload: ArticlePayload) => adminJson<Article>("/news", "POST", payload),
      update: (id: string, payload: ArticlePayload) =>
        adminJson<Article>(`/news/${id}`, "PUT", payload),
      remove: (id: string) => adminRequest<Article>(`/news/${id}`, { method: "DELETE" }),
    },

    jobs: {
      create: (payload: JobPayload) => adminJson<Job>("/jobs", "POST", payload),
      update: (id: string, payload: JobPayload) => adminJson<Job>(`/jobs/${id}`, "PUT", payload),
      remove: (id: string) => adminRequest<Job>(`/jobs/${id}`, { method: "DELETE" }),
    },

    applications: {
      list: () => adminRequest<Application[]>("/applications"),
      remove: (id: string) =>
        adminRequest<Application>(`/applications/${id}`, { method: "DELETE" }),
    },

    contacts: {
      list: () => adminRequest<Contact[]>("/contact"),
      remove: (id: string) => adminRequest<Contact>(`/contact/${id}`, { method: "DELETE" }),
    },

    uploadImage: (file: File) => {
      const form = new FormData();
      form.append("image", file);
      return adminRequest<{ url: string }>("/uploads/image", { method: "POST", body: form });
    },
  },
};
