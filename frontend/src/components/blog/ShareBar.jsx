import { useState } from "react";
import {
  RiTwitterXLine,
  RiLinkedinBoxLine,
  RiLinkM,
} from "@remixicon/react";

const BASE_BTN =
  "flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-400 hover:bg-slate-50 transition-all duration-200";

const ShareBar = ({ vertical = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`flex ${vertical ? "flex-col" : "flex-row"} items-center gap-2`}
    >
      <button className={BASE_BTN} aria-label="Share on X">
        <RiTwitterXLine size={15} />
      </button>
      <button className={BASE_BTN} aria-label="Share on LinkedIn">
        <RiLinkedinBoxLine size={15} />
      </button>
      <button
        className={`${BASE_BTN} ${copied ? "border-emerald-400 text-emerald-600" : ""}`}
        onClick={handleCopy}
        aria-label="Copy link"
        title={copied ? "Copied!" : "Copy link"}
      >
        <RiLinkM size={15} />
      </button>
    </div>
  );
};

export default ShareBar;
