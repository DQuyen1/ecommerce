import { useState, type FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { api } from "../../api";
import { isLoggedIn, setSession } from "../../adminAuth";
import { IconAlert, IconBox, IconLock } from "../../components/Icon";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Already signed in — don't show the login form again.
  if (isLoggedIn()) {
    return <Navigate to="/admin" replace />;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const { token, username: loggedInAs } = await api.auth.login(username, password);
      setSession(token, loggedInAs);
      const from = (location.state as { from?: string } | null)?.from ?? "/admin";
      navigate(from, { replace: true });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="login-shell">
      <div className="login-card">
        <span className="logo-mark">
          <IconBox />
        </span>
        <h1>Quản Trị</h1>
        <p>Đăng nhập để quản lý sản phẩm, tin tức và tuyển dụng.</p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="username">Tên đăng nhập</label>
            <input
              id="username"
              required
              autoFocus
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="password">Mật khẩu</label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="alert alert-error">
              <IconAlert />
              <span>{error}</span>
            </div>
          )}

          <button className="btn" disabled={submitting} style={{ justifyContent: "center" }}>
            <IconLock />
            {submitting ? "Đang đăng nhập..." : "Đăng Nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}
