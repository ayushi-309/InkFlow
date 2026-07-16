/**
 * NewsletterCTA
 *
 * Props:
 *  - variant: "sidebar" (default) | "mobile"
 *    "sidebar" → dark rounded card used in the desktop sidebar
 *    "mobile"  → full-width dark banner used below the article on small screens
 */
const NewsletterCTA = ({ variant = "sidebar" }) => {
  if (variant === "mobile") {
    return (
      <div className="lg:hidden bg-slate-900 text-white px-4 py-10 mt-4">
        <div className="max-w-lg mx-auto text-center">
          <p className="font-serif text-xl font-bold mb-2">
            The InkFlow Weekly
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Deep cuts, no noise. Technology and the future — curated every
            Thursday.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-white/10 border border-white/15 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-white/40 transition-colors"
            />
            <button className="bg-white text-slate-900 text-[13px] font-bold px-5 py-2.5 rounded-lg hover:bg-slate-100 transition-colors duration-200 active:scale-[0.98] flex-shrink-0">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-slate-900 text-white p-6">
      <p className="font-serif text-lg font-bold leading-snug mb-1">
        The InkFlow Weekly
      </p>
      <p className="text-slate-400 text-[13px] leading-relaxed mb-5 font-normal">
        Deep cuts, no noise. Technology and the future — curated every Thursday.
      </p>
      <input
        type="email"
        placeholder="your@email.com"
        className="w-full bg-white/10 border border-white/15 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-white/40 transition-colors mb-3"
      />
      <button className="w-full bg-white text-slate-900 text-[13px] font-bold py-2.5 rounded-lg hover:bg-slate-100 transition-colors duration-200 active:scale-[0.98]">
        Subscribe Now
      </button>
    </div>
  );
};

export default NewsletterCTA;
