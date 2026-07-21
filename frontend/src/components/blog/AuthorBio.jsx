import { RiUser3Line } from "@remixicon/react";

const AuthorBio = ({ author, authorRole, authorBio, authorAvatar }) => {
  const initials = author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="mt-12 rounded-2xl border border-slate-100 bg-slate-50/60 p-6 md:p-8 flex flex-col sm:flex-row gap-5 items-start">
      {/* Avatar */}
      {authorAvatar ? (
        <img src={authorAvatar} alt={author} className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
      ) : (
        <div className="w-14 h-14 rounded-full bg-slate-900 flex items-center justify-center text-white text-lg font-bold select-none flex-shrink-0">
          {initials}
        </div>
      )}

      <div className="flex-1">
        {/* Name + Follow */}
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <p className="font-serif text-lg font-bold text-slate-900">
              {author}
            </p>
            <p className="text-slate-400 text-sm font-medium mt-0.5">
              {authorRole}
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-slate-600 text-sm leading-relaxed mt-3 font-normal">
          {authorBio}
        </p>
      </div>
    </div>
  );
};

export default AuthorBio;
