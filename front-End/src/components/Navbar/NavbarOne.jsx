import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "About", href: "About" },
  {
    label: "Services",
    href: "#",
    dropdown: [
      "Business Consulting",
      "Digital Strategy",
      "Process Optimization",
      "Financial Advisory",
    ],
  },
  { label: "Insights", href: "#" },
  { label: "FAQ", href: "#" },
  { label: "Contact Us", href: "#" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const dropRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target))
        setDropdownOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target))
        setSearchOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-lg" : ""
        }`}
    >
      {/* ── Top bar ── */}
      <div className=" max-sm:hidden  bg-primary px-6 md:px-12 py-1.5 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+611234567890"
            className="text-white/60 text-xs tracking-wide hover:text-gold transition-colors"
          >
            +61 123 456 7890
          </a>

          <span className="w-px h-3 bg-white/30" />

          <a
            href="mailto:mohsinkhan292003@gmail"
            className="text-white/60 text-xs tracking-wide hover:text-gold transition-colors"
          >
            info@biz2optima.com
          </a>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          <div className="flex items-center gap-1.5 cursor-pointer hover:text-yellow-300 transition">
            <span className="text-white text-sm">🇦🇺</span>
            <span className="text-white/60 text-xs">Australia</span>
          </div>

          <span className="w-px h-3 bg-white/30" />

          <div className="flex items-center gap-1.5 cursor-pointer hover:text-yellow-300 transition">
            <span className="text-white text-sm">🇵🇰</span>
            <span className="text-white/60 text-xs">Pakistan</span>
          </div>

          <span className="w-px h-3 bg-white/30" />

          <div className="flex items-center gap-1.5 cursor-pointer hover:text-yellow-300 transition">
            <span className="text-white text-sm">🇬🇧</span>
            <span className="text-white/60 text-xs">United Kingdom</span>
          </div>

        </div>
      </div>


      {/* ── Main bar ── */}
      <div className="bg-light px-6 md:px-12 flex items-center justify-between h-[68px]">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 flex-shrink-0">
          <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center font-serif text-lg font-bold text-gold tracking-tighter select-none">
            B2
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-serif text-[15px] font-bold text-primary tracking-tight">
              Biz 2 Optima
            </span>
            <span className="text-[8.5px] font-semibold uppercase tracking-[1.8px] text-gold">
              Empowering Businesses
            </span>
          </div>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map((link) =>
            link.dropdown ? (
              <div key={link.label} className="relative" ref={dropRef}>
                <button
                  onClick={() => setDropdownOpen((p) => !p)}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg text-[13.5px] font-medium transition-all duration-200 ${dropdownOpen
                    ? "bg-primary text-white"
                    : "text-primary hover:bg-primary/10"
                    }`}
                >
                  {link.label}
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""
                      }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute top-full mt-2 left-0 w-52 bg-white rounded-xl shadow-xl border border-light py-1.5 overflow-hidden z-50">
                    {link.dropdown.map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="block px-4 py-2.5 text-[13px] text-primary hover:bg-light hover:text-primary font-medium transition-colors"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : link.label === "Contact Us" ? (
              <a
                key={link.label}
                href={link.href}
                className="ml-2 px-5 py-2 rounded-lg text-[13.5px] font-medium bg-primary text-white hover:bg-gold transition-colors duration-200"
              >
                {link.label}
              </a>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 rounded-lg text-[13.5px] font-medium text-primary hover:bg-primary/10 transition-colors duration-200"
              >
                {link.label}
              </a>
            )
          )}
        </div>

        {/* Right side icons */}
        <div className="hidden md:flex items-center gap-2">
          {/* Search */}
          <div ref={searchRef} className="relative">
            {searchOpen ? (
              <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-[#b8d4b8] shadow-sm">
                <input
                  autoFocus
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  placeholder="Search..."
                  className="w-40 text-sm text-[#1a2035] outline-none bg-transparent placeholder:text-gray-400"
                />
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchVal("");
                  }}
                  className="text-gray-400 hover:text-[#1a2f5e] transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="w-9 h-9 rounded-full bg-white/60 border border-[#b8d4b8] flex items-center justify-center text-[#1a2f5e] hover:bg-white transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                  />
                </svg>
              </button>
            )}
          </div>

        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((p) => !p)}
          className="md:hidden w-9 h-9 rounded-lg bg-primary/10 flex flex-col items-center justify-center gap-1.5"
        >
          <span
            className={`block w-5 h-0.5 bg-primary transition-all duration-200 origin-center ${mobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
          />
          <span
            className={`block w-5 h-0.5 bg-primary transition-all duration-200 ${mobileOpen ? "opacity-0" : ""
              }`}
          />
          <span
            className={`block w-5 h-0.5 bg-primary transition-all duration-200 origin-center ${mobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
          />
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="md:hidden bg-light border-t border-light px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) =>
            link.dropdown ? (
              <div key={link.label}>
                <button
                  onClick={() => setDropdownOpen((p) => !p)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13.5px] font-medium text-primary hover:bg-primary/10 transition-colors"
                >
                  {link.label}
                  <svg
                    className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""
                      }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {dropdownOpen && (
                  <div className="ml-4 mt-1 flex flex-col gap-0.5">
                    {link.dropdown.map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="px-3 py-2 rounded-lg text-[13px] text-primary hover:bg-primary/10 transition-colors"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : link.label === "Contact Us" ? (
              <a
                key={link.label}
                href={link.href}
                className="mt-2 px-3 py-2.5 rounded-lg text-[13.5px] font-medium bg-primary text-white text-center hover:bg-[#2d4a8a] transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-2.5 rounded-lg text-[13.5px] font-medium text-primary hover:bg-primary/10 transition-colors"
              >
                {link.label}
              </a>
            )
          )}

          {/* Mobile search */}
          <div className="mt-3 pt-3 border-t border-gold">
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-gold">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
              <input
                placeholder="Search..."
                className="flex-1 text-sm text-[#1a2035] outline-none bg-transparent placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>
      )}

      <a
        href="https://wa.me/923342844244"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 group"
      >
        {/* Glow pulse layer */}
        <span className="absolute inset-0 rounded-full bg-green-500 opacity-60 blur-md animate-ping"></span>

        {/* Button */}
        <div className="relative w-14 h-14 flex items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:scale-110 transition-all duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="currentColor"
            className="w-7 h-7"
          >
            <path d="M16.004 3C9.373 3 4 8.373 4 15.004c0 2.65.865 5.1 2.33 7.082L4 29l7.09-2.285A11.95 11.95 0 0 0 16.004 27c6.63 0 12.004-5.373 12.004-11.996C28.008 8.373 22.634 3 16.004 3zm0 21.85c-1.94 0-3.83-.52-5.48-1.51l-.39-.23-4.21 1.36 1.38-4.11-.25-.42A9.87 9.87 0 0 1 6.14 15c0-5.44 4.42-9.86 9.86-9.86s9.86 4.42 9.86 9.86-4.42 9.85-9.86 9.85zm5.42-7.36c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.89-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.57-.48-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.13 3.25 5.17 4.55.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
          </svg>
        </div>
      </a>


    </nav>

  );
}