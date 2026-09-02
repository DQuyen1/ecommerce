import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api";
import { IconAlert } from "../../components/Icon";
import { useAdminRedirectOnAuthError } from "../../hooks/useAdminGuard";

export default function AdminJobForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Toàn thời gian");
  const [requirements, setRequirements] = useState("");
  const [benefits, setBenefits] = useState("");

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useAdminRedirectOnAuthError(error);

  useEffect(() => {
    if (!id) return;
    let active = true;
    api.jobs
      .get(id)
      .then((job) => {
        if (!active) return;
        setTitle(job.title);
        setLocation(job.location);
        setType(job.type);
        setRequirements(job.requirements);
        setBenefits(job.benefits);
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
      const payload = { title, location, type, requirements, benefits };
      if (id) {
        await api.admin.jobs.update(id, payload);
      } else {
        await api.admin.jobs.create(payload);
      }
      navigate("/admin/jobs");
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
          <h1>{isEdit ? "Sửa Vị Trí" : "Thêm Vị Trí"}</h1>
        </div>
      </div>

      <form className="form form-card admin-form-card" onSubmit={handleSubmit}>
        <div className="admin-form-grid">
          <div className="field field-full">
            <label htmlFor="title">Tên vị trí *</label>
            <input
              id="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="location">Địa điểm</label>
            <input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="type">Loại hình</label>
            <input id="type" value={type} onChange={(e) => setType(e.target.value)} />
          </div>

          <div className="field field-full">
            <label htmlFor="requirements">Yêu cầu</label>
            <textarea
              id="requirements"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
            />
          </div>

          <div className="field field-full">
            <label htmlFor="benefits">Quyền lợi</label>
            <textarea
              id="benefits"
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
            />
          </div>
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
          <button type="button" className="btn btn-ghost" onClick={() => navigate("/admin/jobs")}>
            Hủy
          </button>
        </div>
      </form>
    </>
  );
}
