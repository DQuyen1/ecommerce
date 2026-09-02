import { useState } from "react";
import { Link } from "react-router-dom";
import { api, assetUrl } from "../../api";
import { useAsync } from "../../hooks/useAsync";
import { categoryLabel } from "../../config/site";
import { Empty, ErrorState, Loading } from "../../components/States";
import { IconBox, IconPencil, IconPlus, IconTrash } from "../../components/Icon";
import { useAdminRedirectOnAuthError } from "../../hooks/useAdminGuard";

export default function AdminProducts() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [actionError, setActionError] = useState<string | null>(null);
  const { data, loading, error } = useAsync(() => api.products.list(), [refreshKey]);
  useAdminRedirectOnAuthError(actionError);

  async function handleDelete(id: string, name: string) {
    if (!window.confirm(`Xóa sản phẩm "${name}"? Không thể hoàn tác.`)) return;
    setActionError(null);
    try {
      await api.admin.products.remove(id);
      setRefreshKey((k) => k + 1);
    } catch (err) {
      setActionError((err as Error).message);
    }
  }

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>Sản Phẩm</h1>
          <p>Danh mục sản phẩm hiển thị công khai trên trang web.</p>
        </div>
        <Link className="btn btn-sm" to="/admin/products/new">
          <IconPlus />
          Thêm Sản Phẩm
        </Link>
      </div>

      {actionError && (
        <div className="alert alert-error" style={{ marginBottom: 18 }}>
          {actionError}
        </div>
      )}

      {loading && <Loading />}
      {error && <ErrorState message={error} />}
      {data && data.length === 0 && <Empty label="Chưa có sản phẩm nào." />}

      {data && data.length > 0 && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Danh mục</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((product) => (
                <tr key={product.id}>
                  <td className="admin-col-title">
                    <div className="admin-row-main">
                      {product.images[0] ? (
                        <img
                          className="admin-thumb"
                          src={assetUrl(product.images[0])}
                          alt=""
                        />
                      ) : (
                        <span className="admin-thumb-fallback">
                          <IconBox />
                        </span>
                      )}
                      {product.name}
                    </div>
                  </td>
                  <td className="admin-col-meta">{categoryLabel(product.category)}</td>
                  <td>
                    <div className="admin-actions">
                      <Link
                        className="admin-icon-btn"
                        to={`/admin/products/${product.id}/edit`}
                        aria-label="Sửa"
                      >
                        <IconPencil />
                      </Link>
                      <button
                        type="button"
                        className="admin-icon-btn is-danger"
                        aria-label="Xóa"
                        onClick={() => handleDelete(product.id, product.name)}
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
