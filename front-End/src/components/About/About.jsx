import { useState, useEffect, useRef } from "react";

const SLIDES = [
  {
    tag: "About Us",
    heading: "Who is Biz2Optima?",
    paragraphs: [
      "Biz2Optima Solutions (Pvt) Ltd is a forward-thinking business consultancy specialising in Pakistan's and Australia's taxation laws. Our expert team delivers end-to-end services in accountancy, tax compliance, strategic consultancy, marketing, sales, and business registration.",
      "We simplify financial and operational processes — driving growth, profitability, and regulatory compliance for businesses across AU, PK, and GB.",
    ],
    differentiators: [
      {
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        ),
        title: "Certified Experts",
        desc: "CPA, CA, and ACCA qualified accountants with deep knowledge of Australian Tax Office (ATO) requirements.",
      },
      {
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        title: "Fast Turnaround",
        desc: "48-hour response guarantee on all queries. Year-round availability during tax season.",
      },
      {
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        ),
        title: "Compliance First",
        desc: "98% compliance rate across all client engagements — we keep you on the right side of the law.",
      },
    ],
    label: "What makes us different",
  },
  {
    tag: "Our Mission",
    heading: "Driven by Purpose",
    paragraphs: [
      "Our mission is to democratise access to world-class financial and tax advisory services. We believe every business — regardless of size — deserves expert guidance that was once only available to large corporations.",
      "From Karachi to Sydney, we bridge the gap between complex regulation and practical business reality, one client at a time.",
    ],
    differentiators: [
      {
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0022 5.5V3.935M6 3.935a9 9 0 1112 0" />
          </svg>
        ),
        title: "Global Reach",
        desc: "Operating across Australia, Pakistan, and the UK — we understand multi-jurisdiction needs inside out.",
      },
      {
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        ),
        title: "Client-Centric",
        desc: "We tailor every engagement to your specific business model, industry, and growth stage.",
      },
      {
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        ),
        title: "Growth Focused",
        desc: "Beyond compliance, we actively identify opportunities to reduce tax, improve cash flow, and scale sustainably.",
      },
    ],
    label: "What we stand for",
  },
  {
    tag: "Our Team",
    heading: "The People Behind It",
    paragraphs: [
      "Our team is a hand-picked group of chartered accountants, registered tax agents, business strategists, and compliance specialists — united by a passion for helping clients thrive in complex financial environments.",
      "With combined experience across Big Four firms, government tax agencies, and private practice, we bring institutional knowledge with boutique-firm attention.",
    ],
    differentiators: [
      {
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        ),
        title: "Deep Expertise",
        desc: "Our team holds CPA, CA, ACCA, and CTA qualifications with collective decades of practice across multiple jurisdictions.",
      },
      {
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        ),
        title: "Always Available",
        desc: "Dedicated account managers, not call centres. You speak to the same expert who knows your file inside out.",
      },
      {
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        ),
        title: "Tech-Enabled",
        desc: "We use Xero, QuickBooks, and IRIS integrations to give you real-time visibility into your financial position at any time.",
      },
    ],
    label: "Who's in your corner",
  },
];

const DURATION = 7000;

function TabPill({ label, index, active, onClick }) {
  const isActive = index === active;
  const [fillKey, setFillKey] = useState(0);

  useEffect(() => {
    if (isActive) setFillKey((k) => k + 1);
  }, [isActive]);

  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl text-[13px] font-semibold px-7 py-3 transition-all duration-300
        ${isActive
          ? "bg-primary text-gold border-2 border-primary -translate-y-0.5 shadow-lg shadow-primary/30"
          : "bg-transparent text-[#6b7280] border-2 border-black/10 hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary"
        }
      `}
    >
      {/* Gold drain bar at bottom — shrinks right→left over DURATION */}
      {isActive && (
        <span
          key={fillKey}
          className="absolute bottom-0 left-0 h-[3px] bg-gold rounded-full origin-right"
          style={{ width: "100%", animation: `drainBar ${DURATION}ms linear forwards` }}
        />
      )}

      {/* Pulsing dot top-right */}
      {isActive && (
        <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
      )}

      {label}
    </button>
  );
}

export default function About() {
  const [active, setActive] = useState(0);
  const [animDir, setAnimDir] = useState("next");
  const [visible, setVisible] = useState(true);
  const intervalRef = useRef(null);

  const goTo = (idx, dir = "next") => {
    if (idx === active) return;
    clearInterval(intervalRef.current);
    setAnimDir(dir);
    setVisible(false);
    setTimeout(() => {
      setActive(idx);
      setVisible(true);
    }, 380);
  };

  const next = () => {
    const nxt = (active + 1) % SLIDES.length;
    setAnimDir("next");
    setVisible(false);
    setTimeout(() => {
      setActive(nxt);
      setVisible(true);
    }, 380);
  };

  const prev = () => goTo((active - 1 + SLIDES.length) % SLIDES.length, "prev");

  useEffect(() => {
    intervalRef.current = setInterval(next, DURATION);
    return () => clearInterval(intervalRef.current);
  }, [active]);

  const slide = SLIDES[active];

  return (
    <section id="About" className="bg-light py-20 px-6 md:px-12 lg:px-24 overflow-hidden">
      <style>{`
        @keyframes drainBar {
          from { transform: scaleX(1); }
          to   { transform: scaleX(0); }
        }
        .slide-in-next { animation: sIN .38s cubic-bezier(.4,0,.2,1) both }
        .slide-in-prev { animation: sIP .38s cubic-bezier(.4,0,.2,1) both }
        @keyframes sIN { from{opacity:0;transform:translateX(40px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes sIP { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
        .diff-item { transition: transform .2s ease; }
        .diff-item:hover { transform: translateX(5px); }
      `}</style>

      {/* Header */}
      <div data-aos="fade-up" className="text-center mb-14">
        <p className="text-[10.5px] font-semibold uppercase tracking-[3.5px] mb-3 text-gold">
          Who We Are
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3 tracking-tight">
          About Us &amp; Our Mission
        </h2>
        <p className="text-[#6b7280] text-[15px] max-w-lg mx-auto">
          Get to know the team behind Biz2Optima and what drives us to deliver excellence.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Tab pills */}
        <div data-aos="fade-up" className="flex items-center justify-center gap-3 mb-10">
          {SLIDES.map((s, i) => (
            <TabPill
              key={i}
              label={s.tag}
              index={i}
              active={active}
              onClick={() => goTo(i, i > active ? "next" : "prev")}
            />
          ))}
        </div>

        {/* Slide content */}
        <div className={visible ? (animDir === "next" ? "slide-in-next" : "slide-in-prev") : "opacity-0"}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

            {/* Left dark card */}
            <div data-aos="zoom-in" className="rounded-2xl p-8 md:p-10 flex flex-col gap-6 relative overflow-hidden bg-primary-gradient">
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "24px 24px" }}
              />

              {/* Tag pill */}
              <div className="w-fit px-4 py-1.5 rounded-lg text-[12px] font-semibold bg-[rgba(200,169,106,0.15)] text-gold border border-gold/40">
                {slide.tag}
              </div>

              {/* Heading */}
              <h3 className="text-3xl font-bold text-white leading-tight">
                {slide.heading}
              </h3>

              {/* Paragraphs */}
              <div className="flex flex-col gap-4">
                {slide.paragraphs.map((p, i) => (
                  <p key={i} className="text-[14px] leading-[1.85] text-white/60">
                    {p}
                  </p>
                ))}
              </div>

              {/* Dots + arrows */}
              <div className="mt-auto pt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {SLIDES.map((_, i) => (
                    <span
                      key={i}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: i === active ? "22px" : "6px",
                        height: "6px",
                        background: i === active ? "#C8A96A" : "rgba(255,255,255,0.2)",
                      }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  {[
                    { fn: prev, d: "M15 19l-7-7 7-7" },
                    { fn: next, d: "M9 5l7 7-7 7" },
                  ].map(({ fn, d }, i) => (
                    <button
                      key={i}
                      onClick={fn}
                      className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 bg-white/[0.08] border border-white/[0.15] text-white/60 hover:bg-gold/20 hover:text-gold"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={d} />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right differentiators */}
            <div className="flex flex-col justify-center gap-6 py-2">
              <p data-aos="fade-up" className="text-[13px] font-semibold uppercase tracking-[2px] text-[#9ca3af]">
                {slide.label}
              </p>

              <div className="flex flex-col gap-5">
                {slide.differentiators.map((d, i) => (
                  <div data-aos="fade-up" key={i} className="diff-item flex items-start gap-4 cursor-default">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-primary text-gold">
                      {d.icon}
                    </div>
                    <div className="flex flex-col gap-1 pt-0.5">
                      <p className="font-semibold text-[15px] text-[#1a2035]">{d.title}</p>
                      <p className="text-[13.5px] leading-relaxed text-[#6b7280]">{d.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div data-aos="fade-left" data-aos-once="true" className="pt-2 flex items-center gap-4">
                <a
                  href="#contact"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-[13px] text-white hover:opacity-90 transition-opacity bg-primary"
                >
                  Work With Us
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="#services"
                  className="text-[13px] font-semibold text-primary hover:text-gold transition-colors"
                >
                  Our Services →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}