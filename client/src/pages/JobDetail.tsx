import { useRef, useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api";
import { useAsync } from "../hooks/useAsync";
import { site } from "../config/site";
import { ErrorState, SkeletonDetail } from "../components/States";
import Reveal from "../components/Reveal";
import {
  IconAlert,
  IconArrowLeft,
  IconCheckCircle,
  IconClipboard,
  IconGift,
  IconPin,
  IconSend,
} from "../components/Icon";

type Status = { kind: "idle" | "sending" | "ok" | "error"; message?: string };

export default function JobDetail() {
  const { id = "" } = useParams();
  const { data, loading, error } = useAsync(() => api.jobs.get(id), [id]);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const cvInputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus({ kind: "sending" });
    try {
      await api.jobs.apply(id, { fullName, email, phone, message, cv });
      setStatus({ kind: "ok", message: site.recruitment.applyForm.success });
      setFullName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setCv(null);
      if (cvInputRef.current) cvInputRef.current.value = "";
    } catch (err) {
      setStatus({ kind: "error", message: (err as Error).message });
    }
  }

  return (
    <>
      <div className="detail-hero">
        <div className="wrap">
          <Link to="/tuyen-dung" className="back-link">
            <IconArrowLeft />
            Quay lại tuyển dụng
          </Link>

          {data && (
            <>
              <span className="tag">{data.type}</span>
              <h1 style={{ marginTop: 16, maxWidth: "20ch" }}>{data.title}</h1>
              <p className="job-meta" style={{ margin: 0 }}>
                <IconPin />
                {data.location}
              </p>
            </>
          )}
        </div>
      </div>

      <section className="section" style={{ paddingTop: "clamp(32px, 5vw, 56px)" }}>
        <div className="wrap">
          {loading && <SkeletonDetail />}
          {error && <ErrorState message={error} />}
          {data && (
            <div className="job-layout">
              <div>
                {data.requirements && (
                  <Reveal className="detail-block">
                    <h3>
                      <IconClipboard />
                      Yêu cầu
                    </h3>
                    <p>{data.requirements}</p>
                  </Reveal>
                )}
                {data.benefits && (
                  <Reveal className="detail-block" index={1}>
                    <h3>
                      <IconGift />
                      Quyền lợi
                    </h3>
                    <p>{data.benefits}</p>
                  </Reveal>
                )}
              </div>

              <Reveal index={1}>
                <form className="form form-card" onSubmit={handleSubmit}>
                  <div>
                    <div className="eyebrow" style={{ marginBottom: 6 }}>
                      {site.recruitment.applyForm.eyebrow}
                    </div>
                    <h3 style={{ fontSize: "1.3rem", marginBottom: 4 }}>
                      {site.recruitment.applyForm.title}
                    </h3>
                    <p className="hint" style={{ margin: 0 }}>
                      {site.recruitment.applyForm.subtitle}
                    </p>
                  </div>

                  <div className="field">
                    <label htmlFor="fullName">Họ và tên *</label>
                    <input
                      id="fullName"
                      required
                      placeholder="Nguyễn Văn A"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Email *</label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="ban@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="phone">Số điện thoại *</label>
                    <input
                      id="phone"
                      required
                      placeholder="09xx xxx xxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="cv-input">Hồ sơ (CV)</label>
                    <input
                      id="cv-input"
                      ref={cvInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setCv(e.target.files?.[0] ?? null)}
                    />
                    <span className="hint">Chấp nhận PDF, DOC, DOCX — tối đa 5MB.</span>
                  </div>
                  <div className="field">
                    <label htmlFor="message">Lời nhắn</label>
                    <textarea
                      id="message"
                      placeholder="Giới thiệu ngắn gọn về bản thân..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  {status.kind === "ok" && (
                    <div className="alert alert-success">
                      <IconCheckCircle />
                      <span>{status.message}</span>
                    </div>
                  )}
                  {status.kind === "error" && (
                    <div className="alert alert-error">
                      <IconAlert />
                      <span>{status.message}</span>
                    </div>
                  )}

                  <div>
                    <button className="btn" disabled={status.kind === "sending"}>
                      {status.kind === "sending" ? "Đang gửi..." : "Gửi Hồ Sơ"}
                      {status.kind !== "sending" && <IconSend />}
                    </button>
                  </div>
                </form>
              </Reveal>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
