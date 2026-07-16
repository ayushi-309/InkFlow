const ArticleTags = ({ tags }) => (
  <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap gap-2 items-center">
    <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider mr-1">
      Tagged:
    </span>
    {tags.map((tag) => (
      <span
        key={tag}
        className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[12px] font-medium hover:bg-slate-200 cursor-pointer transition-colors duration-200"
      >
        #{tag}
      </span>
    ))}
  </div>
);

export default ArticleTags;
