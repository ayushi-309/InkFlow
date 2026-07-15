import { Link } from "react-router-dom";
import { RiTimeLine } from "@remixicon/react";

const PostCard = ({ post, horizontal = false }) => {
  if (horizontal) {
    return (
      <article className="md:col-span-2 flex flex-col md:flex-row bg-white border border-slate-100 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 group">
        <div className="w-full md:w-[45%] h-52 md:h-auto overflow-hidden relative">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103 animate-fade-in" 
          />
        </div>
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <span className={`text-[11px] font-bold uppercase tracking-wider ${post.categoryColor}`}>
              {post.category}
            </span>
            <h4 className="font-serif text-xl md:text-2xl font-bold text-slate-900 leading-snug mt-2.5 hover:text-indigo-600 transition-colors">
              <Link to={`/blog-detail/${post.id}`}>
                {post.title}
              </Link>
            </h4>
            <p className="text-slate-500 text-sm mt-3 leading-relaxed font-normal line-clamp-3">
              {post.excerpt}
            </p>
          </div>
          <div className="flex items-center gap-3 text-slate-400 text-xs mt-6 pt-4 border-t border-slate-100 font-medium">
            <span className="flex items-center gap-1">
              <RiTimeLine size={14} />
              {post.readTime}
            </span>
            <span>·</span>
            <span>{post.date}</span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 group flex flex-col justify-between">
      <div>
        <div className="w-full aspect-[16/10] overflow-hidden relative">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103 animate-fade-in" 
          />
        </div>
        <div className="p-6">
          <span className={`text-[11px] font-bold uppercase tracking-wider ${post.categoryColor}`}>
            {post.category}
          </span>
          <h4 className="font-serif text-[19px] font-bold text-slate-900 leading-snug mt-2.5 hover:text-indigo-600 transition-colors line-clamp-3">
            <Link to={`/blog-detail/${post.id}`}>
              {post.title}
            </Link>
          </h4>
        </div>
      </div>
      <div className="px-6 pb-6">
        <div className="flex items-center gap-3 text-slate-400 text-xs pt-4 border-t border-slate-100 font-medium">
          <span className="flex items-center gap-1">
            <RiTimeLine size={14} />
            {post.readTime}
          </span>
          <span>·</span>
          <span>{post.date}</span>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
