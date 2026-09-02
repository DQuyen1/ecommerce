import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api";
import { useAsync } from "../../hooks/useAsync";
import { Empty, ErrorState, Loading } from "../../components/States";
import { IconPencil, IconPlus, IconTrash } from "../../components/Icon";
import { useAdminRedirectOnAuthError } from "../../hooks/useAdminGuard";

export default function AdminJobs() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [actionError, setActionError] = useState<string | null>(null);
  const { data, loading, error } = useAsync(() => api.jobs.list(), [refreshKey]);
  useAdminRedirectOnAuthError(actionError);

  async function handleDelete(id: string, title: string) {
    if (!window.confirm(`Xóa vị trí "${title}"? Không thể hoàn tác.`)) return;
    setActionError(null);
    try {
      await api.admin.jobs.remove(id);
      setRefreshKey((k) => k + 1);
    } catch (err) {
      setActionError((err as Error).message);
    }
  }

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>Tuyển Dụng</h1>
          <p>Vị trí đang tuyển hiển thị công khai trên trang web.</p>
        </div>
        <Link className="btn btn-sm" to="/admin/jobs/new">
          <IconPlus />
          Thêm Vị Trí
        </Link>
      </div>

      {actionError && (
        <div className="alert alert-error" style={{ marginBottom: 18 }}>
          {actionError}
        </div>
      )}

      {loading && <Loading />}
      {error && <ErrorState message={error} />}
      {data && data.length === 0 && <Empty label="Chưa có vị trí tuyển dụng." />}

      {data && data.length > 0 && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Vị trí</th>
                <th>Địa điểm</th>
                <th>Loại hình</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((job) => (
                <tr key={job.id}>
                  <td className="admin-col-title">{job.title}</td>
                  <td className="admin-col-meta">{job.location}</td>
                  <td className="admin-col-meta">{job.type}</td>
                  <td>
                    <div className="admin-actions">
                      <Link
                        className="admin-icon-btn"
                        to={`/admin/jobs/${job.id}/edit`}
                        aria-label="Sửa"
                      >
                        <IconPencil />
                      </Link>
                      <button
                        type="button"
                        className="admin-icon-btn is-danger"
                        aria-label="Xóa"
                        onClick={() => handleDelete(job.id, job.title)}
                      >
                        <IconTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
