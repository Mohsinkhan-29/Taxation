import { useState, useEffect, useRef } from "react";

const TESTIMONIALS = [
  {
    name: "Ahmed Raza",
    title: "CEO, TechVentures Pvt. Ltd.",
    initials: "AR",
    color: "from-[#1a2f5e] to-[#2d4a8a]",
    text: "Biz 2 Optima completely transformed how we handle our financials. Their tax consultancy is sharp, timely, and always accurate. We've saved significantly since partnering with them.",
    rating: 5,
  },
  {
    name: "Sara Khan",
    title: "Founder, GreenLeaf Exports",
    initials: "SK",
    color: "from-[#3d6b3d] to-[#5a9c5a]",
    text: "The company registration process was seamless. Their team guided us through every step — FBR, SECP, and sales tax — all handled professionally without any stress on our end.",
    rating: 5,
  },
  {
    name: "James Thornton",
    title: "CFO, Meridian Holdings",
    initials: "JT",
    color: "from-[#7c4a1a] to-[#b8722a]",
    text: "Exceptional bookkeeping and reconciliation services. Our financial statements are always prepared ahead of deadline, giving us a clear picture to make confident business decisions.",
    rating: 5,
  },
  {
    name: "Fatima Malik",
    title: "Director, Optima Retail Group",
    initials: "FM",
    color: "from-[#5a1a5a] to-[#8a2a8a]",
    text: "Their business advisory team helped us restructure our operations and cut costs by 28% in one fiscal year. The ROI on their services speaks for itself. Highly recommended.",
    rating: 5,
  },
];

function StarRating({ count }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? "text-yellow-400" : "text-white/20"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");
  const intervalRef = useRef(null);

  const goTo = (index, dir = "next") => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setActive(index);
      setAnimating(false);
    }, 350);
  };

  const next = () => goTo((active + 1) % TESTIMONIALS.length, "next");
  const prev = () => goTo((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length, "prev");

  useEffect(() => {
    intervalRef.current = setInterval(next, 5000);
    return () => clearInterval(intervalRef.current);
  }, [active]);

  const t = TESTIMONIALS[active];

  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Header */}
      <div data-aos="fade-up" className="text-center mb-14">
        <p className="text-xs font-semibold uppercase tracking-[3px] text-gold mb-3">
          What our clients say
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a2035] mb-4 tracking-tight">
          Testimonials
        </h2>
        <p className="text-[#6b7280] text-[15px] max-w-xl mx-auto leading-relaxed">
          Trusted by businesses across Australia. Here's what our clients have
          to say about working with us.
        </p>
        <div className="flex items-center justify-center gap-2 mt-5">
          <span className="block w-8 h-0.5 bg-gold" />
          <span className="block w-12 h-1 rounded-full bg-primary" />
          <span className="block w-8 h-0.5 bg-gold" />
        </div>
      </div>

      {/* Carousel */}
      <div data-aos="fade-up" className="max-w-5xl mx-auto relative">
        {/* Main card */}
        <div
          className={`relative rounded-2xl overflow-hidden bg-primary min-h-[280px] transition-all duration-350 ${
            animating
              ? direction === "next"
                ? "opacity-0 translate-x-4"
                : "opacity-0 -translate-x-4"
              : "opacity-100 translate-x-0"
          }`}
          style={{ transition: "opacity 0.35s ease, transform 0.35s ease" }}
        >
          {/* Background pattern dots */}
          <div className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Giant quote mark */}
          <div className="absolute top-6 right-2 text-white/10 select-none pointer-events-none"
            style={{ fontSize: "120px", lineHeight: 1, fontFamily: "Georgia, serif" }}>
            "
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar + info */}
            <div className="flex-shrink-0 flex flex-col items-center gap-3">
              <div
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-xl shadow-lg border-2 border-white/20`}
              >
                {t.initials}
              </div>
              <StarRating count={t.rating} />
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center gap-4">
              <p className="text-white/85 text-[15.5px] leading-[1.8] italic">
                "{t.text}"
              </p>
              <div>
                <p className="text-white font-bold text-[15px]">{t.name}</p>
                <p className="text-[#9fe1cb] text-[12.5px] font-medium mt-0.5">
                  {t.title}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom accent bar */}
          <div  className={`h-1 w-full bg-gradient-to-r ${t.color}`} />
        </div>

   
        {/* Prev / Next arrows */}
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 md:-translate-x-8 w-10 h-10 rounded-full bg-white border border-[#d4e6d4] shadow-md flex items-center justify-center text-[#1a2f5e] hover:bg-[#d4e6d4] transition-colors z-20"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 md:translate-x-8 w-10 h-10 rounded-full bg-white border border-[#d4e6d4] shadow-md flex items-center justify-center text-[#1a2f5e] hover:bg-[#d4e6d4] transition-colors z-20"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div data-aos="fade-up" className="flex items-center justify-center gap-2.5 mt-8">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > active ? "next" : "prev")}
            className={`rounded-full transition-all duration-300 ${
              i === active
                ? "w-7 h-2.5 bg-[#1a2f5e]"
                : "w-2.5 h-2.5 bg-[#d4e6d4] hover:bg-[#b8d4b8]"
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div data-aos="fade-up" className="max-w-5xl mx-auto mt-4">
        <div className="h-0.5 bg-[#f0f4f0] rounded-full overflow-hidden">
          <div
            key={active}
            className="h-full bg-[#3d6b3d] rounded-full"
            style={{
              animation: "progress 5s linear forwards",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>
    </section>
  );
}