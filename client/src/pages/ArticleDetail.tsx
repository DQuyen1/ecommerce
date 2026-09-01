import { Link, useParams } from "react-router-dom";
import { api } from "../api";
import { useAsync } from "../hooks/useAsync";
import { ErrorState, SkeletonDetail } from "../components/States";
import Reveal from "../components/Reveal";
import { IconArrowLeft } from "../components/Icon";

export default function ArticleDetail() {
  const { slug = "" } = useParams();
  const { data, loading, error } = useAsync(() => api.news.get(slug), [slug]);

  return (
    <>
      <div className="detail-hero">
        <div className="wrap">
          <Link to="/tin-tuc" className="back-link">
            <IconArrowLeft />
            Quay lại tin tức
          </Link>

          {data && (
            <>
              <span className="tag">{data.topic}</span>
              <h1 style={{ marginTop: 16, maxWidth: "22ch" }}>{data.title}</h1>
              <p className="meta" style={{ margin: 0 }}>
                Đăng ngày {new Date(data.publishedAt).toLocaleDateString("vi-VN")}
              </p>
            </>
          )}
        </div>
      </div>

      <section className="section" style={{ paddingTop: "clamp(32px, 5vw, 56px)" }}>
        <div className="wrap">
          {loading && <SkeletonDetail />}
          {error && <ErrorState message={error} />}
          {data && (
            <article className="prose">
              {data.content.split("\n").map((paragraph, index) => (
                <Reveal as="p" key={index} index={index}>
                  {paragraph}
                </Reveal>
              ))}
            </article>
          )}
        </div>
      </section>
    </>
  );
}
