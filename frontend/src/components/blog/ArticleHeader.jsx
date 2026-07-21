const ArticleHeader = ({ category, categoryBg, title }) => (
  <div>
    {/* Category Badge */}
    <span
      className={`inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${categoryBg} mb-4`}
    >
      {category}
    </span>

    {/* Title */}
    <h1 className="font-serif text-3xl sm:text-4xl md:text-[2.6rem] font-bold text-slate-900 leading-[1.2] tracking-tight mb-5">
      {title}
    </h1>
  </div>
);

export default ArticleHeader;
