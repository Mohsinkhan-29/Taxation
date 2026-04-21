import { useState, useEffect, useRef } from "react";
import API from "../../api/api"; // adjust path if needed


const NAV_LINKS = [
  { label: "Home", id: "Home" },
  { label: "About", id: "About" },
  { label: "Services", id: "Services" },
  { label: "Insights", id: "TrustBar" },
  { label: "FAQ", id: "FAQ" },
];

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    const isMobile = window.innerWidth < 768;
    const offset = isMobile ? 450 : 100;
    const top = el.offsetTop - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
};



const SERVICES = [
  { label: "Income Tax Returns", id: "Process-Optimization" },
  { label: "Bookkeeping", id: "Financial-Advisory" },
  { label: "Audit & Assurance", id: "Digital-Strategy" },
  { label: "Business Advisory", id: "Business-Consulting"  },
];

const PARTNERS = [
  { abbr: "X", name: "Xero", bg: "#e8232a" },
  { abbr: "QB", name: "QuickBooks", bg: "#2ca01c" },
  { abbr: "ATO", name: "Iris", bg: "#1a2f5e", border: true },
  { abbr: "ASIC", name: "Fbr", bg: "transparent", border: true },
];

const SOCIALS = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path strokeLinecap="round" d="M12 8a4 4 0 100 8 4 4 0 000-8z" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "#",
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.name.trim() || !form.email.trim()) return;

  try {
    await API.post("/api/messages", {
      name: form.name,
      email: form.email,
      message: form.message,
    });

    setSent(true);
    setForm({ name: "", email: "", message: "" });

    setTimeout(() => setSent(false), 3500);
  } catch (err) {
    console.error("Message send failed:", err);
    alert("Failed to send message. Please try again later.");
  }
};

  return (
    <footer className="bg-primary-gradient"
    >

      {/* ── Top accent line ── */}
      <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, #f0c84a44, transparent)" }} />

      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* ── Col 1: Brand ── */}
        <div data-aos="fade-up" className="flex flex-col gap-6">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 w-fit">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-[15px] tracking-tight select-none bg-primary text-gold"
              style={{ border: "1px solid rgba(240,200,74,0.25)" }}>
              B2
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-[15px] text-white tracking-tight">Biz 2 Optima</span>
              <span className="text-[8.5px] font-semibold uppercase tracking-[2px] text-gold">
                Empowering Businesses
              </span>
            </div>
          </a>

          {/* Tagline */}
          <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
            Your trusted partner for accounting, tax returns, and business
            registration services across Australia, Pakistan and the UK.
          </p>

          {/* Partner badges */}
          <div className="flex flex-col gap-3">
            <p className="text-[9.5px] font-semibold uppercase tracking-[2.5px]" style={{ color: "rgba(255,255,255,0.3)" }}>
              Certified &amp; Integrated With
            </p>
            <div className="flex flex-wrap gap-2">
              {PARTNERS.map((p) => (
                <div
                  key={p.abbr + p.name}
                  className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-medium"
                  style={{
                    background: p.border ? "transparent" : p.bg + "22",
                    border: `1px solid ${p.border ? "rgba(255,255,255,0.15)" : p.bg + "55"}`,
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  <span
                    className="text-[10px] font-bold rounded px-1 py-0.5 leading-none"
                    style={{
                      background: p.border ? "rgba(255,255,255,0.12)" : p.bg,
                      color: "#fff",
                    }}
                  >
                    {p.abbr}
                  </span>
                  {p.name}
                </div>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-2 mt-1">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.5)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(240,200,74,0.15)";
                  e.currentTarget.style.borderColor = "rgba(240,200,74,0.4)";
                  e.currentTarget.style.color = "#f0c84a";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── Col 2: Navigate ── */}
        <div data-aos="fade-up" data-aos-delay="200" className="flex flex-col gap-5">
          <div>
            <h4 className="font-bold text-white text-[16px] mb-1">Navigate</h4>
            <div className="w-6 h-0.5 rounded-full bg-gold" />
          </div>
          <ul className="flex flex-col gap-0.5">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <button
                  onClick={() => { scrollToSection(l.id); }}
                  className="group flex items-center gap-2 py-2 text-[13.5px] transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                >
                  <span
                    className="block h-px transition-all duration-300 rounded-full group-hover:w-4"
                    style={{ width: "0px", background: "#f0c84a", minWidth: "0px" }}
                  />
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Col 3: Services ── */}
        <div data-aos="fade-up" data-aos-delay="400" className="flex flex-col gap-5">
          <div>
            <h4 className="font-bold text-white text-[16px] mb-1">Our Services</h4>
            <div className="w-6 h-0.5 rounded-full bg-gold" />
          </div>
          <ul className="flex flex-col gap-0.5">
            {SERVICES.map((l) => (
              <li key={l.label}>
                <a
                  onClick={() => { scrollToSection("Services");}}
                  className="group flex items-center gap-2 py-2 text-[13.5px] transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                >
                  <span
                    className="block h-px transition-all duration-300 rounded-full group-hover:w-4"
                    style={{ width: "0px", background: "#f0c84a", minWidth: "0px" }}
                  />
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Col 4: Contact form ── */}
        <div data-aos="fade-up" data-aos-delay="600" className="flex flex-col gap-5">
          <div>
            <h4 className="font-bold text-white text-[16px] mb-1">Get In Touch</h4>
            <div className="w-6 h-0.5 rounded-full bg-gold" />
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-2.5">
            <a
              href="tel:+611234567890"
              className="flex items-center gap-3 text-[13px] transition-colors"
              style={{ color: "rgba(255,255,255,0.55)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(240,200,74,0.1)", border: "1px solid rgba(240,200,74,0.2)" }}>
                <svg className="w-3.5 h-3.5" style={{ color: "#f0c84a" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              +61 123 456 7890
            </a>
            <a
              href="mailto:mk03433200153@gmail.com"
              className="flex items-center gap-3 text-[13px] transition-colors"
              style={{ color: "rgba(255,255,255,0.55)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(240,200,74,0.1)", border: "1px solid rgba(240,200,74,0.2)" }}>
                <svg className="w-3.5 h-3.5" style={{ color: "#f0c84a" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              info@biz2optima.com
            </a>
          </div>

          {/* Message form */}
          <div>
            <p className="text-[12px] font-semibold text-white mb-3">Send a Message</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
              <input
                type="text"
                value={form.name}
                onChange={update("name")}
                placeholder="Your name *"
                required
                className="w-full px-4 py-3 rounded-xl text-[13px] text-white placeholder:text-white/30 outline-none transition-all"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(240,200,74,0.5)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />
              <input
                type="email"
                value={form.email}
                onChange={update("email")}
                placeholder="Your email *"
                required
                className="w-full px-4 py-3 rounded-xl text-[13px] text-white placeholder:text-white/30 outline-none transition-all"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(240,200,74,0.5)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />
              <textarea
                rows={3}
                value={form.message}
                onChange={update("message")}
                placeholder="Your message..."
                className="w-full px-4 py-3 rounded-xl text-[13px] text-white placeholder:text-white/30 outline-none resize-none transition-all"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(240,200,74,0.5)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-[13.5px] transition-all duration-200 bg-gold text-primary"
                style={{
                  background: sent ? "#3d6b3d" : "",
                  color: sent ? "#fff" : "",
                }}
              >
                {sent ? "Message sent!" : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.3)" }}>
            © {new Date().getFullYear()} Biz 2 Optima Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Use", "Sitemap"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-[12px] transition-colors"
                style={{ color: "rgba(255,255,255,0.3)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}