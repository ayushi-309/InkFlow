import { Link } from "react-router-dom";
import { RiTimeLine } from "@remixicon/react";

const RelatedStories = ({ posts }) => (
  <div className="rounded-2xl border border-slate-100 bg-white p-5">
    <p className="text-slate-900 text-[13px] font-bold uppercase tracking-wider mb-5">
      Related Stories
    </p>
    <div className="space-y-5">
      {posts.map((post) => (
        <Link
          key={post.id}
          to={`/blog-detail/${post.id}`}
          className="flex gap-3.5 group"
        >
          {/* Thumbnail */}
          <div className="w-20 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
            />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider ${post.categoryColor}`}
            >
              {post.category}
            </span>
            <p className="text-slate-800 text-[13px] font-semibold leading-snug mt-1 group-hover:text-indigo-600 transition-colors duration-200 line-clamp-2">
              {post.title}
            </p>
            <span className="flex items-center gap-1 text-slate-400 text-[11px] mt-1.5 font-medium">
              <RiTimeLine size={11} /> {post.readTime}
            </span>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default RelatedStories;
