import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { IFRShieldLogo } from "../components/brand";
import { useLanguage } from "../context/language";
import { Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";

const FEATURES = [
  "AI-powered IFRS / IAS pre-audit review",
  "Professional Judgment strength analysis",
  "Evidence gap detection with IFRS references",
  "Auditor perspective simulation",
  "Multilingual Arabic & English support",
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { lang, setLang } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const isAr = lang === "ar";

  // No credentials required — any click on Sign In enters the platform.
  const handleSignIn = () => {
    setLoading(true);
    setTimeout(() => navigate("/"), 600);
  };

  return (
    <div className="min-h-screen flex" dir={isAr ? "rtl" : "ltr"}>
      {/* ── Left: dark branding panel ── */}
      <div
        className="hidden lg:flex lg:w-[46%] flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #3D2E22 0%, #5A3E2B 50%, #3D2E22 100%)" }}
      >
        {/* ambient blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #C49A3C 0%, transparent 70%)", transform: "translate(-40%, -40%)" }} />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, #8B6F5E 0%, transparent 70%)", transform: "translate(40%, 40%)" }} />
        </div>

        {/* Logo */}
        <div className="relative">
          <IFRShieldLogo size="md" light />
        </div>

        {/* Main copy */}
        <div className="relative space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border"
            style={{ background: "rgba(196,154,60,0.15)", borderColor: "rgba(196,154,60,0.3)", color: "#E8C97A" }}>
            <ShieldCheck className="w-3.5 h-3.5" />
            Enterprise Pre-Audit Intelligence
          </div>
          <h2 className="text-3xl font-bold text-white leading-snug">
            Protect your accounting submissions<br />before auditors review them.
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "#C4B8A8" }}>
            IFRShield AI evaluates Accounting Memos against IFRS and IAS standards — identifying risks, evidence gaps, and professional judgment weaknesses before external audit.
          </p>
          <div className="space-y-2.5 pt-2">
            {FEATURES.map((f, i) => (
              <div key={i} className="flex items-center gap-3 text-sm" style={{ color: "#D4C8B8" }}>
                <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "rgba(196,154,60,0.2)", border: "1px solid rgba(196,154,60,0.4)" }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#C49A3C" }} />
                </div>
                {f}
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs" style={{ color: "#7A6858" }}>
          Based on IFRS Foundation guidance. IFRShield AI is not affiliated with the IFRS Foundation.
        </p>
      </div>

      {/* ── Right: form ── */}
      <div className="flex-1 flex flex-col" style={{ background: "#FAF8F5" }}>
        {/* top bar */}
        <div className="flex items-center justify-between px-8 py-5 border-b" style={{ borderColor: "#DDD5CB" }}>
          <div className="lg:hidden"><IFRShieldLogo size="sm" /></div>
          <div className="ml-auto flex items-center gap-1 rounded-lg p-1 border" style={{ borderColor: "#DDD5CB", background: "#FFFFFF" }}>
            {(["en", "ar"] as const).map((l) => (
              <button key={l} onClick={() => setLang(l)}
                className="px-3 py-1 text-xs font-semibold rounded-md transition-all"
                style={lang === l
                  ? { background: "#6B5240", color: "#FFFFFF" }
                  : { color: "#8C7B6E" }}>
                {l === "en" ? "EN" : "عربي"}
              </button>
            ))}
          </div>
        </div>

        {/* form body */}
        <div className="flex-1 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-sm">
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-1" style={{ color: "#3D3028" }}>
                {isAr ? "مرحباً بعودتك" : "Welcome back"}
              </h1>
              <p className="text-sm" style={{ color: "#8C7B6E" }}>
                {isAr ? "سجّل الدخول إلى حساب IFRShield AI الخاص بك" : "Sign in to your IFRShield AI account"}
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium" style={{ color: "#5A4A3A" }}>
                  {isAr ? "البريد الإلكتروني" : "Email address"}
                </Label>
                <Input id="email" type="email" placeholder="name@company.com"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="h-11 text-sm"
                  style={{ borderColor: "#DDD5CB", background: "#FFFFFF" }} />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium" style={{ color: "#5A4A3A" }}>
                    {isAr ? "كلمة المرور" : "Password"}
                  </Label>
                  <button type="button" className="text-xs font-medium hover:underline" style={{ color: "#6B5240" }}>
                    {isAr ? "نسيت كلمة المرور؟" : "Forgot password?"}
                  </button>
                </div>
                <div className="relative">
                  <Input id="password" type={showPw ? "text" : "password"} placeholder="••••••••"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    className="h-11 pr-10 text-sm"
                    style={{ borderColor: "#DDD5CB", background: "#FFFFFF" }} />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: "#B8A898" }}>
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input id="remember" type="checkbox" checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded" />
                <label htmlFor="remember" className="text-sm cursor-pointer" style={{ color: "#7A6858" }}>
                  {isAr ? "تذكّرني" : "Remember me for 30 days"}
                </label>
              </div>

              <Button onClick={handleSignIn} disabled={loading}
                className="w-full h-11 text-sm font-semibold gap-2 border-0"
                style={{ background: loading ? "#9A8470" : "#6B5240", color: "#FFFFFF" }}>
                {loading
                  ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{isAr ? "جارٍ..." : "Signing in..."}</>
                  : <>{isAr ? "تسجيل الدخول" : "Sign in"} <ArrowRight className="w-4 h-4" /></>}
              </Button>
            </div>

            <div className="mt-8 pt-6 border-t flex items-center justify-center gap-2 text-xs" style={{ borderColor: "#DDD5CB", color: "#B8A898" }}>
              <ShieldCheck className="w-3.5 h-3.5" style={{ color: "#6B8F71" }} />
              {isAr ? "تشفير كامل \xb7 أمان مؤسسي" : "End-to-end encrypted \xb7 Enterprise-grade security"}
            </div>
          </div>
        </div>

        <div className="px-8 py-4 border-t text-center" style={{ borderColor: "#DDD5CB" }}>
          <button onClick={() => navigate("/landing")} className="text-xs transition-colors hover:underline" style={{ color: "#B8A898" }}>
            &larr; {isAr ? "العودة إلى الصفحة الرئيسية" : "Back to home"}
          </button>
        </div>
      </div>
    </div>
  );
}
