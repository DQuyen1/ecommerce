import { useState } from "react";
import { api } from "../../api";
import { useAsync } from "../../hooks/useAsync";
import { Empty, ErrorState, Loading } from "../../components/States";
import { IconTrash } from "../../components/Icon";
import { useAdminRedirectOnAuthError } from "../../hooks/useAdminGuard";

export default function AdminContacts() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [actionError, setActionError] = useState<string | null>(null);
  const { data, loading, error } = useAsync(() => api.admin.contacts.list(), [refreshKey]);
  useAdminRedirectOnAuthError(error ?? actionError);

  async function handleDelete(id: string, name: string) {
    if (!window.confirm(`Xóa liên hệ từ "${name}"? Không thể hoàn tác.`)) return;
    setActionError(null);
    try {
      await api.admin.contacts.remove(id);
      setRefreshKey((k) => k + 1);
    } catch (err) {
      setActionError((err as Error).message);
    }
  }

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>Liên Hệ</h1>
          <p>Thông tin gửi qua form liên hệ trên trang web.</p>
        </div>
      </div>

      {actionError && (
        <div className="alert alert-error" style={{ marginBottom: 18 }}>
          {actionError}
        </div>
      )}

      {loading && <Loading />}
      {error && <ErrorState message={error} />}
      {data && data.length === 0 && <Empty label="Chưa có liên hệ nào." />}

      {data && data.length > 0 && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Người gửi</th>
                <th>Liên hệ</th>
                <th>Lời nhắn</th>
                <th>Ngày gửi</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((contact) => (
                <tr key={contact.id}>
                  <td className="admin-col-title">{contact.name}</td>
                  <td className="admin-col-meta">
                    {contact.email}
                    {contact.phone && (
                      <>
                        <br />
                        {contact.phone}
                      </>
                    )}
                  </td>
                  <td className="admin-col-meta" style={{ maxWidth: 320 }}>
                    {contact.message}
                  </td>
                  <td className="admin-col-meta">
                    {new Date(contact.submittedAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td>
                    <div className="admin-actions">
                      <button
                        type="button"
                        className="admin-icon-btn is-danger"
                        aria-label="Xóa"
                        onClick={() => handleDelete(contact.id, contact.name)}
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
