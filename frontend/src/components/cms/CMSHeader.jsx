import { Link } from "react-router-dom";
import { RiSearchLine, RiAddLine, RiMenuLine } from "@remixicon/react";

const CMSHeader = ({ title, subtitle, searchValue, onSearchChange, onMenuClick, primaryAction, hideSearch }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
    <div className="flex items-start gap-3">
      {/* Mobile Hamburger Menu */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-1.5 -ml-1.5 mt-0.5 text-slate-500 hover:text-slate-800 transition-colors rounded-lg hover:bg-slate-100"
        aria-label="Open menu"
      >
        <RiMenuLine size={24} />
      </button>
      <div>
        <h1 className="font-serif text-[1.9rem] font-bold text-slate-900 leading-tight tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-slate-400 text-sm mt-0.5 font-medium">{subtitle}</p>
        )}
      </div>
    </div>

    <div className="flex items-center gap-3 flex-shrink-0">
      {/* Search */}
      {!hideSearch && (
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <RiSearchLine size={15} className="text-slate-400" />
          </div>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search posts…"
            className="bg-white border border-slate-200 text-slate-700 text-sm pl-9 pr-4 py-2 rounded-xl outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all duration-200 w-44 lg:w-52"
          />
        </div>
      )}

      {/* Action Button */}
      {primaryAction ? (
        <button
          onClick={primaryAction.onClick}
          className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white text-[13px] font-bold px-4 py-2 rounded-xl transition-all duration-200 whitespace-nowrap"
        >
          {primaryAction.icon && primaryAction.icon}
          {primaryAction.label}
        </button>
      ) : (
        <Link
          to="/posts"
          className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white text-[13px] font-bold px-4 py-2 rounded-xl transition-all duration-200 whitespace-nowrap"
        >
          <RiAddLine size={15} /> New Post
        </Link>
      )}
    </div>
  </div>
);

export default CMSHeader;
