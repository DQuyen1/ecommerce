import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../../adminAuth";

/** Gate for the `/admin/*` route tree. Re-checked on every navigation. */
export default function RequireAdmin({ children }: { children: ReactNode }) {
  if (!isLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
}
