import { useState } from "react";
import { api, assetUrl } from "../../api";
import { useAsync } from "../../hooks/useAsync";
import { Empty, ErrorState, Loading } from "../../components/States";
import { IconDownload, IconTrash } from "../../components/Icon";
import { useAdminRedirectOnAuthError } from "../../hooks/useAdminGuard";

export default function AdminApplications() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [actionError, setActionError] = useState<string | null>(null);
  const { data, loading, error } = useAsync(() => api.admin.applications.list(), [refreshKey]);
  useAdminRedirectOnAuthError(error ?? actionError);

  async function handleDelete(id: string, name: string) {
    if (!window.confirm(`Xóa đơn ứng tuyển của "${name}"? Không thể hoàn tác.`)) return;
    setActionError(null);
    try {
      await api.admin.applications.remove(id);
      setRefreshKey((k) => k + 1);
    } catch (err) {
      setActionError((err as Error).message);
    }
  }

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>Đơn Ứng Tuyển</h1>
          <p>Hồ sơ ứng viên gửi qua trang tuyển dụng.</p>
        </div>
      </div>

      {actionError && (
        <div className="alert alert-error" style={{ marginBottom: 18 }}>
          {actionError}
        </div>
      )}

      {loading && <Loading />}
      {error && <ErrorState message={error} />}
      {data && data.length === 0 && <Empty label="Chưa có đơn ứng tuyển nào." />}

      {data && data.length > 0 && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Ứng viên</th>
                <th>Vị trí</th>
                <th>Liên hệ</th>
                <th>Ngày nộp</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((application) => (
                <tr key={application.id}>
                  <td className="admin-col-title">{application.fullName}</td>
                  <td className="admin-col-meta">{application.jobTitle}</td>
                  <td className="admin-col-meta">
                    {application.email}
                    <br />
                    {application.phone}
                  </td>
                  <td className="admin-col-meta">
                    {new Date(application.appliedAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td>
                    <div className="admin-actions">
                      {application.cvFile && (
                        <a
                          className="admin-icon-btn"
                          href={assetUrl(application.cvFile)}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Tải CV"
                        >
                          <IconDownload />
                        </a>
                      )}
                      <button
                        type="button"
                        className="admin-icon-btn is-danger"
                        aria-label="Xóa"
                        onClick={() => handleDelete(application.id, application.fullName)}
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
