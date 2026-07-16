import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  RiUser3Line,
  RiMailLine,
  RiLockPasswordLine,
  RiEyeLine,
  RiEyeOffLine,
  RiArrowRightLine,
  RiShieldCheckLine,
  RiCheckLine,
  RiCameraLine,
} from "@remixicon/react";

/* ── Password strength helper ── */
const getStrength = (pw) => {
  if (!pw) return { score: 0, label: "", color: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map = [
    { label: "", color: "" },
    { label: "Weak", color: "bg-red-400" },
    { label: "Fair", color: "bg-amber-400" },
    { label: "Good", color: "bg-blue-400" },
    { label: "Strong", color: "bg-emerald-500" },
  ];
  return { score, ...map[score] };
};

const Signup = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /* ── Avatar ── */
  const [avatarPreview, setAvatarPreview] = useState(null);
  const avatarInputRef = useRef(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const initials = form.fullName
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0].toUpperCase())
    .slice(0, 2)
    .join("");

  const strength = getStrength(form.password);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required.";
    if (!form.email.trim()) errs.email = "Email address is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email.";
    if (!form.password) errs.password = "Password is required.";
    else if (form.password.length < 8) errs.password = "Minimum 8 characters.";
    if (!form.confirmPassword) errs.confirmPassword = "Please confirm your password.";
    else if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords do not match.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setIsSubmitting(true);
    // TODO: wire to real API
    await new Promise((res) => setTimeout(res, 900));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  /* ── Shared field classes ── */
  const inputBase =
    "w-full py-2.5 border rounded-xl text-slate-800 text-sm placeholder:text-slate-300 bg-white outline-none focus:ring-2 focus:ring-slate-100 transition-all duration-200";
  const inputOk = "border-slate-200 focus:border-slate-400";
  const inputErr = "border-red-300 focus:border-red-400 focus:ring-red-50";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-10">

      {/* ── Brand ── */}
      <div className="text-center mb-8">
        <Link
          to="/"
          className="font-serif font-bold text-[2.2rem] tracking-tight text-slate-900 hover:opacity-80 transition-opacity select-none"
        >
          InkFlow
        </Link>
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-slate-400 mt-1">
          Editorial Suite
        </p>
      </div>

      {/* ── Card ── */}
      <div className="w-full max-w-[460px] bg-white border border-slate-200 rounded-2xl shadow-sm px-8 py-10">

        {submitted ? (
          /* ── Success state ── */
          <div className="text-center py-4">
            <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto mb-5">
              <RiCheckLine size={26} className="text-emerald-600" />
            </div>
            <h2 className="font-serif text-xl font-bold text-slate-900 mb-2">
              Request Sent!
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Your account request has been submitted. An admin will review and
              send you access credentials shortly.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all duration-200"
            >
              Back to Sign In <RiArrowRightLine size={15} />
            </Link>
          </div>
        ) : (
          <>
            {/* Card heading */}
            <div className="mb-7">
              <h1 className="font-serif text-[1.6rem] font-bold text-slate-900 leading-tight">
                Create Account
              </h1>
              <p className="text-slate-400 text-sm mt-1 font-medium">
                Join the premiere network for modern journalism.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>

              {/* ── Profile Photo ── */}
              <div className="flex flex-col items-center gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  className="relative w-20 h-20 rounded-full group focus:outline-none"
                  aria-label="Upload profile photo"
                >
                  {/* Avatar ring */}
                  <div className="w-full h-full rounded-full border-2 border-dashed border-slate-300 group-hover:border-slate-500 transition-colors duration-200 overflow-hidden bg-slate-100 flex items-center justify-center">
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="font-serif text-xl font-bold text-slate-400 select-none">
                        {initials || <RiUser3Line size={28} className="text-slate-300" />}
                      </span>
                    )}
                  </div>
                  {/* Camera badge */}
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center border-2 border-white group-hover:bg-slate-700 transition-colors duration-200">
                    <RiCameraLine size={12} className="text-white" />
                  </div>
                </button>
                <p className="text-slate-400 text-[12px] font-medium">
                  {avatarPreview ? "Click to change photo" : "Upload profile photo"}
                </p>
                {/* Hidden file input */}
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>

              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-slate-700 text-[13px] font-semibold mb-1.5"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                    <RiUser3Line size={16} className="text-slate-400" />
                  </div>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Eleanor Rigby"
                    autoComplete="name"
                    className={`${inputBase} pl-9 pr-4 ${errors.fullName ? inputErr : inputOk}`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-500 text-[12px] mt-1.5 font-medium">{errors.fullName}</p>
                )}
              </div>

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
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@inkflow.com"
                    autoComplete="email"
                    className={`${inputBase} pl-9 pr-4 ${errors.email ? inputErr : inputOk}`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-[12px] mt-1.5 font-medium">{errors.email}</p>
                )}
              </div>

              {/* Password + Confirm (side by side) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-slate-700 text-[13px] font-semibold mb-1.5"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                      <RiLockPasswordLine size={16} className="text-slate-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      className={`${inputBase} pl-9 pr-9 ${errors.password ? inputErr : inputOk}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <RiEyeOffLine size={15} /> : <RiEyeLine size={15} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-[12px] mt-1.5 font-medium">{errors.password}</p>
                  )}
                  {/* Strength bar */}
                  {form.password && !errors.password && (
                    <div className="mt-2">
                      <div className="flex gap-1 h-1">
                        {[1, 2, 3, 4].map((s) => (
                          <div
                            key={s}
                            className={`flex-1 rounded-full transition-all duration-300 ${
                              s <= strength.score ? strength.color : "bg-slate-100"
                            }`}
                          />
                        ))}
                      </div>
                      <p className={`text-[11px] font-semibold mt-1 ${
                        strength.score <= 1 ? "text-red-500"
                        : strength.score === 2 ? "text-amber-500"
                        : strength.score === 3 ? "text-blue-500"
                        : "text-emerald-600"
                      }`}>
                        {strength.label}
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-slate-700 text-[13px] font-semibold mb-1.5"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                      <RiLockPasswordLine size={16} className="text-slate-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      className={`${inputBase} pl-9 pr-9 ${errors.confirmPassword ? inputErr : inputOk}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                      aria-label={showConfirm ? "Hide password" : "Show password"}
                    >
                      {showConfirm ? <RiEyeOffLine size={15} /> : <RiEyeLine size={15} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-[12px] mt-1.5 font-medium">{errors.confirmPassword}</p>
                  )}
                  {/* Match indicator */}
                  {form.confirmPassword && !errors.confirmPassword && form.password === form.confirmPassword && (
                    <p className="text-emerald-600 text-[11px] font-semibold mt-2 flex items-center gap-1">
                      <RiCheckLine size={13} /> Passwords match
                    </p>
                  )}
                </div>
              </div>

              {/* Terms note */}
              <p className="text-slate-400 text-[12px] leading-relaxed font-medium">
                By creating an account you agree to our{" "}
                <span className="text-slate-600 font-semibold cursor-pointer hover:underline">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-slate-600 font-semibold cursor-pointer hover:underline">
                  Privacy Policy
                </span>.
              </p>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed uppercase tracking-wider"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating…
                  </>
                ) : (
                  <>
                    Create Account
                    <RiArrowRightLine size={16} />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="border-t border-slate-100 mt-8 pt-6 text-center">
              <p className="text-slate-500 text-[13px] font-medium">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </>
        )}
      </div>

      {/* ── Security + Footer ── */}
      <p className="mt-6 flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
        <RiShieldCheckLine size={13} />
        Protected by Enterprise Encryption
      </p>

      <p className="mt-4 text-slate-300 text-[11px] font-medium flex items-center gap-3">
        <span>© {new Date().getFullYear()} InkFlow Editorial. All rights reserved.</span>
        <span className="text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">Privacy Policy</span>
        <span className="text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">Terms of Service</span>
      </p>
    </div>
  );
};

export default Signup;
