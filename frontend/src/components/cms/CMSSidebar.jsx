import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../features/user/user.slice";
import { useAuth } from "../../hooks/CustomLoginHook.jsx";
import {
  RiDashboardLine,
  RiArticleLine,
  RiPriceTag3Line,
  RiUser3Line,
  RiAddLine,
  RiLogoutBoxRLine,
  RiCloseLine,
} from "@remixicon/react";

const NAV_LINKS = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: RiDashboardLine
  },
  {
    label: "Posts",
    to: "/posts",
    icon: RiArticleLine
  },
  {
    label: "Categories", 
    to: "/categories",
    icon: RiPriceTag3Line
  },
  { 
    label: "User", 
    to: "/user", 
    icon: RiUser3Line 
  },
];


const CMSSidebar = ({ isOpen, onClose }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.data?.data);
  const { toggleLoginUser } = useAuth();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        toggleLoginUser();
        navigate("/login");
        // reload page 
        window.location.reload();
      })
      .catch((err) => {
        console.error("Logout failed:", err);
      });
  };

  const handleNavClick = () => {
    // Close drawer on mobile after navigating
    onClose?.();
  };

  const sidebarContent = (
    <aside className="w-[220px] h-full bg-slate-950 flex flex-col flex-shrink-0">
      {/* Brand */}
      <div className="px-6 py-6 border-b border-slate-800 flex items-center justify-between">
        <div>
          <Link
            to="/"
            onClick={handleNavClick}
            className="font-serif font-bold text-[1.4rem] tracking-tight text-white hover:opacity-80 transition-opacity select-none"
          >
            InkFlow
          </Link>
          <p className="text-slate-500 text-[11px] font-semibold tracking-wider uppercase mt-0.5">
            Admin Panel
          </p>
        </div>
        {/* Close button — mobile only */}
        <button
          onClick={onClose}
          className="lg:hidden text-slate-400 hover:text-white transition-colors p-1"
          aria-label="Close menu"
        >
          <RiCloseLine size={20} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV_LINKS.map(({ label, to, icon: Icon }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              onClick={handleNavClick}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-200 ${
                active
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}
            >
              <Icon
                size={17}
                className={active ? "text-white" : "text-slate-500"}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* New Post CTA */}
      <div className="px-4 pb-4">
        <Link
          to="/posts"
          onClick={handleNavClick}
          className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white text-[13px] font-bold py-2.5 rounded-xl transition-all duration-200"
        >
          <RiAddLine size={16} /> New Post
        </Link>
      </div>

      {/* User footer */}
      {user && (
        <div className="px-4 py-4 border-t border-slate-800 flex items-center gap-3">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.fullname}
              className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-slate-700"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white text-xs font-bold select-none flex-shrink-0">
              {user.fullname?.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-slate-200 text-[13px] font-semibold leading-none truncate">
              {user.fullname}
            </p>
            <p className="text-slate-500 text-[11px] font-medium mt-0.5 truncate">
              Logged in
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="text-slate-500 hover:text-red-400 transition-colors"
            aria-label="Log out"
            title="Log out"
          >
            <RiLogoutBoxRLine size={17} />
          </button>
        </div>
      )}
    </aside>
  );

  return (
    <>
      {/* ── Desktop: always-visible sidebar ── */}
      <div className="hidden lg:flex h-[100dvh] flex-shrink-0">
        {sidebarContent}
      </div>

      {/* ── Mobile: slide-out drawer ── */}
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />
      {/* Drawer */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-50 h-full transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </div>
    </>
  );
};

export default CMSSidebar;
