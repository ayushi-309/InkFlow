import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  RiMailLine,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiShieldCheckLine,
  RiLockPasswordLine,
  RiEyeLine,
  RiEyeOffLine,
  RiCheckLine,
  RiRefreshLine,
} from "@remixicon/react";

/* ─── Password strength ─── */
const getStrength = (pw) => {
  if (!pw) return { score: 0, label: "", color: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map = [
    { label: "", color: "" },
    { label: "Weak",   color: "bg-red-400"    },
    { label: "Fair",   color: "bg-amber-400"  },
    { label: "Good",   color: "bg-blue-400"   },
    { label: "Strong", color: "bg-emerald-500"},
  ];
  return { score, ...map[score] };
};

/* ─── OTP digit input ─── */
const OTP_LENGTH = 6;

const OtpInput = ({ value, onChange, error }) => {
  const refs = Array.from({ length: OTP_LENGTH }, () => useRef(null));

  const handleKey = (e, idx) => {
    if (e.key === "Backspace") {
      if (!value[idx] && idx > 0) refs[idx - 1].current?.focus();
    }
  };

  const handleChange = (e, idx) => {
    const char = e.target.value.replace(/\D/g, "").slice(-1);
    const next = value.split("");
    next[idx] = char;
    const joined = next.join("");
    onChange(joined);
    if (char && idx < OTP_LENGTH - 1) refs[idx + 1].current?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    onChange(pasted.padEnd(OTP_LENGTH, "").slice(0, OTP_LENGTH));
    const nextFocus = Math.min(pasted.length, OTP_LENGTH - 1);
    refs[nextFocus].current?.focus();
  };

  return (
    <div className="flex gap-2.5 justify-center">
      {Array.from({ length: OTP_LENGTH }).map((_, idx) => (
        <input
          key={idx}
          ref={refs[idx]}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[idx] ?? ""}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKey(e, idx)}
          onPaste={handlePaste}
          className={`w-11 h-12 text-center text-lg font-bold border rounded-xl outline-none transition-all duration-200 focus:ring-2 ${
            error
              ? "border-red-300 text-red-600 focus:border-red-400 focus:ring-red-50"
              : value[idx]
              ? "border-slate-800 bg-slate-50 text-slate-900 focus:border-slate-900 focus:ring-slate-100"
              : "border-slate-200 text-slate-900 focus:border-slate-400 focus:ring-slate-100"
          }`}
        />
      ))}
    </div>
  );
};

/* ─── Resend countdown ─── */
const useCountdown = (seconds) => {
  const [remaining, setRemaining] = useState(seconds);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (!active) return;
    if (remaining <= 0) { setActive(false); return; }
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining, active]);

  const restart = () => { setRemaining(seconds); setActive(true); };
  return { remaining, canResend: !active, restart };
};

/* ─────────────────────────── Main component ─────────────────────────── */
const ForgetPassword = () => {
  const [step, setStep] = useState(1); // 1 = email, 2 = otp, 3 = new password, 4 = done

  /* Step 1 */
  const [email, setEmail]         = useState("");
  const [emailError, setEmailErr] = useState("");
  const [sendingOtp, setSending]  = useState(false);

  /* Step 2 */
  const [otp, setOtp]             = useState("");
  const [otpError, setOtpError]   = useState("");
  const [verifying, setVerifying] = useState(false);
  const { remaining, canResend, restart } = useCountdown(60);

  /* Step 3 */
  const [newPw, setNewPw]         = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showNew, setShowNew]     = useState(false);
  const [showConfirm, setShowCon] = useState(false);
  const [pwErrors, setPwErrors]   = useState({});
  const [resetting, setResetting] = useState(false);

  const strength = getStrength(newPw);

  /* ── Handlers ── */
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setEmailErr("");
    if (!email.trim()) { setEmailErr("Email address is required."); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setEmailErr("Enter a valid email address."); return; }
    setSending(true);
    await new Promise((r) => setTimeout(r, 900)); // TODO: real API
    setSending(false);
    setStep(2);
  };

  const handleResend = async () => {
    if (!canResend) return;
    setOtp("");
    setOtpError("");
    restart();
    await new Promise((r) => setTimeout(r, 500)); // TODO: real resend API
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setOtpError("");
    if (otp.length < OTP_LENGTH) { setOtpError("Enter the complete 6-digit code."); return; }
    setVerifying(true);
    await new Promise((r) => setTimeout(r, 900)); // TODO: real verify API
    setVerifying(false);
    setStep(3);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!newPw) errs.newPw = "New password is required.";
    else if (newPw.length < 8) errs.newPw = "Minimum 8 characters.";
    if (!confirmPw) errs.confirmPw = "Please confirm your password.";
    else if (newPw !== confirmPw) errs.confirmPw = "Passwords do not match.";
    if (Object.keys(errs).length) { setPwErrors(errs); return; }
    setResetting(true);
    await new Promise((r) => setTimeout(r, 900)); // TODO: real reset API
    setResetting(false);
    setStep(4);
  };

  /* ── Shared classes ── */
  const inputBase = "w-full py-2.5 border rounded-xl text-slate-800 text-sm placeholder:text-slate-300 bg-white outline-none focus:ring-2 focus:ring-slate-100 transition-all duration-200";
  const inputOk   = "border-slate-200 focus:border-slate-400";
  const inputErr  = "border-red-300 focus:border-red-400 focus:ring-red-50";

  /* ── Step indicator ── */
  const steps = ["Email", "Verify", "Reset"];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-10">

      {/* Brand */}
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

      {/* Card */}
      <div className="w-full max-w-[420px] bg-white border border-slate-200 rounded-2xl shadow-sm px-8 py-10">

        {/* ─── Step 4: Success ─── */}
        {step === 4 ? (
          <div className="text-center py-2">
            <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto mb-5">
              <RiCheckLine size={28} className="text-emerald-600" />
            </div>
            <h2 className="font-serif text-[1.5rem] font-bold text-slate-900 mb-2">
              Password Reset!
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-7 font-medium">
              Your password has been updated successfully. You can now sign in
              with your new credentials.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all duration-200"
            >
              <RiArrowLeftLine size={15} /> Back to Sign In
            </Link>
          </div>
        ) : (
          <>
            {/* Progress indicator */}
            <div className="flex items-center gap-2 mb-8">
              {steps.map((label, i) => {
                const stepNum = i + 1;
                const done    = step > stepNum;
                const active  = step === stepNum;
                return (
                  <div key={label} className="flex items-center gap-2 flex-1 last:flex-none">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300 flex-shrink-0 ${
                          done   ? "bg-emerald-500 text-white"
                        : active ? "bg-slate-900 text-white"
                        :          "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {done ? <RiCheckLine size={12} /> : stepNum}
                      </div>
                      <span
                        className={`text-[12px] font-semibold transition-colors duration-200 ${
                          active ? "text-slate-900" : done ? "text-emerald-600" : "text-slate-400"
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`flex-1 h-px mx-1 transition-colors duration-300 ${done ? "bg-emerald-400" : "bg-slate-100"}`} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* ─── Step 1: Email ─── */}
            {step === 1 && (
              <>
                <div className="mb-6">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <RiMailLine size={22} className="text-slate-600" />
                  </div>
                  <h1 className="font-serif text-[1.6rem] font-bold text-slate-900 leading-tight">
                    Forgot Password?
                  </h1>
                  <p className="text-slate-400 text-sm mt-1 font-medium">
                    Enter your email and we'll send a 6-digit OTP.
                  </p>
                </div>

                {emailError && (
                  <div className="mb-5 bg-red-50 border border-red-200 text-red-600 text-sm font-medium px-4 py-3 rounded-xl">
                    {emailError}
                  </div>
                )}

                <form onSubmit={handleSendOtp} className="space-y-5" noValidate>
                  <div>
                    <label htmlFor="email" className="block text-slate-700 text-[13px] font-semibold mb-1.5">
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
                        onChange={(e) => { setEmail(e.target.value); setEmailErr(""); }}
                        placeholder="editor@inkflow.com"
                        autoComplete="email"
                        className={`${inputBase} pl-9 pr-4 ${emailError ? inputErr : inputOk}`}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={sendingOtp}
                    className="w-full bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sendingOtp ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending OTP…</>
                    ) : (
                      <>Send OTP <RiArrowRightLine size={16} /></>
                    )}
                  </button>
                </form>

                <div className="border-t border-slate-100 mt-7 pt-5 text-center">
                  <Link to="/login" className="flex items-center justify-center gap-1.5 text-slate-500 hover:text-slate-900 text-[13px] font-medium transition-colors">
                    <RiArrowLeftLine size={14} /> Back to Sign In
                  </Link>
                </div>
              </>
            )}

            {/* ─── Step 2: OTP ─── */}
            {step === 2 && (
              <>
                <div className="mb-6">
                  <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-full flex items-center justify-center mb-4">
                    <RiShieldCheckLine size={22} className="text-indigo-500" />
                  </div>
                  <h1 className="font-serif text-[1.6rem] font-bold text-slate-900 leading-tight">
                    Enter OTP
                  </h1>
                  <p className="text-slate-400 text-sm mt-1 font-medium">
                    We sent a 6-digit code to{" "}
                    <span className="text-slate-700 font-semibold">{email}</span>
                  </p>
                </div>

                <form onSubmit={handleVerifyOtp} className="space-y-6" noValidate>
                  <div className="space-y-3">
                    <OtpInput value={otp} onChange={setOtp} error={!!otpError} />
                    {otpError && (
                      <p className="text-red-500 text-[12px] font-medium text-center">{otpError}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={verifying || otp.length < OTP_LENGTH}
                    className="w-full bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {verifying ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Verifying…</>
                    ) : (
                      <>Verify OTP <RiArrowRightLine size={16} /></>
                    )}
                  </button>
                </form>

                {/* Resend */}
                <div className="mt-6 text-center">
                  <p className="text-slate-400 text-[13px] font-medium">
                    Didn't receive it?{" "}
                    {canResend ? (
                      <button
                        onClick={handleResend}
                        className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors inline-flex items-center gap-1"
                      >
                        <RiRefreshLine size={13} /> Resend OTP
                      </button>
                    ) : (
                      <span className="text-slate-500 font-semibold">
                        Resend in {remaining}s
                      </span>
                    )}
                  </p>
                </div>

                <div className="border-t border-slate-100 mt-5 pt-5 text-center">
                  <button
                    onClick={() => { setStep(1); setOtp(""); setOtpError(""); }}
                    className="flex items-center justify-center gap-1.5 text-slate-500 hover:text-slate-900 text-[13px] font-medium transition-colors mx-auto"
                  >
                    <RiArrowLeftLine size={14} /> Change email
                  </button>
                </div>
              </>
            )}

            {/* ─── Step 3: New Password ─── */}
            {step === 3 && (
              <>
                <div className="mb-6">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <RiLockPasswordLine size={22} className="text-slate-600" />
                  </div>
                  <h1 className="font-serif text-[1.6rem] font-bold text-slate-900 leading-tight">
                    New Password
                  </h1>
                  <p className="text-slate-400 text-sm mt-1 font-medium">
                    Choose a strong password for your account.
                  </p>
                </div>

                <form onSubmit={handleResetPassword} className="space-y-5" noValidate>
                  {/* New password */}
                  <div>
                    <label htmlFor="newPw" className="block text-slate-700 text-[13px] font-semibold mb-1.5">
                      New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                        <RiLockPasswordLine size={16} className="text-slate-400" />
                      </div>
                      <input
                        id="newPw"
                        type={showNew ? "text" : "password"}
                        value={newPw}
                        onChange={(e) => { setNewPw(e.target.value); setPwErrors((p) => ({ ...p, newPw: "" })); }}
                        placeholder="••••••••"
                        autoComplete="new-password"
                        className={`${inputBase} pl-9 pr-10 ${pwErrors.newPw ? inputErr : inputOk}`}
                      />
                      <button type="button" onClick={() => setShowNew((v) => !v)}
                        className="absolute inset-y-0 right-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors">
                        {showNew ? <RiEyeOffLine size={16} /> : <RiEyeLine size={16} />}
                      </button>
                    </div>
                    {pwErrors.newPw && <p className="text-red-500 text-[12px] mt-1.5 font-medium">{pwErrors.newPw}</p>}
                    {/* Strength bar */}
                    {newPw && !pwErrors.newPw && (
                      <div className="mt-2">
                        <div className="flex gap-1 h-1">
                          {[1,2,3,4].map((s) => (
                            <div key={s} className={`flex-1 rounded-full transition-all duration-300 ${s <= strength.score ? strength.color : "bg-slate-100"}`} />
                          ))}
                        </div>
                        <p className={`text-[11px] font-semibold mt-1 ${
                          strength.score <= 1 ? "text-red-500"
                          : strength.score === 2 ? "text-amber-500"
                          : strength.score === 3 ? "text-blue-500"
                          : "text-emerald-600"
                        }`}>{strength.label}</p>
                      </div>
                    )}
                  </div>

                  {/* Confirm password */}
                  <div>
                    <label htmlFor="confirmPw" className="block text-slate-700 text-[13px] font-semibold mb-1.5">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                        <RiLockPasswordLine size={16} className="text-slate-400" />
                      </div>
                      <input
                        id="confirmPw"
                        type={showConfirm ? "text" : "password"}
                        value={confirmPw}
                        onChange={(e) => { setConfirmPw(e.target.value); setPwErrors((p) => ({ ...p, confirmPw: "" })); }}
                        placeholder="••••••••"
                        autoComplete="new-password"
                        className={`${inputBase} pl-9 pr-10 ${pwErrors.confirmPw ? inputErr : inputOk}`}
                      />
                      <button type="button" onClick={() => setShowCon((v) => !v)}
                        className="absolute inset-y-0 right-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors">
                        {showConfirm ? <RiEyeOffLine size={16} /> : <RiEyeLine size={16} />}
                      </button>
                    </div>
                    {pwErrors.confirmPw && <p className="text-red-500 text-[12px] mt-1.5 font-medium">{pwErrors.confirmPw}</p>}
                    {confirmPw && !pwErrors.confirmPw && newPw === confirmPw && (
                      <p className="text-emerald-600 text-[11px] font-semibold mt-2 flex items-center gap-1">
                        <RiCheckLine size={12} /> Passwords match
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={resetting}
                    className="w-full bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {resetting ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Resetting…</>
                    ) : (
                      <>Reset Password <RiArrowRightLine size={16} /></>
                    )}
                  </button>
                </form>
              </>
            )}
          </>
        )}
      </div>

      {/* Security note */}
      <p className="mt-6 flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
        <RiShieldCheckLine size={13} />
        Protected by Enterprise Encryption
      </p>
    </div>
  );
};

export default ForgetPassword;
