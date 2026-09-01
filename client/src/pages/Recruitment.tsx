import { Link } from "react-router-dom";
import { api } from "../api";
import { useAsync } from "../hooks/useAsync";
import { site } from "../config/site";
import { Empty, ErrorState, SkeletonGrid } from "../components/States";
import Reveal from "../components/Reveal";
import { IconArrowRight, IconPin, IconUsers } from "../components/Icon";

const { hero, benefitsSection, benefits, jobsSection, emptyLabel } = site.recruitment;

export default function Recruitment() {
  const { data, loading, error } = useAsync(() => api.jobs.list(), []);

  return (
    <>
      <section className="hero hero-center">
        <span className="hero-aurora hero-aurora-1" />
        <span className="hero-aurora hero-aurora-2" />
        <span className="hero-mesh" />

        <div className="wrap">
          <div className="hero-enter">
            <div className="eyebrow">{hero.eyebrow}</div>
            <h1>{hero.title}</h1>
            <p>{hero.subtitle}</p>
            <div className="hero-actions">
              <a className="btn" href="#vi-tri">
                {hero.cta}
                <IconArrowRight />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <div className="eyebrow">{benefitsSection.eyebrow}</div>
            <h2>{benefitsSection.title}</h2>
          </Reveal>

          <ul className="check-list grid grid-2">
            {benefits.map((benefit, index) => (
              <Reveal as="li" key={benefit} index={index % 3}>
                <span>{benefit}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-soft" id="vi-tri">
        <div className="wrap">
          <Reveal className="section-head">
            <div className="eyebrow">{jobsSection.eyebrow}</div>
            <h2>{jobsSection.title}</h2>
          </Reveal>

          {loading && <SkeletonGrid count={3} art={false} />}
          {error && <ErrorState message={error} />}
          {data && data.length === 0 && <Empty label={emptyLabel} />}
          {data && data.length > 0 && (
            <div className="grid">
              {data.map((job, index) => (
                <Reveal key={job.id} index={index % 3} variant="scale">
                  <Link to={`/tuyen-dung/${job.id}`} className="card">
                    <span className="tag">{job.type}</span>
                    <h3 style={{ marginTop: 14 }}>{job.title}</h3>
                    <p className="job-meta">
                      <IconPin />
                      {job.location}
                    </p>
                    <p className="meta" style={{ marginTop: 10 }}>
                      <IconUsers
                        style={{
                          width: 14,
                          height: 14,
                          display: "inline",
                          verticalAlign: "-2px",
                          marginRight: 6,
                        }}
                      />
                      Đăng ngày {new Date(job.postedAt).toLocaleDateString("vi-VN")}
                    </p>
                    <span className="card-arrow">
                      Ứng tuyển
                      <IconArrowRight />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
