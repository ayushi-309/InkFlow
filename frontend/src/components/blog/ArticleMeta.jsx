import { useState } from "react";
import {
  RiTimeLine,
  RiCalendarLine,
  RiBookmarkLine,
  RiBookmarkFill,
} from "@remixicon/react";
import ShareBar from "./ShareBar";

const ArticleMeta = ({ author, authorRole, date, readTime, authorAvatar }) => {
  const [bookmarked, setBookmarked] = useState(false);

  const initials = author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="flex flex-wrap items-center gap-5 pb-7 border-b border-slate-100 mb-8">
      {/* Author */}
      <div className="flex items-center gap-3">
        {authorAvatar ? (
          <img
            src={authorAvatar}
            alt={author}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white text-sm font-bold select-none flex-shrink-0">
            {initials}
          </div>
        )}
        <div>
          <p className="text-slate-800 text-sm font-semibold leading-none mb-0.5">
            {author}
          </p>
          <p className="text-slate-400 text-[12px] font-medium">{authorRole}</p>
        </div>
      </div>

      {/* Divider */}
      <span className="hidden sm:block w-px h-7 bg-slate-200" />

      {/* Date & Read time */}
      <div className="flex items-center gap-4 text-slate-400 text-[13px] font-medium">
        <span className="flex items-center gap-1.5">
          <RiCalendarLine size={14} />
          {date}
        </span>
        <span className="flex items-center gap-1.5">
          <RiTimeLine size={14} />
          {readTime}
        </span>
      </div>

      {/* Spacer + Actions */}
      <div className="ml-auto flex items-center gap-3">
        {/* Bookmark */}
        <button
          onClick={() => setBookmarked((b) => !b)}
          className="flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-400 hover:bg-slate-50 transition-all duration-200"
          aria-label="Bookmark"
        >
          {bookmarked ? (
            <RiBookmarkFill size={16} className="text-indigo-600" />
          ) : (
            <RiBookmarkLine size={16} />
          )}
        </button>

        {/* Share */}
        <ShareBar />
      </div>
    </div>
  );
};

export default ArticleMeta;
