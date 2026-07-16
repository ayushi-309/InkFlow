import { Link } from "react-router-dom";
import { RiArrowRightSLine } from "@remixicon/react";

const Breadcrumb = ({ category, title }) => (
  <nav className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-8 flex-wrap">
    <Link to="/" className="hover:text-slate-700 transition-colors">
      Home
    </Link>
    <RiArrowRightSLine size={14} className="flex-shrink-0" />
    <span className="hover:text-slate-700 transition-colors cursor-pointer">
      {category}
    </span>
    <RiArrowRightSLine size={14} className="flex-shrink-0" />
    <span className="text-slate-600 line-clamp-1 max-w-[200px] sm:max-w-xs">
      {title}
    </span>
  </nav>
);

export default Breadcrumb;
