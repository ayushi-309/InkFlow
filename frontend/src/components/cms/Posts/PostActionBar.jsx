import { RiMenuLine, RiLoader4Line, RiCheckLine } from "@remixicon/react";

const PostActionBar = ({ status, isSaving, handleSave, setIsSidebarOpen }) => {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 px-6 lg:px-8 py-4 border-b border-slate-100 flex-shrink-0">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-1.5 -ml-1.5 text-slate-500 hover:text-slate-800 transition-colors rounded-lg hover:bg-slate-100"
          aria-label="Open menu"
        >
          <RiMenuLine size={24} />
        </button>
        <div className="flex items-center gap-3">
          <span className="text-[13px] font-semibold text-slate-500">Status:</span>
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
            status === "Published" ? "bg-emerald-50 text-emerald-700" : "bg-indigo-50 text-indigo-700"
          }`}>
            {status}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={() => handleSave("Draft")}
          disabled={isSaving}
          className="px-4 py-2 border border-slate-200 text-slate-700 text-[13px] font-bold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-colors whitespace-nowrap disabled:opacity-50"
        >
          {isSaving && status === "Draft" ? <RiLoader4Line size={16} className="animate-spin inline mr-1" /> : null}
          Save Draft
        </button>
        <button 
          onClick={() => handleSave("Published")}
          disabled={isSaving}
          className="px-5 py-2 bg-slate-900 text-white text-[13px] font-bold rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all whitespace-nowrap disabled:opacity-50 flex items-center gap-1.5"
        >
          {isSaving && status === "Published" ? (
            <RiLoader4Line size={16} className="animate-spin" />
          ) : status === "Published" ? (
            <RiCheckLine size={16} />
          ) : null}
          {status === "Published" ? "Update" : "Publish"}
        </button>
      </div>
    </header>
  );
};

export default PostActionBar;
