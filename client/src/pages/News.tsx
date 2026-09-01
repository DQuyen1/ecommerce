import { Link, useSearchParams } from "react-router-dom";
import { api } from "../api";
import { useAsync } from "../hooks/useAsync";
import { site } from "../config/site";
import { Empty, ErrorState, SkeletonGrid } from "../components/States";
import Reveal from "../components/Reveal";
import { IconArrowLeft, IconArrowRight } from "../components/Icon";

const PAGE_SIZE = 6;

export default function News() {
  const [searchParams, setSearchParams] = useSearchParams();
  const topic = searchParams.get("topic") ?? "";
  const page = Math.max(Number(searchParams.get("page") ?? 1), 1);

  const topics = useAsync(() => api.news.topics(), []);
  const { data, loading, error } = useAsync(
    () => api.news.list({ topic: topic || undefined, page, limit: PAGE_SIZE }),
    [topic, page]
  );

  function update(next: { topic?: string; page?: number }) {
    const params: Record<string, string> = {};
    const nextTopic = next.topic ?? topic;
    const nextPage = next.page ?? 1;
    if (nextTopic) params.topic = nextTopic;
    if (nextPage > 1) params.page = String(nextPage);
    setSearchParams(params);
  }

  const totalPages = data ? Math.max(Math.ceil(data.total / data.limit), 1) : 1;

  return (
    <section className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <div className="eyebrow">{site.news.eyebrow}</div>
          <h2>{site.news.title}</h2>
          <p>{site.news.subtitle}</p>
        </Reveal>

        <Reveal className="filters">
          <button
            className={`chip ${topic === "" ? "active" : ""}`}
            onClick={() => update({ topic: "", page: 1 })}
          >
            Tất cả
          </button>
          {topics.data?.map((item) => (
            <button
              key={item}
              className={`chip ${topic === item ? "active" : ""}`}
              onClick={() => update({ topic: item, page: 1 })}
            >
              {item}
            </button>
          ))}
        </Reveal>

        {loading && <SkeletonGrid count={6} art={false} />}
        {error && <ErrorState message={error} />}
        {data && data.items.length === 0 && <Empty label={site.news.emptyLabel} />}
        {data && data.items.length > 0 && (
          <>
            <div className="grid">
              {data.items.map((article, index) => (
                <Reveal key={article.id} index={index % 3} variant="scale">
                  <Link to={`/tin-tuc/${article.slug}`} className="card">
                    <span className="tag">{article.topic}</span>
                    <h3 style={{ marginTop: 14 }}>{article.title}</h3>
                    <p>{article.content.slice(0, 120)}…</p>
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

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="btn btn-ghost btn-sm"
                  disabled={page <= 1}
                  onClick={() => update({ page: page - 1 })}
                >
                  <IconArrowLeft />
                  Trước
                </button>
                <span className="meta">
                  Trang {page} / {totalPages}
                </span>
                <button
                  className="btn btn-ghost btn-sm"
                  disabled={page >= totalPages}
                  onClick={() => update({ page: page + 1 })}
                >
                  Sau
                  <IconArrowRight />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
