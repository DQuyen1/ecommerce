import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api";
import { IconAlert } from "../../components/Icon";
import { useAdminRedirectOnAuthError } from "../../hooks/useAdminGuard";

export default function AdminNewsForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useAdminRedirectOnAuthError(error);

  useEffect(() => {
    if (!id) return;
    let active = true;
    api.news
      .get(id)
      .then((article) => {
        if (!active) return;
        setTitle(article.title);
        setTopic(article.topic);
        setContent(article.content);
        setLoading(false);
      })
      .catch((err: Error) => {
        if (active) {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [id]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = { title, topic, content };
      if (id) {
        await api.admin.news.update(id, payload);
      } else {
        await api.admin.news.create(payload);
      }
      navigate("/admin/news");
    } catch (err) {
      setError((err as Error).message);
      setSaving(false);
    }
  }

  if (loading) return <p className="meta">Đang tải...</p>;

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>{isEdit ? "Sửa Bài Viết" : "Thêm Bài Viết"}</h1>
        </div>
      </div>

      <form className="form form-card admin-form-card" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Tiêu đề *</label>
          <input id="title" required value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="topic">Chủ đề *</label>
          <input id="topic" required value={topic} onChange={(e) => setTopic(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="content">Nội dung *</label>
          <textarea
            id="content"
            required
            style={{ minHeight: 220 }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {error && (
          <div className="alert alert-error">
            <IconAlert />
            <span>{error}</span>
          </div>
        )}

        <div className="admin-form-actions">
          <button className="btn" disabled={saving}>
            {saving ? "Đang lưu..." : "Lưu"}
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => navigate("/admin/news")}>
            Hủy
          </button>
        </div>
      </form>
    </>
  );
}
