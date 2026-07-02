import { useNavigate } from "react-router";
import { IFRShieldLogo } from "../components/brand";
import { useLanguage } from "../context/language";
import {
  ShieldCheck, FileCheck, Scale, AlertTriangle,
  ArrowRight, CheckCircle2, BarChart3,
} from "lucide-react";
import { Button } from "../components/ui/button";

const FEATURES = [
  { icon: ShieldCheck, title: "AI Pre-Audit Review", desc: "Automatically evaluate accounting memos against IFRS and IAS standards before external audit submission." },
  { icon: Scale, title: "Professional Judgment Analysis", desc: "Assess the strength of accounting conclusions, identify weak justifications, and predict auditor challenge areas." },
  { icon: FileCheck, title: "Evidence Gap Detection", desc: "Identify missing documentation across Critical, Medium, and Strong severity levels with specific IFRS paragraph references." },
  { icon: AlertTriangle, title: "Auditor Perspective Simulation", desc: "Simulate the questions your external auditors will ask — so you can address them proactively before submission." },
  { icon: BarChart3, title: "Actionable Action Plans", desc: "Receive prioritised remediation plans with IFRS references, time estimates, and department ownership." },
  { icon: CheckCircle2, title: "Multilingual Support", desc: "Full Arabic and English interface with RTL layout support for regional accounting teams." },
];

const STANDARDS = ["IFRS 9", "IFRS 15", "IFRS 16", "IFRS 13", "IFRS 10", "IAS 36"];

const BROWN = "#6B5240";
const CREAM = "#FAF8F5";
const BORDER = "#DDD5CB";
const MUTED = "#8C7B6E";
const DARK = "#3D3028";

export default function LandingPage() {
  const navigate = useNavigate();
  const { lang, setLang } = useLanguage();

  // Both CTA buttons go directly into the platform — no login barrier.
  const enter = () => navigate("/");

  return (
    <div className="min-h-screen flex flex-col" style={{ background: CREAM, color: DARK }}>
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b" style={{ background: "rgba(250,248,245,0.95)", borderColor: BORDER, backdropFilter: "blur(8px)" }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <IFRShieldLogo size="sm" />
          <div className="flex items-center gap-4">
            {/* Language toggle */}
            <div className="flex items-center gap-1 rounded-lg p-1 border" style={{ borderColor: BORDER, background: "#FFFFFF" }}>
              {(["en", "ar"] as const).map((l) => (
                <button key={l} onClick={() => setLang(l)}
                  className="px-3 py-1 text-xs font-semibold rounded-md transition-all"
                  style={lang === l ? { background: BROWN, color: "#FFFFFF" } : { color: MUTED }}>
                  {l === "en" ? "EN" : "عربي"}
                </button>
              ))}
            </div>
            <button onClick={() => navigate("/login")}
              className="text-sm font-medium px-4 py-2 rounded-lg border transition-all hover:opacity-80"
              style={{ borderColor: BORDER, color: DARK, background: "#FFFFFF" }}>
              Sign In
            </button>
            <button onClick={enter}
              className="text-sm font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all hover:opacity-90"
              style={{ background: BROWN, color: "#FFFFFF" }}>
              Get Started <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8 border"
            style={{ background: "#F2EDE7", borderColor: "#C4B8AD", color: BROWN }}>
            <ShieldCheck className="w-3.5 h-3.5" />
            Trusted by Big Four partner firms and leading financial institutions
          </div>

          <h1 className="text-5xl font-bold leading-tight mb-6 max-w-4xl mx-auto" style={{ color: DARK }}>
            AI-Powered Pre-Audit Intelligence Platform
          </h1>

          <p className="text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: MUTED }}>
            IFRShield AI evaluates accounting memos against IFRS and IAS standards before you submit to auditors —
            identifying evidence gaps, weak professional judgment, and audit risk in minutes.
          </p>

          <div className="flex items-center justify-center gap-4 mb-14">
            <button onClick={enter}
              className="flex items-center gap-2 px-8 h-12 rounded-xl text-base font-semibold transition-all hover:opacity-90"
              style={{ background: BROWN, color: "#FFFFFF" }}>
              Start Free Review <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => navigate("/login")}
              className="px-8 h-12 rounded-xl text-base font-medium border transition-all hover:opacity-80"
              style={{ borderColor: BORDER, color: DARK, background: "#FFFFFF" }}>
              Sign In
            </button>
          </div>

          {/* Standards strip */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="text-xs mr-2" style={{ color: MUTED }}>Covers:</span>
            {STANDARDS.map((s) => (
              <span key={s} className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg border"
                style={{ color: DARK, background: "#F2EDE7", borderColor: BORDER }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="border-t border-b" style={{ background: "#F5EFE8", borderColor: BORDER }}>
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold mb-3" style={{ color: DARK }}>Built for Accounting Professionals</h2>
              <p className="max-w-xl mx-auto" style={{ color: MUTED }}>Every feature is designed around the IFRS/IAS review process — not generic AI tools.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {FEATURES.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="bg-white border rounded-2xl p-6 hover:shadow-md transition-shadow" style={{ borderColor: BORDER }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 border"
                      style={{ background: "#F2EDE7", borderColor: "#C4B8AD" }}>
                      <Icon className="w-5 h-5" style={{ color: BROWN }} />
                    </div>
                    <h3 className="text-base font-semibold mb-2" style={{ color: DARK }}>{f.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{f.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA banner */}
        <div style={{ background: "#3D2E22" }}>
          <div className="max-w-7xl mx-auto px-6 py-20 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to audit-proof your submissions?</h2>
            <p className="mb-8 max-w-md mx-auto" style={{ color: "#C4B8A8" }}>
              Join accounting teams at leading banks and financial institutions using IFRShield AI.
            </p>
            <button onClick={enter}
              className="inline-flex items-center gap-2 px-10 h-12 rounded-xl text-base font-semibold transition-all hover:opacity-90"
              style={{ background: "#D4B896", color: "#3D2E22" }}>
              Get Started Free <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t" style={{ background: "#FFFFFF", borderColor: BORDER }}>
          <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between flex-wrap gap-4">
            <IFRShieldLogo size="xs" />
            <p className="text-xs" style={{ color: "#B8A898" }}>Based on IFRS Foundation guidance. IFRShield AI is not affiliated with the IFRS Foundation.</p>
            <p className="text-xs" style={{ color: "#B8A898" }}>&copy; 2026 IFRShield AI. All rights reserved.</p>
          </div>
        </footer>
      </section>
    </div>
  );
}
