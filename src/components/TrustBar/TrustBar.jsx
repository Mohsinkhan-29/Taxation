import { useState, useEffect, useRef } from "react";

import Xero from '../../assets/Biz2/xero.png'
import QuickBooks from '../../assets/Biz2/quickbook.png'
import Icap from '../../assets/Biz2/xero.png'
import Fbr from '../../assets/Biz2/fbr.png'
import Secp from '../../assets/Biz2/secp.png'
import Iris from '../../assets/Biz2/iris.png'


function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const raf = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [start, target, duration]);
  return count;
}

const STATS = [
  { target: 500, suffix: "+", label: "Clients served across AU, PK & GB" , aosDelay: 600 },
  { target: 12, suffix: "+", label: "Years of taxation expertise" , aosDelay: 400 },
  { target: 98, suffix: "%", label: "Compliance success rate" , aosDelay: 200},
  { target: 3, suffix: "", label: "Countries of operation" , aosDelay: 0 },
];

const PARTNERS = [
  { name: "Xero Certified Partner", img: Xero },
  { name: "QuickBooks ProAdvisor", img: QuickBooks },
  { name: "ICAP Affiliated", img: Icap },
  { name: "FBR Registered", img: Fbr },
  { name: "SECP Compliant", img: Secp },
    { name: "IRIS affiliated", img: Iris },
];


// Duplicate for seamless loop
const TRACK = [...PARTNERS, ...PARTNERS];

export default function TrustBar() {
  const sectionRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const counts = [
    useCountUp(STATS[0].target, 2000, started),
    useCountUp(STATS[1].target, 1600, started),
    useCountUp(STATS[2].target, 1800, started),
    useCountUp(STATS[3].target, 1200, started),
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3500);
  };

  return (
    <div ref={sectionRef}>

      {/* ── Layer 1: Stats bar ── */}
      <div
        className="py-10 px-6 md:px-12 bg-gradient-to-br from-[#1F2E4A] to-[#2A3F66]"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-0">
          {STATS.map((s, i) => (
            <div data-aos="fade-up" data-aos-delay={s.aosDelay}
              key={s.label}
              className={`flex flex-col items-center justify-center py-6 px-4 text-center ${i < STATS.length - 1 ? "border-r border-white/10" : ""
                }`}
            >
              <span
                className="text-4xl md:text-5xl font-extrabold tabular-nums leading-none mb-2 text-gold"
              >
                {counts[i]}{s.suffix}
              </span>
              <span className="text-[13px] text-white/50 leading-snug max-w-[130px]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Layer 2: Certified & integrated carousel ── */}
      <div className="bg-white py-12 overflow-hidden">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[3px] text-[#9ca3af] mb-8">
          Certified &amp; Integrated With
        </p>

        {/* Infinite scroll track */}
        <div className="relative overflow-hidden">
          {/* Left / right fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #fff, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #fff, transparent)" }} />

          <div
            className="flex gap-8 w-max"
            style={{ animation: "scrollTrack 28s linear infinite" }}
          >
            {TRACK.map((p, i) => (
              <div
                key={i}
                className="flex-col items-center  justify-center gap-3 px-5 py-3 rounded-xl border border-gray-100 bg-white shadow-sm flex-shrink-0 hover:shadow-md hover:border-gray-200 transition-shadow"
                style={{ minWidth: "220px" }}
              >
                {/* LOGO */}
                <div className="w-16 h-16 flex items-center justify-center bg-gray-50 rounded-lg p-2 flex-shrink-0">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* TEXT */}
                <span className="text-[13.5px] font-medium text-[#1a2035]">
                  {p.name}
                </span>
              </div>
            ))}

          </div>
        </div>
      </div>



      {/* Keyframe for infinite scroll */}
      <style>{`
        @keyframes scrollTrack {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}