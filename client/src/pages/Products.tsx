import { Link, useSearchParams } from "react-router-dom";
import { api, assetUrl } from "../api";
import { useAsync } from "../hooks/useAsync";
import {
  CATEGORIES,
  categoryIcon,
  categoryIndex,
  categoryLabel,
  site,
  type ProductCategory,
} from "../config/site";
import { Empty, ErrorState, SkeletonGrid } from "../components/States";
import Reveal from "../components/Reveal";
import { IconArrowRight } from "../components/Icon";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = (searchParams.get("category") ?? "") as ProductCategory | "";

  const { data, loading, error } = useAsync(
    () => api.products.list(category || undefined),
    [category]
  );

  function selectCategory(next: ProductCategory | "") {
    setSearchParams(next ? { category: next } : {});
  }

  return (
    <section className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <div className="eyebrow">{site.products.eyebrow}</div>
          <h2>{site.products.title}</h2>
          <p>{site.products.subtitle}</p>
        </Reveal>

        <Reveal className="filters">
          <button
            className={`chip ${category === "" ? "active" : ""}`}
            onClick={() => selectCategory("")}
          >
            Tất cả
          </button>
          {CATEGORIES.map((item) => (
            <button
              key={item.slug}
              className={`chip ${category === item.slug ? "active" : ""}`}
              onClick={() => selectCategory(item.slug)}
            >
              {item.label}
            </button>
          ))}
        </Reveal>

        {loading && <SkeletonGrid count={6} />}
        {error && <ErrorState message={error} />}
        {data && data.length === 0 && <Empty label={site.products.emptyLabel} />}
        {data && data.length > 0 && (
          <div className="grid">
            {data.map((product, index) => {
              const Glyph = categoryIcon(product.category);
              return (
                <Reveal key={product.id} index={index % 3} variant="scale">
                  <Link to={`/san-pham/${product.id}`} className="card">
                    <span
                      className="card-art"
                      data-variant={categoryIndex(product.category)}
                    >
                      {product.images[0] ? (
                        <img
                          src={assetUrl(product.images[0])}
                          alt={product.name}
                          className="card-photo"
                        />
                      ) : (
                        <Glyph />
                      )}
                    </span>
                    <span className="tag">{categoryLabel(product.category)}</span>
                    <h3 style={{ marginTop: 14 }}>{product.name}</h3>
                    <p>{product.description}</p>
                    <span className="card-arrow">
                      Chi tiết
                      <IconArrowRight />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
