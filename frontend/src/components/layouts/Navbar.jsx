import { useState, useEffect } from "react";
import { RiSearchLine, RiMenuLine, RiCloseLine } from "@remixicon/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Handling Search Submit by Enter Key
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };
  // Handling Search by user input
  useEffect(() => {
    if(searchQuery.length > 0){
      console.log("Searching for:", searchQuery);
    }
  }, [searchQuery])

  const navLinks = [
    { name: "Technology", href: "#" },
    { name: "Lifestyle", href: "#" },
    { name: "Business", href: "#" },
  ];

  return (
    <nav className="w-full bg-[#f8f9fa] border-t-[3px] border-[#fce7eb] border-b border-slate-200 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Left: Brand Logo & Links */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link to="/" className="font-serif font-bold text-[28px] md:text-3xl tracking-tight text-slate-900 select-none hover:opacity-90 transition-opacity">
              InkFlow
            </Link>
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-slate-600 hover:text-slate-900 text-[15px] font-medium transition-colors duration-200 relative group"
                >
                  {link.name}
                  <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-slate-900 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Search Bar & CMS Login (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <RiSearchLine className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="bg-[#f1f3f5] focus:bg-white text-slate-800 text-[14px] px-4 py-1.5 pl-9 rounded-full border border-transparent focus:border-slate-300 outline-none transition-all duration-300 w-44 lg:w-56"
              />
            </form>

            {/* CMS Login Button */}
            <button className="bg-black hover:bg-slate-800 text-white text-[12px] font-bold tracking-wider px-5 py-2.5 rounded-sm transition-all duration-200 active:scale-95 cursor-pointer">
              CMS LOGIN
            </button>
          </div>

          {/* Hamburger Menu (Mobile/Tablet) */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-colors duration-200"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <RiCloseLine className="block h-6 w-6" />
              ) : (
                <RiMenuLine className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-[300px] border-b border-slate-200 bg-[#f8f9fa]" : "max-h-0"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-4">
          {/* Navigation Links */}
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-slate-600 hover:text-slate-900 text-[15px] font-medium py-2 transition-colors duration-200 border-b border-slate-100"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Search bar inside Mobile Menu */}
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <RiSearchLine className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="bg-[#f1f3f5] focus:bg-white text-slate-800 text-[14px] px-4 py-2 pl-9 rounded-full border border-transparent focus:border-slate-300 outline-none transition-all duration-300 w-full"
            />
          </form>

          {/* CMS Login Button inside Mobile Menu */}
          <button className="w-full bg-black hover:bg-slate-800 text-white text-[12px] font-bold tracking-wider py-3 rounded-sm transition-all duration-200 active:scale-95 cursor-pointer">
            CMS LOGIN
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;