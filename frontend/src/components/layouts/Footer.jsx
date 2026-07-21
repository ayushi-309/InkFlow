import { RiGlobeLine, RiAtLine, RiShareLine } from "@remixicon/react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();


  const brandLinks = [
    { name: "About", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <footer className="w-full bg-white border-t border-slate-200 pt-12 md:pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          
          {/* Left Column: Brand & Tagline */}
          <div className="md:col-span-6 flex flex-col space-y-4">
            <Link to="/" className="font-serif font-bold text-[28px] md:text-3xl tracking-tight text-slate-900 select-none hover:opacity-90 transition-opacity w-fit">
              InkFlow
            </Link>
            <p className="text-slate-600 text-[14px] md:text-[15px] leading-relaxed max-w-sm font-normal">
              A modern editorial engine for the forward-thinking professional. Depth, clarity, and authority in every piece.
            </p>
            
            {/* Social / Utility Icons */}
            <div className="flex items-center gap-4 pt-2">
              <Link to="#" className="text-slate-600 hover:text-slate-950 transition-colors duration-200" aria-label="Website">
                <RiGlobeLine size={20} />
              </Link>
              <Link to="#" className="text-slate-600 hover:text-slate-950 transition-colors duration-200" aria-label="Contact">
                <RiAtLine size={20} />
              </Link>
              <Link to="#" className="text-slate-600 hover:text-slate-950 transition-colors duration-200" aria-label="Share">
                <RiShareLine size={20} />
              </Link>
            </div>
          </div>

          {/* Right Columns: Navigation Links */}
          <div className="md:col-span-6 grid grid-cols-1 gap-8 md:justify-items-end">
            
            {/* Column 2: InkFlow */}
            <div className="space-y-4 md:w-32">
              <h4 className="text-slate-900 text-[13px] font-bold uppercase tracking-wider">
                InkFlow
              </h4>
              <ul className="space-y-2.5">
                {brandLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-slate-600 hover:text-slate-900 text-[14px] font-medium transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="border-t border-slate-200 mt-12 pt-6">
          <p className="text-center text-xs text-slate-500 font-medium">
            &copy; {currentYear} InkFlow Editorial. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;