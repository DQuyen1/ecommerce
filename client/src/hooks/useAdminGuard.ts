import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Redirects to the admin login when a request comes back 401 — `adminRequest`
 * (api.ts) already clears the stored token in that case, so this just moves
 * the visitor off a page that can no longer do anything useful.
 */
export function useAdminRedirectOnAuthError(error: string | null | undefined) {
  const navigate = useNavigate();
  useEffect(() => {
    if (error === "Unauthorized") navigate("/admin/login", { replace: true });
  }, [error, navigate]);
}
