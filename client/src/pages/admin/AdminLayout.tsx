import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { clearToken, getUsername } from "../../adminAuth";
import { site } from "../../config/site";
import {
  IconBox,
  IconClipboard,
  IconExternal,
  IconInbox,
  IconLogOut,
  IconMessage,
  IconUsers,
} from "../../components/Icon";

const NAV = [
  { to: "/admin/products", label: "Sản Phẩm", icon: IconBox },
  { to: "/admin/news", label: "Tin Tức", icon: IconClipboard },
  { to: "/admin/jobs", label: "Tuyển Dụng", icon: IconUsers },
  { to: "/admin/applications", label: "Đơn Ứng Tuyển", icon: IconInbox },
  { to: "/admin/contacts", label: "Liên Hệ", icon: IconMessage },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    clearToken();
    navigate("/admin/login", { replace: true });
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="logo-mark">
            <IconBox />
          </span>
          {site.logo.lead} <em>ADMIN</em>
        </div>

        <nav className="admin-nav">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <item.icon />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-foot">
          <span className="admin-whoami">Đăng nhập: {getUsername()}</span>
          <a href="/" target="_blank" rel="noreferrer">
            <IconExternal />
            Xem trang web
          </a>
          <button type="button" onClick={handleLogout}>
            <IconLogOut />
            Đăng xuất
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
