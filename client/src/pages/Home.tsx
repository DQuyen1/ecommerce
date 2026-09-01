import { Link } from "react-router-dom";
import { api } from "../api";
import { useAsync } from "../hooks/useAsync";
import { useCountUp } from "../hooks/useReveal";
import { useTilt } from "../hooks/useMotion";
import { CATEGORIES, site } from "../config/site";
import Reveal from "../components/Reveal";
import { SplitText } from "../components/Motion";
import { SkeletonGrid } from "../components/States";
import {
  HeroArtwork,
  IconArrowRight,
  IconQuote,
  IconStar,
  ShowcaseArtwork,
} from "../components/Icon";

const {
  hero,
  marquee,
  categoriesSection,
  stats,
  valuesSection,
  values,
  processSection,
  process,
  showcase,
  testimonialsSection,
  testimonials,
  newsSection,
} = site.home;

// Word offsets so the three runs of the headline stagger as one sentence.
const words = (text: string) => text.trim().split(/\s+/).length;
const ACCENT_AT = words(hero.title);
const TAIL_AT = ACCENT_AT + words(hero.titleAccent);

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, value: shown } = useCountUp(value);

  return (
    <div className="stat" ref={ref}>
      <div className="stat-value">
        {shown.toLocaleString("vi-VN")}
        {suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function Home() {
  const news = useAsync(() => api.news.list({ limit: 3 }), []);
  const artRef = useTilt<HTMLDivElement>();

  return (
    <>
      {/* ---------------------------------------------------------- hero */}
      <section className="hero">
        <span className="hero-aurora hero-aurora-1" />
        <span className="hero-aurora hero-aurora-2" />
        <span className="hero-aurora hero-aurora-3" />
        <span className="hero-mesh" />

        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-enter">
              <div className="eyebrow">{hero.eyebrow}</div>
              <h1 className="split">
                <SplitText text={hero.title} />
                <SplitText text={hero.titleAccent} start={ACCENT_AT} className="accent" />
                <SplitText text={hero.titleTail} start={TAIL_AT} />
              </h1>
              <p>{hero.subtitle}</p>
              <div className="hero-actions">
                <Link className="btn" to={hero.primaryCta.to}>
                  {hero.primaryCta.label}
                  <IconArrowRight />
                </Link>
                <Link className="btn btn-ghost" to={hero.secondaryCta.to}>
                  {hero.secondaryCta.label}
                </Link>
              </div>
              <div className="hero-badges">
                {hero.badges.map((badge) => (
                  <span className="badge" key={badge.label}>
                    <badge.icon />
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="hero-art" ref={artRef}>
              <HeroArtwork />
            </div>
          </div>
        </div>
      </section>

      <div className="marquee">
        <div className="marquee-track">
          {[...marquee, ...marquee].map((item, index) => (
            <span className="marquee-item" key={index}>
              <item.icon />
              {item.label}
            </span>
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------- categories */}
      <section className="section">
        <span className="section-deco section-deco-right" />
        <div className="wrap">
          <Reveal className="section-head">
            <div className="eyebrow">{categoriesSection.eyebrow}</div>
            <h2>{categoriesSection.title}</h2>
            <p>{categoriesSection.subtitle}</p>
          </Reveal>

          <div className="grid">
            {CATEGORIES.map((category, index) => (
              <Reveal key={category.slug} index={index} variant="scale">
                <Link to={`/san-pham?category=${category.slug}`} className="card">
                  <span className="card-art" data-variant={index}>
                    <category.icon />
                  </span>
                  <h3>{category.label}</h3>
                  <p>Xem các mẫu thuộc nhóm {category.label}.</p>
                  <span className="card-arrow">
                    Khám phá
                    <IconArrowRight />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ showcase */}
      <section className="section section-soft showcase">
        <div className="wrap">
          <div className="showcase-grid">
            <Reveal variant="left">
              <div className="eyebrow">{showcase.eyebrow}</div>
              <h2>{showcase.title}</h2>
              <p className="lede">{showcase.text}</p>

              <ul className="check-list check-list-plain">
                {showcase.points.map((point, index) => (
                  <Reveal as="li" key={point} index={index}>
                    <span>{point}</span>
                  </Reveal>
                ))}
              </ul>

              <Link className="btn showcase-cta" to={showcase.cta.to}>
                {showcase.cta.label}
                <IconArrowRight />
              </Link>
            </Reveal>

            <Reveal className="showcase-art" index={1}>
              <ShowcaseArtwork />
            </Reveal>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- stats */}
      <section className="section stats">
        <div className="wrap">
          <div className="grid">
            {stats.map((stat) => (
              <Stat key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- process */}
      <section className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <div className="eyebrow">{processSection.eyebrow}</div>
            <h2>{processSection.title}</h2>
            <p>{processSection.subtitle}</p>
          </Reveal>

          <ol className="process">
            {process.map((step, index) => (
              <Reveal as="li" className="step" key={step.title} index={index}>
                <span className="step-num">{String(index + 1).padStart(2, "0")}</span>
                <span className="step-icon">
                  <step.icon />
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* -------------------------------------------------------- values */}
      <section className="section section-soft">
        <span className="section-deco section-deco-left" />
        <div className="wrap">
          <Reveal className="section-head">
            <div className="eyebrow">{valuesSection.eyebrow}</div>
            <h2>{valuesSection.title}</h2>
          </Reveal>

          <ul className="check-list grid grid-2">
            {values.map((value, index) => (
              <Reveal as="li" key={value.title} index={index}>
                <div>
                  <strong>{value.title}</strong>
                  <p className="check-text">{value.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* -------------------------------------------------- testimonials */}
      <section className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <div className="eyebrow">{testimonialsSection.eyebrow}</div>
            <h2>{testimonialsSection.title}</h2>
          </Reveal>

          <div className="grid">
            {testimonials.map((item, index) => (
              <Reveal key={item.name} index={index} variant="scale">
                <figure className="quote-card">
                  <IconQuote className="quote-mark" />
                  <span className="quote-stars">
                    {Array.from({ length: 5 }, (_, i) => (
                      <IconStar key={i} />
                    ))}
                  </span>
                  <blockquote>{item.quote}</blockquote>
                  <figcaption>
                    <span className="quote-avatar" aria-hidden="true">
                      {item.name.trim().slice(-1)}
                    </span>
                    <span>
                      <strong>{item.name}</strong>
                      <span className="meta">{item.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- news */}
      <section className="section section-soft">
        <div className="wrap">
          <Reveal className="section-head">
            <div className="eyebrow">{newsSection.eyebrow}</div>
            <h2>{newsSection.title}</h2>
            <p>{newsSection.subtitle}</p>
          </Reveal>

          {news.loading && <SkeletonGrid count={3} art={false} />}
          {news.error && <div className="state">Không tải được tin tức.</div>}
          {news.data && (
            <>
              <div className="grid">
                {news.data.items.map((article, index) => (
                  <Reveal key={article.id} index={index} variant="scale">
                    <Link to={`/tin-tuc/${article.slug}`} className="card">
                      <span className="tag">{article.topic}</span>
                      <h3 style={{ marginTop: 14 }}>{article.title}</h3>
                      <p>{article.content.slice(0, 110)}…</p>
                      <p className="meta" style={{ marginTop: 14 }}>
                        {new Date(article.publishedAt).toLocaleDateString("vi-VN")}
                      </p>
                      <span className="card-arrow">
                        Đọc tiếp
                        <IconArrowRight />
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>

              <Reveal style={{ textAlign: "center", marginTop: 44 }}>
                <Link className="btn btn-ghost" to="/tin-tuc">
                  {newsSection.cta}
                  <IconArrowRight />
                </Link>
              </Reveal>
            </>
          )}
        </div>
      </section>
    </>
  );
}
