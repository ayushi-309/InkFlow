import {
  RiTwitterXLine,
  RiLinkedinBoxLine,
  RiLinkM,
} from "@remixicon/react";

const ShareWidget = () => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5">
      <p className="text-slate-900 text-[13px] font-bold uppercase tracking-wider mb-4">
        Share this article
      </p>
      <div className="flex flex-col gap-2.5">
        <button className="flex items-center gap-3 text-sm text-slate-700 font-medium px-4 py-2.5 rounded-xl border border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-all duration-200">
          <RiTwitterXLine size={15} className="text-slate-500" /> Share on X
        </button>
        <button className="flex items-center gap-3 text-sm text-slate-700 font-medium px-4 py-2.5 rounded-xl border border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-all duration-200">
          <RiLinkedinBoxLine size={15} className="text-slate-500" /> Share on
          LinkedIn
        </button>
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-3 text-sm text-slate-700 font-medium px-4 py-2.5 rounded-xl border border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-all duration-200"
        >
          <RiLinkM size={15} className="text-slate-500" /> Copy link
        </button>
      </div>
    </div>
  );
};

export default ShareWidget;
