import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { CheckCircle2, Loader2, Brain, Shield } from "lucide-react";
import { useLanguage } from "../context/language";

const STEPS = [
  { key: "Receiving File", ms: 300 },
  { key: "Reading Accounting Memo", ms: 500 },
  { key: "Detecting Accounting Topic", ms: 350 },
  { key: "Matching IFRS / IAS Standards", ms: 600 },
  { key: "Evaluating Professional Judgment", ms: 700 },
  { key: "Checking Supporting Evidence", ms: 500 },
  { key: "Detecting Missing Documentation", ms: 450 },
  { key: "Estimating Auditor Rejection Risk", ms: 500 },
  { key: "Generating Recommendations", ms: 450 },
  { key: "Building Final Report", ms: 350 },
];

type S = "waiting" | "active" | "done";

export default function AIPipelinePage() {
  const review = JSON.parse(
    sessionStorage.getItem("reviewResult") || "{}"
  );

  const navigate = useNavigate();
  const { t } = useLanguage();
  const [statuses, setStatuses] = useState<S[]>(STEPS.map(() => "waiting"));
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let delay = 400;
    STEPS.forEach((step, i) => {
      const a = delay;
      const d = delay + step.ms;
      setTimeout(() => setStatuses(p => { const n = [...p]; n[i] = "active"; return n; }), a);
      setTimeout(() => setStatuses(p => { const n = [...p]; n[i] = "done"; return n; }), d);
      delay += step.ms + 100;
    });
    setTimeout(() => {
    setFinished(true);
    // Mark that a review has been completed — dashboard activates live state
    sessionStorage.setItem("ifrshield_has_review", "true");
    setTimeout(() => navigate("/review-results/1"), 900);
  }, delay + 300);
  }, []);

  const done = statuses.filter(s => s === "done").length;
  const pct = Math.round((done / STEPS.length) * 100);

  return (
    <div className="min-h-full bg-slate-950 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/15 rounded-full blur-3xl pointer-events-none" />
      <div className="relative w-full max-w-xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-900/30 border border-blue-800/40 mb-5">
            <Brain className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">{t("AI Analysis in Progress")}</h1>
          <p className="text-sm text-slate-400">Evaluating {review.company || "Accounting Memo"} against IFRS / IAS standards</p>
        </div>
        <div className="mb-6">
          <div className="flex justify-between text-xs text-slate-500 mb-2">
            <span>{done} / {STEPS.length} steps</span>
            <span className="font-mono tabular-nums">{pct}%</span>
          </div>
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-800/60 backdrop-blur">
          {STEPS.map((step, i) => {
            const s = statuses[i];
            return (
              <div key={step.key} className={`flex items-center gap-4 px-5 py-3.5 transition-all duration-200 ${s === "active" ? "bg-blue-900/20" : ""}`}>
                <div className="w-7 h-7 shrink-0 flex items-center justify-center">
                  {s === "done" && <div className="w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /></div>}
                  {s === "active" && <div className="w-7 h-7 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center"><Loader2 className="w-3.5 h-3.5 text-blue-400 animate-spin" /></div>}
                  {s === "waiting" && <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center"><span className="text-xs font-mono text-slate-600">{i + 1}</span></div>}
                </div>
                <span className={`text-sm font-medium flex-1 transition-colors duration-200 ${s === "done" ? "text-slate-500" : s === "active" ? "text-white" : "text-slate-700"}`}>
                  {t(step.key)}
                </span>
                {s === "done" && <span className="text-xs text-emerald-500 font-medium">Done</span>}
                {s === "active" && <span className="text-xs text-blue-400 animate-pulse">Processing...</span>}
              </div>
            );
          })}
        </div>
        {finished && (
          <div className="mt-6 flex items-center justify-center gap-2 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-sm font-medium">{t("Analysis complete -- redirecting to results")}</span>
          </div>
        )}
        <div className="mt-8 text-center">
          <span className="inline-flex items-center gap-2 text-xs text-slate-700">
            <Shield className="w-3.5 h-3.5" />IFRShield AI · Enterprise Pre-Audit Intelligence
          </span>
        </div>
      </div>
    </div>
  );
}
