import { useState, useEffect, useRef } from "react";

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

const BARS = [
  { height: 45, delay: 0, animDelay: "0ms" },
  { height: 62, delay: 100, animDelay: "180ms" },
  { height: 38, delay: 200, animDelay: "360ms" },
  { height: 72, delay: 300, animDelay: "540ms" },
  { height: 55, delay: 400, animDelay: "720ms" },
  { height: 88, highlight: true, delay: 550, animDelay: "900ms" },
  { height: 68, delay: 700, animDelay: "1080ms" },
  { height: 50, delay: 800, animDelay: "1260ms" },
];

export default function Hero() {
  const [email, setEmail] = useState("");
  const [barsReady, setBarsReady] = useState(false);
  const [countReady, setCountReady] = useState(false);
  const sectionRef = useRef(null);

  const clients = useCountUp(500, 2200, countReady);
  const years = useCountUp(12, 1800, countReady);
  const compliance = useCountUp(98, 2000, countReady);

  const handleSubmit = async () => {
    if (!email) {
      alert("Please enter email");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      alert("Submitted successfully!");
      setEmail("");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };




  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setBarsReady(true), 300);
          setTimeout(() => setCountReady(true), 600);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="Home"
      ref={sectionRef}
      className="relative min-h-[88vh] flex items-center overflow-hidden bg-primary-gradient"


    // style={{
    //   background: "linear-gradient(135deg, #0f1e3d 0%, #1a2f5e 45%, #1e4976 100%)",

    // }}
    >
      <style>{`
  @keyframes barFloat {
    0%, 100% { transform: scaleY(1);    opacity: 0.5; }
    50%       { transform: scaleY(1.08); opacity: 0.75; }
  }
  @keyframes goldPulse {
    0%, 100% { transform: scaleY(1);    box-shadow: 0 0 0px rgba(200,169,106,0); }
    50%       { transform: scaleY(1.05); box-shadow: 0 -6px 20px rgba(200,169,106,0.5); }
  }
`}</style>
      {/* Background mesh dots */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Soft glow blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #5b8fc9 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #3d6b3d 0%, transparent 70%)" }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-4 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* ── Left: Copy ── */}
        <div data-aos="fade-up" className="flex flex-col gap-6">
          {/* Badge */}
          <div className="w-fit flex items-center gap-2 border border-white/20 rounded-full px-4 py-2 bg-white/5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-[2.5px] text-white/70">
              Trusted Tax & Business Consultancy
            </span>
          </div>

          {/* Headline */}
          <h1 data-aos="fade-up" className="text-4xl md:text-5xl lg:text-[52px] font-extrabold text-white leading-[1.15] tracking-tight">
            Expert Tax Solutions
            <br />
            for{" "}
            <span className="text-gold">Pakistan</span>
            <br />
            Businesses
          </h1>

          {/* Sub */}
          <p data-aos="fade-up" className="text-[15px] text-white/60 leading-relaxed max-w-lg">
            Biz2Optima specialises in end-to-end tax compliance, accounting, and
            strategic business advisory — helping you stay compliant and grow
            with confidence.
          </p>

          {/* Email CTA */}
          {/* <div
            data-aos="fade-up"
            className="flex flex-row items-stretch rounded-xl overflow-hidden border border-white/15 bg-white/8 backdrop-blur-sm w-full max-w-lg"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 min-w-0 bg-transparent px-3 py-3 text-[13px] text-white placeholder:text-white/35 outline-none"
            />

            <button
              onClick={handleSubmit}
              className="shrink-0 whitespace-nowrap bg-gold hover:bg-gold text-[#1a2035] font-bold text-[12px] px-4 py-3 transition-colors duration-200 flex items-center gap-1"
            >
              Book a Free Call
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div> */}


          {/* Stats */}
          <div className="flex items-center gap-10 pt-2">
            {[
              { value: clients, suffix: "+", label: "Clients served" },
              { value: years, suffix: "+", label: "Years experience" },
              { value: compliance, suffix: "%", label: "Compliance rate" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="text-[28px] font-extrabold text-gold leading-none tabular-nums">
                  {stat.value}{stat.suffix}
                </span>
                <span className="text-[12px] text-white/50 font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Chart card ── */}
        <div data-aos="zoom-in" className="flex justify-center lg:justify-end">
          <div
            className="relative rounded-2xl p-7 w-full max-w-[420px]"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(16px)",
            }}
          >
            {/* Card header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[2px] text-white/40 mb-1">
                  Performance
                </p>
                <p className="text-white font-bold text-[15px]">Tax Compliance Score</p>
              </div>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center">
                <svg className="w-4.5 h-4.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>

            {/* Bar chart */}
            {/* Bar chart */}
            <div className="flex items-end justify-between gap-2 h-36 mb-6 px-1">
              {BARS.map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                  <div
                    className={`w-full rounded-t-md ${bar.highlight ? "bg-gold" : "bg-[#5b8fc9]/50"}`}
                    style={{
                      height: barsReady ? `${bar.height}%` : "0%",
                      transition: `height ${bar.highlight ? "900ms" : "700ms"} ease-out`,
                      transitionDelay: barsReady ? `${bar.delay}ms` : "0ms",
                      animation: barsReady
                        ? bar.highlight
                          ? `goldPulse 2s ease-in-out infinite`
                          : `barFloat 2.5s ease-in-out infinite`
                        : "none",
                      animationDelay: `${i * 180}ms`,
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Score */}
            <div
              className="rounded-xl px-5 py-4"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[11px] text-white/40 font-medium mb-1 uppercase tracking-widest">
                Tax Compliance Score
              </p>
              <p className="text-white font-bold text-[22px] flex items-center gap-2">
                {compliance}% — Excellent
                <span className="text-gold text-xl">✓</span>
              </p>
            </div>

            {/* Floating badge */}
            <div
              className="absolute -top-4 -right-4 rounded-xl px-4 py-2.5 flex items-center gap-2"
              style={{
                background: "linear-gradient(135deg, #3d6b3d, #5a9c5a)",
                boxShadow: "0 8px 24px rgba(61,107,61,0.4)",
              }}
            >
              <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-white font-semibold text-[12px]">ATO Certified</span>
            </div>

            {/* Floating mini stat */}
            <div
              className="absolute -bottom-4 -left-4 rounded-xl px-4 py-2.5"
              style={{
                background: "rgba(15,30,61,0.9)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(12px)",
              }}
            >
              <p className="text-[10px] text-white/40 uppercase tracking-wider mb-0.5">Active clients</p>
              <p className="text-white font-bold text-[16px]">{clients}+</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(15,30,61,0.4))" }} />
    </section>
  );
}