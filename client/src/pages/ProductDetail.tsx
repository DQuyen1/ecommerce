import { Link, useParams } from "react-router-dom";
import { api, assetUrl } from "../api";
import { useAsync } from "../hooks/useAsync";
import { categoryLabel, site } from "../config/site";
import { ErrorState, SkeletonDetail } from "../components/States";
import Reveal from "../components/Reveal";
import { IconArrowLeft, IconArrowRight } from "../components/Icon";

export default function ProductDetail() {
  const { id = "" } = useParams();
  const { data, loading, error } = useAsync(() => api.products.get(id), [id]);

  return (
    <section className="section">
      <div className="wrap">
        <Link to="/san-pham" className="back-link">
          <IconArrowLeft />
          Quay lại sản phẩm
        </Link>

        {loading && <SkeletonDetail />}
        {error && <ErrorState message={error} />}
        {data && (
          <>
            <Reveal>
              <span className="tag">{categoryLabel(data.category)}</span>
              <h1 style={{ marginTop: 16 }}>{data.name}</h1>
              <p className="prose">{data.description}</p>
            </Reveal>

            {data.images.length > 0 && (
              <div className="gallery">
                {data.images.map((src, index) => (
                  <Reveal key={src} index={index} variant="scale">
                    <img src={assetUrl(src)} alt={data.name} loading="lazy" />
                  </Reveal>
                ))}
              </div>
            )}

            <Reveal style={{ marginTop: 40 }}>
              <Link className="btn" to="/lien-he">
                {site.products.detailCta}
                <IconArrowRight />
              </Link>
            </Reveal>
          </>
        )}
      </div>
    </section>
  );
}
