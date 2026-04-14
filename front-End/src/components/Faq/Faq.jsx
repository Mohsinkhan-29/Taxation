import { useState, useEffect, useRef } from "react";

const FAQS = [
  {
    q: "What taxation services do you offer for Australian businesses?",
    a: "We cover the full range — individual and business income tax returns, GST/BAS lodgements, PAYG withholding, FBT, CGT, and ATO correspondence. We are registered tax agents with the Tax Practitioners Board (TPB).",
    aosDelay: 0,
  },
  {
    q: "Can you help with both Australian and Pakistani tax obligations?",
    a: "Yes — we have specialist teams for both ATO (Australia) and FBR (Pakistan) requirements. If you have cross-border income or a business operating in both countries, we can coordinate your obligations in both jurisdictions.",
    aosDelay: 600,
  },
  {
    q: "How quickly can you lodge my tax return?",
    a: "Most individual returns are lodged within 48–72 hours of receiving all required documents. Business and company returns typically take 5–7 business days depending on complexity. We'll give you a firm timeline upfront.",
    aosDelay: 400,
  },
  {
    q: "Do you offer ongoing monthly accounting packages?",
    a: "Absolutely. We offer monthly retainer packages covering bookkeeping, BAS/IAS lodgements, payroll, and management reporting. These are priced based on transaction volume and are fully customisable to your needs.",
    aosDelay: 400,
  },
  {
    q: "Are your services available remotely, or do I need to visit in person?",
    a: "All our services are available 100% remotely via secure document portals, video calls, and email. You never need to visit an office — we've served clients across Australia, Pakistan, and the UK without in-person meetings.",
    aosDelay: 600,
  },
  {
    q: "How do you keep my financial data secure?",
    a: "We use AES-256 encrypted file transfers, two-factor authenticated client portals, and strict data retention policies compliant with Australian Privacy Principles (APP). Your documents are never stored on unsecured servers.",
    aosDelay: 600,
  },
];

function TypingText({ text, active }) {
  const [displayed, setDisplayed] = useState("");
  const indexRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!active) {
      setDisplayed("");
      indexRef.current = 0;
      return;
    }
    indexRef.current = 0;
    setDisplayed("");
    const type = () => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1));
        indexRef.current += 1;
        timerRef.current = setTimeout(type, 14);
      }
    };
    timerRef.current = setTimeout(type, 80);
    return () => clearTimeout(timerRef.current);
  }, [active, text]);

  return (
    <span>
      {displayed}
      {active && displayed.length < text.length && (
        <span
          className="inline-block w-0.5 h-3.5 ml-0.5 rounded-sm align-middle"
          style={{
            background: "#f0c84a",
            animation: "blink 0.7s step-end infinite",
          }}
        />
      )}
    </span>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState({});

  const toggle = (i) =>
    setOpen((prev) => ({ ...prev, [i]: !prev[i] }));

  const left = FAQS.filter((_, i) => i % 2 === 0);
  const right = FAQS.filter((_, i) => i % 2 !== 0);

  return (
    <section className="bg-light py-20 px-6 md:px-12 lg:px-24">
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .faq-answer {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.4s ease;
        }
        .faq-answer.open {
          grid-template-rows: 1fr;
        }
        .faq-inner { overflow: hidden; }
      `}</style>

      {/* Header */}
      <div data-aos="fade-up" className="text-center mb-16">
        <p className="text-[10.5px] font-semibold uppercase tracking-[3.5px] mb-3 text-gold">
          Common Questions
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a2035] mb-3 tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-[#6b7280] text-[15px]">
          Quick answers to the questions we hear most often.
        </p>
      </div>

      {/* Two-column grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
        {[left, right].map((col, colIdx) => (
          <div
            key={colIdx} className="flex flex-col">
            {col.map((faq, rowIdx) => {
              const globalIdx = rowIdx * 2 + colIdx;
              const isOpen = !!open[globalIdx];
              return (
                <div
                data-aos="fade-up"
                  data-aos-delay={globalIdx.aosDelay}
                  key={globalIdx}
                  className="border-b"
                  style={{ borderColor: "rgba(0,0,0,0.08)" }}
                >
                  {/* Question row */}
                  <button
                    onClick={() => toggle(globalIdx)}
                    className="w-full flex items-start justify-between gap-4 py-7 text-left group"
                  >
                    <span
                      className="text-[15px] font-medium leading-snug transition-colors duration-200"
                      style={{ color: isOpen ? "#1a2f5e" : "#1a2035" }}
                    >
                      {faq.q}
                    </span>
                    {/* +/× toggle */}
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 transition-all duration-300"
                      style={{
                        background: isOpen ? "#1a2f5e" : "transparent",
                        border: `1.5px solid ${isOpen ? "#1a2f5e" : "rgba(0,0,0,0.2)"}`,
                        color: isOpen ? "#fff" : "#6b7280",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                  </button>

                  {/* Animated answer */}
                  <div className={`faq-answer${isOpen ? " open" : ""}`}>
                    <div className="faq-inner">
                      <p
                        className="text-[14px] leading-[1.85] pb-7"
                        style={{ color: "#4b5563" }}
                      >
                        <TypingText text={faq.a} active={isOpen} />
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

    </section>
  );
}