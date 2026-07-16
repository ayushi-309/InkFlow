const ArticleBody = ({ blocks }) => (
  <div className="prose-inkflow max-w-none space-y-6">
    {blocks.map((block, i) => {
      if (block.type === "paragraph") {
        return (
          <p
            key={i}
            className="text-slate-700 text-[16.5px] leading-[1.85] font-normal"
          >
            {block.text}
          </p>
        );
      }

      if (block.type === "heading") {
        return (
          <h2
            key={i}
            className="font-serif text-2xl md:text-[1.75rem] font-bold text-slate-900 leading-snug pt-4"
          >
            {block.text}
          </h2>
        );
      }

      if (block.type === "quote") {
        return (
          <blockquote
            key={i}
            className="relative my-10 pl-6 border-l-4 border-indigo-500 bg-indigo-50/50 rounded-r-xl py-6 pr-6"
          >
            <p className="font-serif text-xl md:text-2xl text-slate-800 leading-snug font-medium italic">
              {block.text}
            </p>
            {block.attribution && (
              <footer className="mt-4 text-slate-500 text-sm font-medium not-italic">
                {block.attribution}
              </footer>
            )}
          </blockquote>
        );
      }

      return null;
    })}
  </div>
);

export default ArticleBody;
