import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../features/user/user.slice";
import { useAuth } from "../../../hooks/CustomLoginHook.jsx";
import {
  RiMailLine,
  RiLockPasswordLine,
  RiEyeLine,
  RiEyeOffLine,
  RiArrowRightLine,
  RiShieldCheckLine,
} from "@remixicon/react";

const Login = () => {
  const navigate = useNavigate();
  const { toggleLoginUser } = useAuth();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then((data) => {
        toggleLoginUser();
        navigate("/");
      })
      .catch((err) => {
        setError(err?.message || "Login failed");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">

      {/* ── Brand ── */}
      <div className="text-center mb-8">
        <Link
          to="/"
          className="font-serif font-bold text-[2.2rem] tracking-tight text-slate-900 hover:opacity-80 transition-opacity select-none"
        >
          InkFlow
        </Link>
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-slate-400 mt-1">
          Editorial CMS
        </p>
      </div>

      {/* ── Card ── */}
      <div className="w-full max-w-[420px] bg-white border border-slate-200 rounded-2xl shadow-sm px-8 py-10">

        {/* Card heading */}
        <div className="mb-7">
          <h1 className="font-serif text-[1.6rem] font-bold text-slate-900 leading-tight">
            Sign In
          </h1>
          <p className="text-slate-400 text-sm mt-1 font-medium">
            Enter your editorial credentials to continue.
          </p>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-5 bg-red-50 border border-red-200 text-red-600 text-sm font-medium px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5" noValidate>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-slate-700 text-[13px] font-semibold mb-1.5"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                <RiMailLine size={16} className="text-slate-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="editor@inkflow.com"
                autoComplete="email"
                className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder:text-slate-300 bg-white outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all duration-200"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                className="text-slate-700 text-[13px] font-semibold"
              >
                Password
              </label>
              <Link
                to="/forget-password"
                className="text-[12px] font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                <RiLockPasswordLine size={16} className="text-slate-400" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full pl-9 pr-11 py-2.5 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder:text-slate-300 bg-white outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <RiEyeOffLine size={16} />
                ) : (
                  <RiEyeLine size={16} />
                )}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              id="remember-me"
              role="checkbox"
              aria-checked={rememberMe}
              onClick={() => setRememberMe((v) => !v)}
              className={`w-4 h-4 rounded border flex items-center justify-center transition-all duration-150 flex-shrink-0 ${
                rememberMe
                  ? "bg-slate-900 border-slate-900"
                  : "bg-white border-slate-300"
              }`}
            >
              {rememberMe && (
                <svg
                  width="10"
                  height="8"
                  viewBox="0 0 10 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 3.5L3.5 6.5L9 1"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
            <label
              htmlFor="remember-me"
              onClick={() => setRememberMe((v) => !v)}
              className="text-slate-500 text-[13px] font-medium cursor-pointer select-none"
            >
              Remember this device
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in…
              </>
            ) : (
              <>
                Sign In
                <RiArrowRightLine size={16} />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="border-t border-slate-100 mt-8 pt-6 text-center">
          <p className="text-slate-500 text-[13px] font-medium">
            New to InkFlow Editorial?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
            >
              Contact Admin
            </Link>
          </p>
        </div>
      </div>

      {/* ── Security note ── */}
      <p className="mt-6 flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
        <RiShieldCheckLine size={13} />
        Protected by Enterprise Encryption
      </p>
    </div>
  );
};

export default Login;
