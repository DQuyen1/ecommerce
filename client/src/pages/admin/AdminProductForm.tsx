import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api, assetUrl } from "../../api";
import { CATEGORIES, type ProductCategory } from "../../config/site";
import { IconAlert, IconPlus, IconX } from "../../components/Icon";
import { useAdminRedirectOnAuthError } from "../../hooks/useAdminGuard";

export default function AdminProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState<ProductCategory>(CATEGORIES[0].slug);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const [loading, setLoading] = useState(isEdit);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useAdminRedirectOnAuthError(error);

  useEffect(() => {
    if (!id) return;
    let active = true;
    api.products
      .get(id)
      .then((product) => {
        if (!active) return;
        setName(product.name);
        setCategory(product.category);
        setDescription(product.description);
        setImages(product.images);
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

  async function handleImageSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);
    try {
      for (const file of Array.from(files)) {
        const { url } = await api.admin.uploadImage(file);
        setImages((prev) => [...prev, url]);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  function removeImage(url: string) {
    setImages((prev) => prev.filter((i) => i !== url));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = { name, category, description, images };
      if (id) {
        await api.admin.products.update(id, payload);
      } else {
        await api.admin.products.create(payload);
      }
      navigate("/admin/products");
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
          <h1>{isEdit ? "Sửa Sản Phẩm" : "Thêm Sản Phẩm"}</h1>
        </div>
      </div>

      <form className="form form-card admin-form-card" onSubmit={handleSubmit}>
        <div className="admin-form-grid">
          <div className="field">
            <label htmlFor="name">Tên sản phẩm *</label>
            <input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="field">
            <label htmlFor="category">Danh mục *</label>
            <select
              id="category"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value as ProductCategory)}
            >
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div className="field field-full">
            <label htmlFor="description">Mô tả</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="field field-full">
            <label>Hình ảnh</label>
            <div className="image-picker">
              {images.map((url) => (
                <div className="image-picker-item" key={url}>
                  <img src={assetUrl(url)} alt="" />
                  <button
                    type="button"
                    className="image-picker-remove"
                    aria-label="Xóa ảnh"
                    onClick={() => removeImage(url)}
                  >
                    <IconX />
                  </button>
                </div>
              ))}
              <label className="image-picker-add">
                <IconPlus />
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  disabled={uploading}
                  onChange={handleImageSelect}
                />
              </label>
            </div>
            {uploading && <p className="hint">Đang tải ảnh lên...</p>}
          </div>
        </div>

        {error && (
          <div className="alert alert-error">
            <IconAlert />
            <span>{error}</span>
          </div>
        )}

        <div className="admin-form-actions">
          <button className="btn" disabled={saving || uploading}>
            {saving ? "Đang lưu..." : "Lưu"}
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => navigate("/admin/products")}
          >
            Hủy
          </button>
        </div>
      </form>
    </>
  );
}
