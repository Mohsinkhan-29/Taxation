import { useState } from "react";
import API from "../../api/api";


export default function SubscriptionCTA() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

const handleSubscribe = async (e) => {
  e.preventDefault();

  if (!email.trim()) return;

  try {
    await API.post("/api/subscribers", { email });

    setSubscribed(true);
    setEmail("");

    setTimeout(() => setSubscribed(false), 3500);
  } catch (err) {
    console.error("Subscription failed:", err);
    alert("Failed to subscribe. Try again.");
  }
};


  return (
    <div className="px-6 md:px-12 lg:px-24 py-14 bg-gold">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

        {/* LEFT */}
        <div data-aos="fade-up" className="flex flex-col gap-2">
          <h3 className="text-2xl md:text-3xl font-bold text-primary leading-tight max-w-md">
            Get Notified About Tax Deadlines
            <br />
            &amp; Compliance Updates
          </h3>

          <p className="text-[13.5px] text-primary/60 max-w-sm">
            Stay ahead of ATO lodgement deadlines. No spam — only what matters.
          </p>
        </div>

        {/* RIGHT FORM */}
        <form
          data-aos="fade-up"
          onSubmit={handleSubscribe}
          className="flex flex-row items-stretch rounded-xl overflow-hidden shadow-lg w-full md:w-auto md:min-w-[460px]"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 min-w-0 px-3 py-3 text-[13px] text-[#1a2035] bg-white placeholder:text-gray-400 outline-none"
          />

          <button
            type="submit"
            className={`shrink-0 whitespace-nowrap px-4 py-3 font-bold text-[12px] flex items-center gap-1 transition-all duration-200 ${subscribed
                ? "bg-[#3d6b3d] text-white"
                : "bg-primary text-white hover:bg-primary/90"
              }`}
          >
            {subscribed ? (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Subscribed!
              </>
            ) : (
              <>
                Subscribe
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
