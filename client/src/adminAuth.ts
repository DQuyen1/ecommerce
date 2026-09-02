const TOKEN_KEY = "admin_token";
const USERNAME_KEY = "admin_username";

/** Session for the logged-in admin — a 7-day JWT from `/auth/login`, plus the
 * username it belongs to (server returns both; kept together for display). */
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUsername(): string | null {
  return localStorage.getItem(USERNAME_KEY);
}

export function setSession(token: string, username: string): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USERNAME_KEY, username);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USERNAME_KEY);
}

export function isLoggedIn(): boolean {
  return getToken() !== null;
}
