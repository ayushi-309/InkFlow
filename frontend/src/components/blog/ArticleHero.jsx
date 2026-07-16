const ArticleHero = ({ image, title }) => (
  <div className="w-full h-[300px] sm:h-[420px] md:h-[520px] overflow-hidden relative">
    <img
      src={image}
      alt={title}
      className="w-full h-full object-cover object-center"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
  </div>
);

export default ArticleHero;
