import { IconAlert, IconBox } from "./Icon";

export function Loading({ label = "Đang tải..." }: { label?: string }) {
  return (
    <div className="state">
      <div className="spinner" />
      {label}
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="state">
      <div className="alert alert-error" style={{ display: "inline-flex", textAlign: "left" }}>
        <IconAlert />
        <span>{message}</span>
      </div>
    </div>
  );
}

export function Empty({ label = "Chưa có dữ liệu." }: { label?: string }) {
  return (
    <div className="state">
      <IconBox
        className="empty-glyph"
      />
      <p style={{ margin: "14px 0 0" }}>{label}</p>
    </div>
  );
}

/** Shimmering placeholder grid shown while cards are loading. */
export function SkeletonGrid({ count = 6, art = true }: { count?: number; art?: boolean }) {
  return (
    <div className="grid">
      {Array.from({ length: count }, (_, i) => (
        <div className="skeleton-card" key={i}>
          {art && <div className="skeleton skeleton-art" />}
          <div className="skeleton skeleton-line sk-tag" />
          <div className="skeleton skeleton-line sk-title" />
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-line sk-short" />
        </div>
      ))}
    </div>
  );
}

/** Placeholder for a single detail page. */
export function SkeletonDetail() {
  return (
    <div style={{ maxWidth: 720 }}>
      <div className="skeleton skeleton-line sk-tag" />
      <div className="skeleton skeleton-line" style={{ height: 34, width: "70%", marginBottom: 22 }} />
      <div className="skeleton skeleton-line" />
      <div className="skeleton skeleton-line" />
      <div className="skeleton skeleton-line sk-short" />
    </div>
  );
}
