import { useState, useEffect, type ComponentType } from "react";
import { useParams, useNavigate } from "react-router";
import { useLanguage } from "../context/language";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  ShieldCheck,
  FileCheck,
  Scale,
  AlertTriangle,
  Download,
  Share2,
  BookOpen,
  XCircle,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Zap,
  GitCompare,
  Info,
  HelpCircle,
  Clock,
  Users,
  TrendingUp,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Star,
  FileText,
  BarChart3,
} from "lucide-react";

// ─── Animated counter hook ────────────────────────────────────────────────────

function useCounter(target: number, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return value;
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Severity = "critical" | "medium" | "strong";
type QuestionStatus = "missing" | "incomplete" | "partial" | "complete";

interface ScoreReason {
  status: "pass" | "warn" | "fail";
  text: string;
}

interface ScoreExplanation {
  title: string;
  score: number;
  icon: ComponentType<{ className?: string }>;
  variant: "success" | "warning" | "danger";
  summary: string;
  reasons: ScoreReason[];
  methodology: string;
}

interface AuditorQuestion {
  id: string;
  question: string;
  importance: "Critical" | "High" | "Medium";
  importanceDesc: string;
  potentialRisk: string;
  suggestedImprovement: string;
  ifrsReference: string;
  ifrsDetail: string;
  status: QuestionStatus;
}

interface Finding {
  severity: Severity;
  title: string;
  description: string;
  standard: string;
  recommendation: string;
}

interface ActionItem {
  priority: "Critical" | "High" | "Medium";
  issue: string;
  recommendedAction: string;
  estimatedImpact: "Significant" | "Moderate" | "Minor";
  ifrsReference: string;
  timeToFix: string;
  responsibleDepartment: string;
}

// ─── Static data ──────────────────────────────────────────────────────────────

const SCORE_EXPLANATIONS: ScoreExplanation[] = [
  {
    title: "Auditor Readiness",
    score: 78,
    icon: ShieldCheck,
    variant: "warning",
    summary: "The submission demonstrates a reasonable foundation but contains gaps that a senior auditor would likely challenge during fieldwork.",
    reasons: [
      { status: "pass", text: "IFRS 9 standard correctly identified and cited" },
      { status: "pass", text: "Business model assessment is present and documented" },
      { status: "pass", text: "Accounting policy elections are disclosed" },
      { status: "warn", text: "ECL methodology lacks granular scenario documentation" },
      { status: "warn", text: "Transition disclosures are incomplete" },
      { status: "fail", text: "No third-party validation or external data referenced" },
      { status: "fail", text: "Management override controls not evidenced" },
    ],
    methodology: "Auditor Readiness is calculated by assessing 14 criteria across standard compliance, documentation completeness, and disclosure quality. Each criterion is weighted by audit risk relevance.",
  },
  {
    title: "Evidence Completeness",
    score: 72,
    icon: FileCheck,
    variant: "warning",
    summary: "Key supporting documentation is present but several high-risk areas lack corroborating evidence. Critical gaps were identified in 3 areas.",
    reasons: [
      { status: "pass", text: "Financial statements correctly referenced" },
      { status: "pass", text: "Board approval minutes are cited" },
      { status: "pass", text: "Prior year comparatives included" },
      { status: "warn", text: "Supporting calculations not attached" },
      { status: "warn", text: "Market data sources not referenced" },
      { status: "fail", text: "Credit loss methodology documentation missing" },
      { status: "fail", text: "No sensitivity analysis for key assumptions" },
      { status: "fail", text: "Third-party confirmations absent" },
    ],
    methodology: "Evidence Completeness scores each required document category (management assertions, supporting calculations, third-party data, historical analysis) and weights by materiality and audit risk.",
  },
  {
    title: "Professional Judgment",
    score: 65,
    icon: Scale,
    variant: "danger",
    summary: "Conclusions are stated but the reasoning chain is weak. Auditors will expect quantitative support and documented consideration of alternatives.",
    reasons: [
      { status: "pass", text: "Business model assessment provided" },
      { status: "pass", text: "SPPI test referenced" },
      { status: "warn", text: "Supporting evidence for assumptions is limited" },
      { status: "warn", text: "Alternative accounting treatments not considered" },
      { status: "fail", text: "Assumptions not sufficiently justified with data" },
      { status: "fail", text: "No sensitivity analysis attached" },
      { status: "fail", text: "Significant financing component conclusion lacks quantitative support" },
    ],
    methodology: "Professional Judgment is evaluated across 5 dimensions: clarity of reasoning, consideration of alternatives, quantitative support, documentation of key estimates, and alignment with standard-setters' intent.",
  },
  {
    title: "Review Risk",
    score: 32,
    icon: AlertTriangle,
    variant: "danger",
    summary: "Multiple high-probability auditor concerns identified. Immediate remediation is recommended before submitting to external auditors.",
    reasons: [
      { status: "fail", text: "3 critical findings requiring immediate attention" },
      { status: "fail", text: "Revenue timing assumptions are contestable" },
      { status: "fail", text: "Estimate sensitivity not documented" },
      { status: "warn", text: "Disclosure completeness could be enhanced" },
      { status: "warn", text: "Collectability assessment relies on historical data only" },
      { status: "pass", text: "No regulatory override or restatement flags" },
    ],
    methodology: "Review Risk is the inverse of the confidence score. It aggregates probability-weighted auditor challenge scenarios across all identified findings, scored by impact and likelihood.",
  },
];

const AUDITOR_QUESTIONS: AuditorQuestion[] = [
  {
    id: "sppi",
    question: "Where is the SPPI Assessment?",
    importance: "Critical",
    importanceDesc: "The Solely Payments of Principal and Interest test is mandatory under IFRS 9 to determine whether a financial asset can be classified at amortised cost or FVOCI. Without a documented SPPI analysis, the classification basis is unsubstantiated and unauditable.",
    potentialRisk: "Misclassification of financial assets leading to an incorrect measurement basis. Assets wrongly classified at amortised cost instead of FVTPL can cause material P&L volatility and may require restatement, triggering regulatory scrutiny.",
    suggestedImprovement: "Prepare a dedicated SPPI test memorandum for each financial instrument class. Document the contractual cash flow characteristics, assess whether modified time value of money features are present (IFRS 9.B4.1.9A), and provide a clear classification conclusion with supporting evidence.",
    ifrsReference: "IFRS 9 Para. B4.1.7–B4.1.26",
    ifrsDetail: "B4.1.7 requires assessment of whether contractual cash flows are solely payments of principal and interest. B4.1.14 addresses modified time value of money. B4.1.15–B4.1.26 cover contractual linkage features, non-recourse provisions, and prepayment/extension options.",
    status: "missing",
  },
  {
    id: "ecl",
    question: "What Assumptions Support Expected Credit Loss?",
    importance: "Critical",
    importanceDesc: "ECL calculations depend on key inputs (PD, LGD, EAD) and macroeconomic scenarios that must be disclosed and substantiated. Auditors require evidence that assumptions are reasonable, consistently applied, and supported by historical data and forward-looking information per IFRS 9.",
    potentialRisk: "Understated credit provisions leading to overstatement of financial assets. Regulatory risk if supervisory authorities challenge the adequacy of ECL models. Potential restatement if key assumptions are found to lack reasonable and supportable basis.",
    suggestedImprovement: "Document all ECL model inputs: (1) Probability of Default rates by portfolio segment with historical validation, (2) Loss Given Default with collateral haircut methodology, (3) Exposure at Default calculation approach, (4) macroeconomic scenarios with probability weights, and (5) back-testing results compared to actual losses.",
    ifrsReference: "IFRS 9 Para. B5.5.1–B5.5.55 and 5.5.17",
    ifrsDetail: "B5.5.1 requires using all reasonable and supportable information. Para. 5.5.17 requires reflecting probability-weighted outcomes, the time value of money, and reasonable forward-looking information. B5.5.51 addresses use of practical expedients including the simplified approach.",
    status: "incomplete",
  },
  {
    id: "approval",
    question: "Is Management Approval Documented?",
    importance: "High",
    importanceDesc: "Significant accounting judgments and estimates require formal management review and approval. This evidences governance over the financial reporting process and provides audit evidence that estimates have received appropriate senior oversight before finalisation.",
    potentialRisk: "A control deficiency that auditors may classify as a significant deficiency or material weakness in internal controls over financial reporting. Without documented approval, the reliability and oversight of significant estimates cannot be confirmed.",
    suggestedImprovement: "Include: (1) CFO or Finance Director sign-off with date and role confirmation, (2) Audit Committee or Board review minutes that specifically reference ECL methodology approval and key estimate sign-off, (3) evidence of independent internal review by a second reviewer.",
    ifrsReference: "IAS 1 Para. 122 and IAS 8 Para. 32–33",
    ifrsDetail: "IAS 1.122 requires disclosure of judgments that have the most significant effect on amounts recognised in the financial statements. IAS 8.32–33 require disclosure of the nature and carrying amount of assets and liabilities subject to significant estimation uncertainty.",
    status: "missing",
  },
  {
    id: "disclosure",
    question: "Are Disclosure Requirements Complete?",
    importance: "High",
    importanceDesc: "IFRS 7 mandates comprehensive quantitative and qualitative disclosures about exposure to risks arising from financial instruments. These disclosures are scrutinised closely by external auditors and banking regulators as they provide transparency into the entity's risk management practices.",
    potentialRisk: "Non-compliance with mandatory IFRS 7 disclosure requirements, potentially resulting in a qualified or emphasis-of-matter audit opinion. Regulatory risk from banking supervisors requiring enhanced disclosures post-audit.",
    suggestedImprovement: "Cross-reference all disclosures against the IFRS 7 checklist: credit risk (Para. 35A–38), ECL reconciliation (35I–35N), liquidity risk maturity analysis (Para. 39–40), market risk sensitivity analysis (Para. 40–42), and the fair value hierarchy disclosures (Para. 25–27).",
    ifrsReference: "IFRS 7 Para. 35A–42",
    ifrsDetail: "Para. 35A–35H require disclosures about credit risk management practices and ECL amounts by stage. Para. 35I–35N require an opening-to-closing reconciliation of loss allowance movements. Para. 39–42 cover liquidity risk, market risk, and sensitivity analysis.",
    status: "partial",
  },
];

const EVIDENCE_FINDINGS: Finding[] = [
  {
    severity: "critical",
    title: "Credit Loss Methodology Documentation",
    description: "Expected credit loss model lacks detailed documentation of assumptions and scenarios used in the calculation.",
    standard: "IFRS 9.5.5",
    recommendation: "Provide comprehensive documentation of ECL methodology including macroeconomic scenarios, probability weights, and historical loss patterns.",
  },
  {
    severity: "medium",
    title: "Contract Modification Analysis",
    description: "Insufficient evidence for how contract modifications were evaluated under the revenue standard.",
    standard: "IFRS 15.20-21",
    recommendation: "Include detailed analysis of whether modifications should be treated as separate contracts or part of existing arrangements.",
  },
  {
    severity: "strong",
    title: "Standard Identification",
    description: "All applicable IFRS standards have been correctly identified and referenced throughout the submission.",
    standard: "IAS 1.122",
    recommendation: "Continue to maintain this level of standard citation in future submissions.",
  },
];

const JUDGMENT_FINDINGS: Finding[] = [
  {
    severity: "critical",
    title: "Significant Financing Component",
    description: "Conclusion that no significant financing component exists lacks quantitative support.",
    standard: "IFRS 15.60-65",
    recommendation: "Provide time value of money calculations demonstrating immateriality or apply practical expedient with justification.",
  },
  {
    severity: "medium",
    title: "Probability of Collection",
    description: "Assessment of customer creditworthiness relies solely on historical experience without current market conditions.",
    standard: "IFRS 15.9",
    recommendation: "Include current credit ratings, market indicators, and forward-looking information in collectability assessment.",
  },
  {
    severity: "strong",
    title: "Business Model Assessment",
    description: "The business model assessment is clearly articulated and well-supported with operational evidence.",
    standard: "IFRS 9.4.1.1",
    recommendation: "Apply the same rigor demonstrated here to all remaining judgment areas.",
  },
];

const AUDITOR_CONCERNS = [
  { severity: "critical" as Severity, title: "Revenue Timing Assumptions", description: "Point-in-time vs. over-time recognition decision could be challenged based on customer acceptance terms.", impact: "High", likelihood: "Medium" },
  { severity: "medium" as Severity, title: "Estimate Sensitivity", description: "Key assumptions in fair value measurement lack sensitivity analysis.", impact: "Medium", likelihood: "High" },
  { severity: "strong" as Severity, title: "Standard Compliance", description: "All applicable IFRS standards correctly applied and referenced.", impact: "Low", likelihood: "Low" },
];

const ACTION_PLAN: ActionItem[] = [
  {
    priority: "Critical",
    issue: "ECL Methodology Undocumented",
    recommendedAction: "Prepare a detailed ECL methodology memo covering model inputs, macroeconomic scenario weights, staging criteria, and back-testing results against actual loss experience.",
    estimatedImpact: "Significant",
    ifrsReference: "IFRS 9, Para. B5.5.1–B5.5.55",
    timeToFix: "3–4 hours",
    responsibleDepartment: "Risk Management",
  },
  {
    priority: "Critical",
    issue: "SPPI Test Not Documented",
    recommendedAction: "Prepare SPPI test memorandum for each instrument class. Document contractual cash flow analysis and classification conclusion with reference to B4.1.7 criteria.",
    estimatedImpact: "Significant",
    ifrsReference: "IFRS 9, Para. B4.1.7–B4.1.26",
    timeToFix: "2–3 hours",
    responsibleDepartment: "Finance Team",
  },
  {
    priority: "Critical",
    issue: "Financing Component — No Quantitative Support",
    recommendedAction: "Perform present value calculations across all material contracts. Document the 12-month practical expedient application where applicable.",
    estimatedImpact: "Significant",
    ifrsReference: "IFRS 15, Para. 60–65",
    timeToFix: "2–3 hours",
    responsibleDepartment: "Finance Team",
  },
  {
    priority: "High",
    issue: "No Sensitivity Analysis",
    recommendedAction: "Add a sensitivity table showing impact of ±10% and ±20% changes to key assumptions (PD, LGD, EAD for ECL; discount rate for fair value).",
    estimatedImpact: "Moderate",
    ifrsReference: "IFRS 7, Para. 40–42 and IAS 1, Para. 129",
    timeToFix: "2 hours",
    responsibleDepartment: "CFO Office",
  },
  {
    priority: "High",
    issue: "Management Approval Not Evidenced",
    recommendedAction: "Obtain and attach CFO sign-off, Audit Committee minutes referencing ECL approval, and second-reviewer confirmation.",
    estimatedImpact: "Moderate",
    ifrsReference: "IAS 1, Para. 122 and IAS 8, Para. 32–33",
    timeToFix: "1 hour",
    responsibleDepartment: "CFO Office",
  },
  {
    priority: "Medium",
    issue: "IFRS 7 Disclosure Gaps",
    recommendedAction: "Cross-reference submissions against IFRS 7 disclosure checklist. Add loss allowance reconciliation (Para. 35I–35N) and liquidity maturity analysis (Para. 39–40).",
    estimatedImpact: "Moderate",
    ifrsReference: "IFRS 7, Para. 35A–42",
    timeToFix: "2 hours",
    responsibleDepartment: "External Reporting",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SeverityBadge({ severity }: { severity: Severity }) {
  const cfg = {
    critical: { cls: "bg-red-50 text-red-700 border-red-200", Icon: XCircle, label: "Critical" },
    medium: { cls: "bg-amber-50 text-amber-700 border-amber-200", Icon: AlertCircle, label: "Medium" },
    strong: { cls: "bg-emerald-50 text-emerald-700 border-emerald-200", Icon: CheckCircle2, label: "Strong" },
  }[severity];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${cfg.cls}`}>
      <cfg.Icon className="w-3.5 h-3.5" />{cfg.label}
    </span>
  );
}

function severityBorder(s: Severity) {
  return s === "critical" ? "#ef4444" : s === "medium" ? "#f59e0b" : "#10b981";
}

function ScoreGauge({ score, variant }: { score: number; variant: ScoreExplanation["variant"] }) {
  const color = variant === "success" ? "#10b981" : variant === "warning" ? "#f59e0b" : "#ef4444";
  const C = 2 * Math.PI * 36;
  return (
    <div className="relative w-24 h-24 shrink-0">
      <svg className="w-24 h-24 -rotate-90" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="36" fill="none" stroke="#f1f5f9" strokeWidth="7" />
        <circle cx="40" cy="40" r="36" fill="none" stroke={color} strokeWidth="7"
          strokeDasharray={C} strokeDashoffset={C - (score / 100) * C} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold text-slate-900">{score}%</span>
      </div>
    </div>
  );
}

function ScoreModal({ exp, onClose }: { exp: ScoreExplanation | null; onClose: () => void }) {
  if (!exp) return null;
  const Icon = exp.icon;
  const iconBg = exp.variant === "success" ? "bg-emerald-50" : exp.variant === "warning" ? "bg-amber-50" : "bg-red-50";
  const iconText = exp.variant === "success" ? "text-emerald-600" : exp.variant === "warning" ? "text-amber-600" : "text-red-600";
  const chipCls = exp.variant === "success" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : exp.variant === "warning" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-red-50 text-red-700 border-red-200";
  const chipLabel = exp.variant === "success" ? "Strong" : exp.variant === "warning" ? "Needs Improvement" : "Critical Gaps";
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[88vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl font-semibold text-slate-900">
            <div className={`p-2 rounded-lg ${iconBg}`}><Icon className={`w-5 h-5 ${iconText}`} /></div>
            {exp.title} — Score Breakdown
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-5 mt-2">
          <div className="flex items-start gap-5 p-5 bg-slate-50 rounded-xl border border-slate-200">
            <ScoreGauge score={exp.score} variant={exp.variant} />
            <div className="flex-1 pt-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl font-bold text-slate-900">{exp.score}%</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${chipCls}`}>{chipLabel}</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{exp.summary}</p>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Reasoning</p>
            <div className="divide-y divide-slate-100">
              {exp.reasons.map((r, i) => (
                <div key={i} className="flex items-start gap-3 py-2.5">
                  {r.status === "pass" && <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />}
                  {r.status === "warn" && <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />}
                  {r.status === "fail" && <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />}
                  <span className="text-sm text-slate-700">{r.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-5 text-xs text-slate-500 px-4 py-2.5 bg-slate-50 rounded-lg border border-slate-200">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Met</span>
            <span className="flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5 text-amber-500" /> Partial</span>
            <span className="flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5 text-red-500" /> Missing</span>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex gap-3">
            <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-blue-800 mb-1">Scoring Methodology</p>
              <p className="text-xs text-blue-700 leading-relaxed">{exp.methodology}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AnimatedScoreCard({ exp, onClick }: { exp: ScoreExplanation; onClick: () => void }) {
  const animatedScore = useCounter(exp.score);
  const Icon = exp.icon;
  const border = exp.variant === "success" ? "border-emerald-200 hover:border-emerald-300" : exp.variant === "warning" ? "border-amber-200 hover:border-amber-300" : "border-red-200 hover:border-red-300";
  const bg = exp.variant === "success" ? "bg-emerald-50/40" : exp.variant === "warning" ? "bg-amber-50/40" : "bg-red-50/40";
  const text = exp.variant === "success" ? "text-emerald-700" : exp.variant === "warning" ? "text-amber-700" : "text-red-700";
  const iconBg = exp.variant === "success" ? "bg-emerald-100" : exp.variant === "warning" ? "bg-amber-100" : "bg-red-100";
  const fails = exp.reasons.filter(r => r.status === "fail").length;
  return (
    <button onClick={onClick}
      className={`w-full text-left p-5 rounded-xl border ${border} ${bg} hover:shadow-md transition-all duration-200 group cursor-pointer`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-lg ${iconBg}`}><Icon className={`w-5 h-5 ${text}`} /></div>
        <span className="flex items-center gap-1 text-xs text-slate-400 group-hover:text-slate-600 transition-colors">
          <Info className="w-3.5 h-3.5" />Explain<ChevronRight className="w-3 h-3" />
        </span>
      </div>
      <div className={`text-4xl font-bold ${text} mb-1 tabular-nums`}>{animatedScore}%</div>
      <div className="text-sm font-semibold text-slate-700 mb-3">{exp.title}</div>
      <div className="flex items-center gap-1">
        {exp.reasons.slice(0, 6).map((r, i) => (
          <div key={i} className={`w-1.5 h-4 rounded-full ${r.status === "pass" ? "bg-emerald-400" : r.status === "warn" ? "bg-amber-400" : "bg-red-400"}`} />
        ))}
        {fails > 0 && <span className="text-xs text-slate-500 ml-2">{fails} gap{fails > 1 ? "s" : ""}</span>}
      </div>
    </button>
  );
}

function QuestionStatusBadge({ status }: { status: QuestionStatus }) {
  const cfg = {
    missing: { cls: "bg-red-50 text-red-700 border-red-200", label: "Missing" },
    incomplete: { cls: "bg-orange-50 text-orange-700 border-orange-200", label: "Incomplete" },
    partial: { cls: "bg-amber-50 text-amber-700 border-amber-200", label: "Partial" },
    complete: { cls: "bg-emerald-50 text-emerald-700 border-emerald-200", label: "Complete" },
  }[status];
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border ${cfg.cls}`}>{cfg.label}</span>;
}

function AuditorQuestionsSection() {
  const [expanded, setExpanded] = useState<string | null>("sppi");
  const importanceBg = (imp: AuditorQuestion["importance"]) =>
    imp === "Critical" ? "bg-red-50 text-red-700 border-red-200" : imp === "High" ? "bg-orange-50 text-orange-700 border-orange-200" : "bg-amber-50 text-amber-700 border-amber-200";

  return (
    <Card className="p-6 mb-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 bg-slate-100 rounded-lg"><HelpCircle className="w-5 h-5 text-slate-600" /></div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Auditor Critical Questions</h2>
          <p className="text-sm text-slate-500">Key questions an external auditor will ask — with IFRS references and suggested responses</p>
        </div>
      </div>
      <div className="space-y-3">
        {AUDITOR_QUESTIONS.map((q) => (
          <div key={q.id} className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === q.id ? null : q.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border shrink-0 ${importanceBg(q.importance)}`}>
                  {q.importance}
                </span>
                <span className="font-semibold text-slate-900 text-sm">{q.question}</span>
              </div>
              <div className="flex items-center gap-3 ml-4 shrink-0">
                <QuestionStatusBadge status={q.status} />
                {expanded === q.id ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </button>

            {expanded === q.id && (
              <div className="border-t border-slate-200 bg-slate-50/50 p-5 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white rounded-xl border border-slate-200">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Importance</p>
                    <p className="text-sm text-slate-700 leading-relaxed">{q.importanceDesc}</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                    <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-2">Potential Risk</p>
                    <p className="text-sm text-red-800 leading-relaxed">{q.potentialRisk}</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Suggested Improvement</p>
                    <p className="text-sm text-blue-800 leading-relaxed">{q.suggestedImprovement}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-slate-900 rounded-xl">
                  <BookOpen className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">IFRS Reference</span>
                      <span className="text-xs font-semibold text-blue-400 font-mono">{q.ifrsReference}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{q.ifrsDetail}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

function FindingCard({ finding }: { finding: Finding }) {
  return (
    <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm" style={{ borderLeftColor: severityBorder(finding.severity), borderLeftWidth: 3 }}>
      <div className="flex items-start justify-between mb-2 gap-3">
        <h3 className="font-semibold text-slate-900 text-sm">{finding.title}</h3>
        <SeverityBadge severity={finding.severity} />
      </div>
      <p className="text-sm text-slate-600 mb-2">{finding.description}</p>
      <div className="flex items-center gap-1.5 mb-3">
        <span className="text-xs font-mono font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">{finding.standard}</span>
      </div>
      <div className={`p-3 rounded-lg text-sm ${finding.severity === "strong" ? "bg-emerald-50 border border-emerald-200 text-emerald-800" : "bg-blue-50 border border-blue-200 text-blue-900"}`}>
        <strong>{finding.severity === "strong" ? "Positive Note:" : "Recommendation:"}</strong>{" "}{finding.recommendation}
      </div>
    </div>
  );
}

function ActionPlanSection() {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  const priorityCfg = {
    Critical: { dot: "bg-red-500", badge: "bg-red-50 text-red-700 border-red-200" },
    High: { dot: "bg-orange-500", badge: "bg-orange-50 text-orange-700 border-orange-200" },
    Medium: { dot: "bg-amber-400", badge: "bg-amber-50 text-amber-700 border-amber-200" },
  };
  const impactCfg = {
    Significant: "text-red-700 font-semibold",
    Moderate: "text-amber-700 font-semibold",
    Minor: "text-slate-600",
  };

  return (
    <Card className="p-6 mb-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Action Plan</h2>
          <p className="text-sm text-slate-500 mt-0.5">AI-generated prioritised remediation — with IFRS references and ownership</p>
        </div>
        {state !== "done" ? (
          <Button onClick={() => { setState("loading"); setTimeout(() => setState("done"), 1800); }}
            disabled={state === "loading"} className="bg-slate-900 hover:bg-slate-800 text-white gap-2">
            {state === "loading" ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Generating…</> : <><Zap className="w-4 h-4" />Generate Action Plan</>}
          </Button>
        ) : (
          <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 text-xs font-semibold">Plan ready</Badge>
        )}
      </div>

      {state === "idle" && (
        <div className="border-2 border-dashed border-slate-200 rounded-xl p-10 text-center">
          <Zap className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-slate-400 max-w-md mx-auto">Generate a structured action plan with IFRS references, estimated effort, and department ownership for each remediation step.</p>
        </div>
      )}
      {state === "loading" && <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-20 bg-slate-100 rounded-xl animate-pulse" />)}</div>}
      {state === "done" && (
        <div className="overflow-x-auto -mx-1">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-200">
                {["Priority", "Issue", "Recommended Action", "Impact", "IFRS Reference", "Time", "Owner"].map(h => (
                  <th key={h} className="text-left py-3 px-3 text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ACTION_PLAN.map((item, i) => {
                const cfg = priorityCfg[item.priority];
                return (
                  <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md border ${cfg.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />{item.priority}
                      </span>
                    </td>
                    <td className="py-4 px-3 font-semibold text-slate-900 align-top text-xs">{item.issue}</td>
                    <td className="py-4 px-3 text-slate-600 align-top text-xs max-w-[200px]">{item.recommendedAction}</td>
                    <td className="py-4 px-3 align-top">
                      <span className={`text-xs ${impactCfg[item.estimatedImpact]}`}>{item.estimatedImpact}</span>
                    </td>
                    <td className="py-4 px-3 align-top">
                      <span className="text-xs font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded whitespace-nowrap">{item.ifrsReference}</span>
                    </td>
                    <td className="py-4 px-3 align-top">
                      <span className="inline-flex items-center gap-1 text-xs text-slate-600 whitespace-nowrap">
                        <Clock className="w-3 h-3" />{item.timeToFix}
                      </span>
                    </td>
                    <td className="py-4 px-3 align-top">
                      <span className="inline-flex items-center gap-1 text-xs text-slate-600 whitespace-nowrap">
                        <Users className="w-3 h-3" />{item.responsibleDepartment}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

function ExportModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState<string | null>(null);
  const formats = [
    { key: "pdf", label: t("Professional PDF Report"), icon: FileText, desc: "Full review with findings, scores, and IFRS references" },
    { key: "exec", label: t("Executive Summary"), icon: BarChart3, desc: "One-page overview for senior management" },
    { key: "audit", label: t("Detailed Audit Report"), icon: BookOpen, desc: "Comprehensive workpapers for external auditors" },
    { key: "ppt", label: t("Management Presentation"), icon: Star, desc: "Slide-ready summary with key metrics" },
  ];
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base font-semibold text-slate-900">
            <Download className="w-4 h-4 text-slate-500" />{t("Export Options")}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2.5 mt-2">
          {formats.map((f) => {
            const Icon = f.icon;
            const isLoading = loading === f.key;
            return (
              <div key={f.key} className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="p-2 bg-slate-100 rounded-lg shrink-0"><Icon className="w-4 h-4 text-slate-600" /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900">{f.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{f.desc}</p>
                </div>
                <Button size="sm" variant="outline" className="shrink-0 border-slate-200 text-xs"
                  onClick={() => { setLoading(f.key); setTimeout(() => setLoading(null), 1600); }}
                  disabled={!!loading}>
                  {isLoading
                    ? <><div className="w-3 h-3 border-2 border-slate-400/30 border-t-slate-600 rounded-full animate-spin mr-1.5" />{t("Preparing...")}</>
                    : <><Download className="w-3 h-3 mr-1.5" />{t("Download")}</>}
                </Button>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ExecutiveSummaryCard() {
  const c1 = useCounter(78), c2 = useCounter(82), c3 = useCounter(65), c4 = useCounter(74);
  return (
    <div className="mb-7 p-6 bg-slate-900 rounded-2xl border border-slate-800">
      <div className="flex items-start gap-3 mb-5">
        <div className="p-2 bg-blue-900/40 border border-blue-800/40 rounded-lg shrink-0">
          <Star className="w-4 h-4 text-blue-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <h2 className="text-sm font-semibold text-white">AI Executive Summary</h2>
            <span className="text-xs text-blue-400 bg-blue-900/40 border border-blue-800/40 px-2 py-0.5 rounded-full">Generated</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
            This accounting analysis demonstrates reasonable alignment with IFRS 9 for Expected Credit Loss treatment, with a documented Business Model Assessment and SPPI Test reference. However, critical gaps remain: the ECL methodology documentation is insufficient, the Significant Financing Component conclusion lacks quantitative support, and management approval evidence is absent.{" "}
            <span className="text-amber-400 font-medium">Auditor rejection risk is rated Moderate.</span> Targeted remediation of 3 critical items is estimated to require 8-12 hours of preparatory work.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: "Overall Readiness", value: c1, color: "text-amber-400" },
          { label: "Compliance Score", value: c2, color: "text-amber-400" },
          { label: "Professional Judgment", value: c3, color: "text-red-400" },
          { label: "Confidence", value: c4, color: "text-amber-400" },
        ].map((m) => (
          <div key={m.label} className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4">
            <p className="text-xs text-slate-500 mb-1.5 leading-tight">{m.label}</p>
            <p className={`text-2xl font-bold tabular-nums ${m.color}`}>{m.value}%</p>
          </div>
        ))}
        <div className="bg-red-900/30 border border-red-800/40 rounded-xl p-4">
          <p className="text-xs text-red-400 mb-1.5">Risk Level</p>
          <p className="text-lg font-bold text-red-300">Moderate</p>
        </div>
      </div>
    </div>
  );
}

export default function ReviewResultsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeExp, setActiveExp] = useState<ScoreExplanation | null>(null);
  const [showExport, setShowExport] = useState(false);

  const detectedStandards = [
    { name: "IFRS 9", section: "Financial Instruments — ECL", relevance: "High", para: "4.1–5.5" },
    { name: "IFRS 15", section: "Revenue Recognition", relevance: "Medium", para: "9–86" },
    { name: "IFRS 7", section: "Financial Instrument Disclosures", relevance: "High", para: "35A–42" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <ExportModal open={showExport} onClose={() => setShowExport(false)} />
      {/* Header */}
      <div className="mb-6 flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h1 className="text-3xl font-bold text-slate-900">Review Results</h1>
            <Badge variant="outline" className="text-slate-700 border-slate-300 font-mono text-xs">{id}</Badge>
          </div>
          <p className="text-slate-500">Acme Financial Corp · Expected Credit Loss (IFRS 9) · 18 June 2026</p>
          <p className="text-xs text-slate-400 mt-1">Click any score card to see a full breakdown of how the score was generated.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={() => navigate("/compare")} className="border-slate-200 text-slate-700 hover:bg-slate-50">
            <GitCompare className="w-4 h-4 mr-2" />Compare
          </Button>
          <Button variant="outline" size="sm" className="border-slate-200 text-slate-700 hover:bg-slate-50">
            <Share2 className="w-4 h-4 mr-2" />Share
          </Button>
          <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white" onClick={() => setShowExport(true)}>
            <Download className="w-4 h-4 mr-2" />{t("Export Report")}
          </Button>
        </div>
      </div>

      {/* Executive Summary */}
      <ExecutiveSummaryCard />

      {/* Animated Score Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {SCORE_EXPLANATIONS.map(exp => (
          <AnimatedScoreCard key={exp.title} exp={exp} onClick={() => setActiveExp(exp)} />
        ))}
      </div>

      <ScoreModal exp={activeExp} onClose={() => setActiveExp(null)} />

      {/* Detected Standards */}
      <Card className="p-6 mb-6 border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-slate-500" />
          <h2 className="text-lg font-semibold text-slate-900">Detected Standards</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {detectedStandards.map((s, i) => (
            <div key={i} className="p-4 border border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">{s.name}</span>
                  <span className="text-xs font-mono text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">Para. {s.para}</span>
                </div>
                <Badge variant={s.relevance === "High" ? "destructive" : "secondary"} className="text-xs">{s.relevance}</Badge>
              </div>
              <p className="text-xs text-slate-600">{s.section}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Auditor Critical Questions */}
      <AuditorQuestionsSection />

      {/* Evidence Assessment */}
      <Card className="p-6 mb-6 border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h2 className="text-lg font-semibold text-slate-900">Evidence Assessment</h2>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-red-400 inline-block" />Critical</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-amber-400 inline-block" />Medium</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-emerald-400 inline-block" />Strong</span>
          </div>
        </div>
        <div className="space-y-3">
          {EVIDENCE_FINDINGS.map((f, i) => <FindingCard key={i} finding={f} />)}
        </div>
      </Card>

      {/* Professional Judgment */}
      <Card className="p-6 mb-6 border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h2 className="text-lg font-semibold text-slate-900">Professional Judgment Quality</h2>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-red-400 inline-block" />Critical</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-amber-400 inline-block" />Medium</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-emerald-400 inline-block" />Strong</span>
          </div>
        </div>
        <div className="space-y-3">
          {JUDGMENT_FINDINGS.map((f, i) => <FindingCard key={i} finding={f} />)}
        </div>
      </Card>

      {/* Auditor Concerns */}
      <Card className="p-6 mb-6 border-slate-200 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Potential Auditor Concerns</h2>
        <div className="space-y-3">
          {AUDITOR_CONCERNS.map((item, i) => (
            <div key={i} className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm flex items-start justify-between gap-4"
              style={{ borderLeftColor: severityBorder(item.severity), borderLeftWidth: 3 }}>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <SeverityBadge severity={item.severity} />
                  <h3 className="font-semibold text-slate-900 text-sm">{item.title}</h3>
                </div>
                <p className="text-sm text-slate-600">{item.description}</p>
              </div>
              <div className="text-right text-xs text-slate-500 shrink-0">
                <div>Impact: <strong className="text-slate-700">{item.impact}</strong></div>
                <div>Likelihood: <strong className="text-slate-700">{item.likelihood}</strong></div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Action Plan */}
      <ActionPlanSection />

      {/* Knowledge Base Links */}
      <Card className="p-6 mb-6 border-slate-200 shadow-sm bg-slate-50">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-slate-500" />
          <h2 className="text-lg font-semibold text-slate-900">Relevant IFRS Guidance</h2>
          <span className="text-xs text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded-full ml-1">AI Recommended</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { std: "IFRS 9", topic: "Financial Instruments — Classification & ECL", para: "B4.1.7–B5.5.55" },
            { std: "IFRS 7", topic: "Disclosure Requirements for Financial Instruments", para: "35A–42" },
            { std: "IAS 1", topic: "Significant Judgments and Estimation Uncertainty", para: "122–129" },
          ].map((item, i) => (
            <button key={i} onClick={() => navigate("/knowledge-base")}
              className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all text-left group">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-slate-900">{item.std}</span>
                  <span className="text-xs font-mono text-slate-400">{item.para}</span>
                </div>
                <p className="text-xs text-slate-600">{item.topic}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors shrink-0 ml-3" />
            </button>
          ))}
        </div>
      </Card>

      {/* Footer */}
      <div className="flex gap-3 flex-wrap">
        <Button variant="outline" onClick={() => navigate("/")} className="border-slate-200">Back to Dashboard</Button>
        <Button className="bg-slate-900 hover:bg-slate-800" onClick={() => navigate("/new-review")}>Start New Review</Button>
        <Button variant="outline" className="ml-auto border-slate-200" onClick={() => navigate("/compare")}>
          <GitCompare className="w-4 h-4 mr-2" />Compare Reviews
        </Button>
      </div>
    </div>
  );
}
