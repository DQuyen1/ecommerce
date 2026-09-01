import { useState, type FormEvent } from "react";
import { api } from "../api";
import { site } from "../config/site";
import Reveal from "../components/Reveal";
import {
  IconAlert,
  IconCheckCircle,
  IconMail,
  IconPhone,
  IconPin,
  IconSend,
} from "../components/Icon";

type Status = { kind: "idle" | "sending" | "ok" | "error"; message?: string };

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus({ kind: "sending" });
    try {
      await api.contact.create({ name, email, phone, message });
      setStatus({ kind: "ok", message: site.contactPage.success });
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err) {
      setStatus({ kind: "error", message: (err as Error).message });
    }
  }

  return (
    <section className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <div className="eyebrow">{site.contactPage.eyebrow}</div>
          <h2>{site.contactPage.title}</h2>
          <p>{site.contactPage.subtitle}</p>
        </Reveal>

        <div className="contact-layout">
          <Reveal variant="left">
            <a className="contact-card" href={site.contact.phoneHref}>
              <span className="contact-icon">
                <IconPhone />
              </span>
              <div>
                <h3>Điện thoại</h3>
                <p>{site.contact.phone}</p>
              </div>
            </a>

            <a className="contact-card" href={`mailto:${site.contact.email}`}>
              <span className="contact-icon">
                <IconMail />
              </span>
              <div>
                <h3>Email</h3>
                <p>{site.contact.email}</p>
              </div>
            </a>

            <div className="contact-card">
              <span className="contact-icon">
                <IconPin />
              </span>
              <div>
                <h3>Địa chỉ</h3>
                <p>
                  {site.contact.address.map((line, index) => (
                    <span key={line}>
                      {index > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal index={1}>
            <form className="form form-card" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="name">Họ và tên *</label>
                <input
                  id="name"
                  required
                  placeholder="Nguyễn Văn A"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                <label htmlFor="phone">Số điện thoại</label>
                <input
                  id="phone"
                  placeholder="09xx xxx xxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="message">Nội dung *</label>
                <textarea
                  id="message"
                  required
                  placeholder={site.contactPage.messagePlaceholder}
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
                  {status.kind === "sending" ? "Đang gửi..." : "Gửi Thông Tin"}
                  {status.kind !== "sending" && <IconSend />}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
