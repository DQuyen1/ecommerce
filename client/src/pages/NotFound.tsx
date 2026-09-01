import { Link } from "react-router-dom";
import { site } from "../config/site";
import { IconArrowRight } from "../components/Icon";

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap state">
        <div className="notfound-code">404</div>
        <h2 style={{ marginTop: 8 }}>{site.notFound.title}</h2>
        <p style={{ maxWidth: "42ch", margin: "0 auto 28px" }}>{site.notFound.text}</p>
        <Link className="btn" to="/">
          {site.notFound.cta}
          <IconArrowRight />
        </Link>
      </div>
    </section>
  );
}
