import { useState } from "react";

const SERVICES = [
  {
    id: "Business-Consulting",   // ✅ was "tax"
    title: "Tax Consultancy & Company Services",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l2 2 4-4M7 4H4a1 1 0 00-1 1v15a1 1 0 001 1h16a1 1 0 001-1V5a1 1 0 00-1-1h-3M9 4h6a1 1 0 011 1v0a1 1 0 01-1 1H9a1 1 0 01-1-1v0a1 1 0 011-1z" />
      </svg>
    ),
    color: "from-[#1a2f5e] to-[#2d4a8a]",
    accent: "#1a2f5e",
    lightBg: "#e8edf5",
    aosDelay: 0,
    items: ["Income Tax Services", "Company Registration", "Sales Tax Services", "Other Related Services"],
    detail: {
      heading: "Tax Consultancy & Company Services",
      description: "Our expert tax consultants provide end-to-end solutions for individuals and businesses. From filing income tax returns to registering your company, we handle all compliance so you can focus on growth.",
      highlights: [
        { label: "Tax Filing", value: "500+ clients" },
        { label: "Registrations", value: "200+ done" },
        { label: "Success Rate", value: "98%" },
      ],
    },
  },
  {
    id: "Digital-Strategy",      // ✅ was "accounting"
    title: "Accounting",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: "from-[#3d6b3d] to-[#5a9c5a]",
    accent: "#3d6b3d",
    lightBg: "#e8f2e8",
    aosDelay: 200,
    items: ["Book Keeping", "Reconciliation", "Preparation For Financial Statements", "Other Accounting Services"],
    detail: {
      heading: "Accounting",
      description: "Accurate, timely, and transparent accounting services tailored to your business size and industry. We maintain your books meticulously so your financial picture is always crystal clear.",
      highlights: [
        { label: "Books Managed", value: "1000+" },
        { label: "Accuracy", value: "99.9%" },
        { label: "Industries", value: "15+" },
      ],
    },
  },
  {
    id: "Process-Optimization",  // ✅ was "audit"
    title: "Audit & Assurance",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: "from-[#7c4a1a] to-[#b8722a]",
    accent: "#7c4a1a",
    lightBg: "#f5ede4",
    aosDelay: 400,
    items: ["Internal Audit", "External Audit", "Compliance Review", "Risk Assessment"],
    detail: {
      heading: "Audit & Assurance",
      description: "Independent and objective audit services that give stakeholders confidence in your financial reporting. Our rigorous methodology identifies risks and strengthens internal controls.",
      highlights: [
        { label: "Audits Done", value: "300+" },
        { label: "Risk Flags", value: "Zero missed" },
        { label: "Compliance", value: "100%" },
      ],
    },
  },
  {
    id: "Financial-Advisory",    // ✅ was "advisory"
    title: "Business Advisory",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    color: "from-[#5a1a5a] to-[#8a2a8a]",
    accent: "#5a1a5a",
    lightBg: "#f0e8f0",
    aosDelay: 600,
    items: ["Business Strategy", "Financial Planning", "Investment Advisory", "Growth Consulting"],
    detail: {
      heading: "Business Advisory",
      description: "Strategic advisory services that help you navigate complex business decisions with clarity. We combine financial expertise with market intelligence to drive sustainable growth.",
      highlights: [
        { label: "Clients Advised", value: "150+" },
        { label: "Avg. Growth", value: "32%" },
        { label: "Years Exp.", value: "10+" },
      ],
    },
  },
];

// Extracted detail panel so it can be reused in both mobile and desktop layouts
function DetailPanel({ service, onClose }) {
  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ borderColor: service.lightBg }}
    >
      {/* Panel header strip */}
      <div
        className={`bg-gradient-to-r ${service.color} px-8 py-4 flex items-center justify-between`}
      >
        <div className="flex items-center gap-3 text-white">
          <div className="w-8 h-8 text-white opacity-80">{service.icon}</div>
          <span className="font-bold text-[15px] tracking-tight">
            {service.detail.heading}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Panel body */}
      <div
        className="p-8 grid md:grid-cols-3 gap-8 items-start"
        style={{ background: service.lightBg }}
      >
        {/* Description */}
        <div className="md:col-span-2">
          <p className="text-[14.5px] text-[#374151] leading-relaxed mb-6">
            {service.detail.description}
          </p>
          <ul className="grid grid-cols-2 gap-3">
            {service.items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-[13px] text-[#1a2035] font-medium"
              >
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: service.accent }}
                >
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Stats */}
        <div className="flex flex-col gap-4">
          {service.detail.highlights.map((h) => (
            <div
              key={h.label}
              className="bg-white rounded-xl px-5 py-4 border border-white shadow-sm"
            >
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9ca3af] mb-1">
                {h.label}
              </p>
              <p className="text-2xl font-bold" style={{ color: service.accent }}>
                {h.value}
              </p>
            </div>
          ))}

          <a
            href="https://wa.me/923342844244"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 text-center text-[13px] font-semibold text-white py-3 px-5 rounded-xl transition-opacity hover:opacity-90"
            style={{ background: service.accent }}
          >
            Get a Free Consultation
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [active, setActive] = useState(null);

  const activeService = SERVICES.find((s) => s.id === active);

  return (
    <section id="Services" className="bg-light py-20 px-6 md:px-12 lg:px-24">
      {/* Header */}
      <div data-aos="fade-up" className="text-center mb-14">
        <p className="text-xs font-semibold uppercase tracking-[3px] text-gold mb-3">
          What we offer
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a2035] mb-4 tracking-tight">
          Our Services
        </h2>
        <p className="text-[#6b7280] text-[15px] max-w-2xl mx-auto leading-relaxed">
          Comprehensive financial and business solutions tailored to help you
          grow, stay compliant, and make smarter decisions.
        </p>
        <div className="flex items-center justify-center gap-2 mt-5">
          <span className="block w-8 h-0.5 bg-gold" />
          <span className="block w-12 h-1 rounded-full bg-primary" />
          <span className="block w-8 h-0.5 bg-gold" />
        </div>
      </div>

      {/* ── MOBILE layout (< sm): cards stacked, detail injected after active card ── */}
      <div className="flex flex-col gap-5 max-w-6xl mx-auto sm:hidden">
        {SERVICES.map((svc) => {
          const isActive = active === svc.id;
          return (
            <div
              key={svc.id}
              id={svc.id}
            >
              {/* Card */}
              <button
                onClick={() => setActive(isActive ? null : svc.id)}
                className={`w-full group text-left rounded-2xl border transition-all duration-300 overflow-hidden focus:outline-none ${isActive
                  ? "border-transparent shadow-2xl scale-[1.02]"
                  : "border-gray-200 hover:border-transparent hover:shadow-xl hover:scale-[1.02] bg-white"
                  }`}
              >
                <div className={`bg-gradient-to-br ${svc.color} p-6 flex flex-col gap-3 transition-all duration-300 h-[150px]`}>
                  <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center text-white">
                    {svc.icon}
                  </div>
                  <h3 className="text-white font-bold text-[15px] leading-snug">
                    {svc.title}
                  </h3>
                </div>

                <div className={`p-5 transition-colors duration-300 ${isActive ? "bg-white" : "bg-[#f9fafb] group-hover:bg-white"}`}>
                  <ul className="space-y-2.5">
                    {svc.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[13px] text-[#374151]">
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: svc.accent }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div
                    className="mt-5 flex items-center gap-1.5 text-[12px] font-semibold transition-colors duration-200"
                    style={{ color: svc.accent }}
                  >
                    <span>{isActive ? "Close details" : "View details"}</span>
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${isActive ? "rotate-180" : "group-hover:translate-y-0.5"}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Detail panel injected right below this card on mobile */}
              <div
                className={`transition-all duration-500 overflow-hidden ${isActive ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
                  }`}
              >
                {isActive && (
                  <DetailPanel service={svc} onClose={() => setActive(null)} />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── DESKTOP layout (sm+): original 2-col / 4-col grid + panel below all cards ── */}
      <div data-aos="fade-up" className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
        {SERVICES.map((svc) => {
          const isActive = active === svc.id;
          return (
            <button
              id={svc.id}
              data-aos-delay={svc.aosDelay}
              key={svc.id}
              onClick={() => setActive(isActive ? null : svc.id)}
              className={`scroll-mt-28 group text-left rounded-2xl border transition-all duration-300 overflow-hidden focus:outline-none ${isActive
                ? "border-transparent shadow-2xl scale-[1.02]"
                : "border-gray-200 hover:border-transparent hover:shadow-xl hover:scale-[1.02] bg-white"
                }`}
            >
              <div className={`bg-gradient-to-br ${svc.color} p-6 flex flex-col gap-3 transition-all duration-300 h-[150px]`}>
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center text-white">
                  {svc.icon}
                </div>
                <h3 className="text-white font-bold text-[15px] leading-snug">
                  {svc.title}
                </h3>
              </div>

              <div className={`p-5 transition-colors duration-300 ${isActive ? "bg-white" : "bg-[#f9fafb] group-hover:bg-white"}`}>
                <ul className="space-y-2.5">
                  {svc.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[13px] text-[#374151]">
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: svc.accent }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <div
                  className="mt-5 flex items-center gap-1.5 text-[12px] font-semibold transition-colors duration-200"
                  style={{ color: svc.accent }}
                >
                  <span>{isActive ? "Close details" : "View details"}</span>
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${isActive ? "rotate-180" : "group-hover:translate-y-0.5"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Desktop detail panel — below all cards */}
      <div
        className={`hidden sm:block max-w-6xl mx-auto transition-all duration-500 overflow-hidden ${activeService ? "max-h-[600px] opacity-100 mt-6" : "max-h-0 opacity-0 mt-0"
          }`}
      >
        {activeService && (
          <DetailPanel service={activeService} onClose={() => setActive(null)} />
        )}
      </div>
    </section>
  );
}