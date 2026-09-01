import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { CATEGORIES, site } from "../config/site";
import { usePointerFx } from "../hooks/useMotion";
import {
  IconArrowRight,
  IconArrowUp,
  IconBox,
  IconMail,
  IconPhone,
  IconPin,
} from "./Icon";

function Wordmark() {
  return (
    <>
      <span className="logo-mark">
        <IconBox />
      </span>
      {site.logo.lead} <em>{site.logo.accent}</em>
    </>
  );
}

export default function Layout() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [progress, setProgress] = useState(0);

  // Cursor highlight on cards and magnetic drift on buttons, app-wide.
  usePointerFx();

  // Header treatment, reading progress and the back-to-top button all key off scroll.
  useEffect(() => {
    function onScroll() {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setStuck(scrolled > 12);
      setProgress(height > 0 ? Math.min(scrolled / height, 1) : 0);
    }

    // Seed after paint so the first read sees a settled layout.
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" style={{ ["--progress" as string]: progress }} />

      <header className={`site-header${stuck ? " is-stuck" : ""}`}>
        <div className="wrap">
          <NavLink to="/" className="logo">
            <Wordmark />
          </NavLink>

          <button
            type="button"
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-label="Mở menu"
            aria-controls="site-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>

          {/* Navigating closes the mobile menu. */}
          <nav
            id="site-nav"
            className={`nav${menuOpen ? " is-open" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            {site.nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {item.label}
              </NavLink>
            ))}
            <span className="nav-cta">
              <NavLink to={site.navCta.to} className="btn btn-sm">
                {site.navCta.label}
              </NavLink>
            </span>
          </nav>
        </div>
      </header>

      <main key={location.pathname} className="page">
        <Outlet />
      </main>

      {/* Closing call to action — redundant on the page it points at. */}
      {location.pathname !== site.ctaBand.primary.to && (
        <section className="cta-band">
          <span className="cta-glow" />
          <div className="wrap">
            <div className="eyebrow">{site.ctaBand.eyebrow}</div>
            <h2>{site.ctaBand.title}</h2>
            <p>{site.ctaBand.text}</p>
            <div className="cta-actions">
              <NavLink className="btn" to={site.ctaBand.primary.to}>
                {site.ctaBand.primary.label}
                <IconArrowRight />
              </NavLink>
              <a className="btn btn-ghost btn-on-dark" href={site.contact.phoneHref}>
                <IconPhone />
                {site.contact.phone}
              </a>
            </div>
          </div>
        </section>
      )}

      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <span className="logo">
                <Wordmark />
              </span>
              <p>{site.footer.about}</p>
            </div>

            <div>
              <h4>Liên Hệ</h4>
              <ul className="footer-list footer-list-icons">
                <li>
                  <IconPhone />
                  <a href={site.contact.phoneHref}>{site.contact.phone}</a>
                </li>
                <li>
                  <IconMail />
                  <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
                </li>
                <li>
                  <IconPin />
                  <span>{site.contact.address.join(" ")}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4>Sản Phẩm</h4>
              <ul className="footer-list">
                {CATEGORIES.map((category) => (
                  <li key={category.slug}>
                    <NavLink to={`/san-pham?category=${category.slug}`}>
                      {category.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4>{site.footer.supportTitle}</h4>
              <ul className="footer-list">
                {site.footer.support.map((item) => (
                  <li key={item.to}>
                    <NavLink to={item.to}>{item.label}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} {site.legalName}
            </span>
            {site.footer.note && <span>{site.footer.note}</span>}
          </div>
        </div>
      </footer>

      <button
        type="button"
        className={`to-top${stuck && progress > 0.12 ? " is-visible" : ""}`}
        aria-label="Lên đầu trang"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <IconArrowUp />
      </button>
    </>
  );
}
