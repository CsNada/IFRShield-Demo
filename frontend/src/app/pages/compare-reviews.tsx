import { useState } from "react";
import { useNavigate } from "react-router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "../components/ui/select";
import {
  ShieldCheck, FileCheck, Scale, AlertTriangle,
  XCircle, AlertCircle, CheckCircle2,
  TrendingUp, TrendingDown, Minus, GitCompare, ArrowLeft, ArrowRight,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Severity = "critical" | "medium" | "strong";

interface ReviewData {
  id: string; company: string; reviewType: string; date: string;
  scores: { auditorReadiness: number; evidenceCompleteness: number; professionalJudgment: number; reviewRisk: number };
  missingEvidence: Array<{ severity: Severity; title: string }>;
  auditorConcerns: Array<{ severity: Severity; title: string; likelihood: string }>;
  recommendations: Array<{ priority: string; action: string }>;
}

// ─── A vs B data ─────────────────────────────────────────────────────────────

const REVIEWS: Record<string, ReviewData> = {
  "REV-2024-001": {
    id: "REV-2024-001", company: "Acme Financial Corp", reviewType: "Expected Credit Loss (ECL)", date: "2026-06-17",
    scores: { auditorReadiness: 78, evidenceCompleteness: 72, professionalJudgment: 65, reviewRisk: 32 },
    missingEvidence: [
      { severity: "critical", title: "Credit Loss Methodology Documentation" },
      { severity: "medium", title: "Contract Modification Analysis" },
      { severity: "strong", title: "Standard Identification" },
    ],
    auditorConcerns: [
      { severity: "critical", title: "Revenue Timing Assumptions", likelihood: "Medium" },
      { severity: "medium", title: "Estimate Sensitivity", likelihood: "High" },
      { severity: "strong", title: "Standard Compliance", likelihood: "Low" },
    ],
    recommendations: [
      { priority: "Critical", action: "ECL Methodology Documentation" },
      { priority: "Critical", action: "Financing Component Quantification" },
      { priority: "High", action: "Sensitivity Analysis" },
    ],
  },
  "REV-2024-002": {
    id: "REV-2024-002", company: "Global Trade Bank", reviewType: "Revenue Recognition", date: "2026-06-16",
    scores: { auditorReadiness: 85, evidenceCompleteness: 88, professionalJudgment: 79, reviewRisk: 18 },
    missingEvidence: [
      { severity: "medium", title: "Variable Consideration Documentation" },
      { severity: "strong", title: "Performance Obligations Identified" },
      { severity: "strong", title: "Transaction Price Allocation" },
    ],
    auditorConcerns: [
      { severity: "medium", title: "Variable Consideration Estimation", likelihood: "Medium" },
      { severity: "strong", title: "Revenue Timing", likelihood: "Low" },
      { severity: "strong", title: "Contract Identification", likelihood: "Low" },
    ],
    recommendations: [
      { priority: "High", action: "Variable Consideration Constraint Analysis" },
      { priority: "Medium", action: "Disaggregation of Revenue Disclosures" },
    ],
  },
  "REV-2024-003": {
    id: "REV-2024-003", company: "Premier Credit Union", reviewType: "Financial Instrument Classification", date: "2026-06-15",
    scores: { auditorReadiness: 61, evidenceCompleteness: 58, professionalJudgment: 54, reviewRisk: 47 },
    missingEvidence: [
      { severity: "critical", title: "Lease Term Determination" },
      { severity: "critical", title: "Incremental Borrowing Rate Justification" },
      { severity: "medium", title: "Short-term Lease Elections" },
    ],
    auditorConcerns: [
      { severity: "critical", title: "Lease Classification Decisions", likelihood: "High" },
      { severity: "critical", title: "IBR Reasonableness", likelihood: "High" },
      { severity: "medium", title: "Reassessment Triggers", likelihood: "Medium" },
    ],
    recommendations: [
      { priority: "Critical", action: "IBR Documentation and Justification" },
      { priority: "Critical", action: "Lease Term Extension Analysis" },
      { priority: "High", action: "Right-of-use Asset Calculation Review" },
    ],
  },
  "REV-2024-004": {
    id: "REV-2024-004", company: "CitiBank Holdings", reviewType: "Impairment Assessment", date: "2026-06-14",
    scores: { auditorReadiness: 92, evidenceCompleteness: 90, professionalJudgment: 88, reviewRisk: 11 },
    missingEvidence: [
      { severity: "strong", title: "CGU Identification" },
      { severity: "strong", title: "Recoverable Amount Determination" },
      { severity: "strong", title: "Value in Use Calculations" },
    ],
    auditorConcerns: [
      { severity: "strong", title: "Discount Rate Selection", likelihood: "Low" },
      { severity: "strong", title: "Growth Rate Assumptions", likelihood: "Low" },
      { severity: "medium", title: "Sensitivity Disclosures", likelihood: "Low" },
    ],
    recommendations: [
      { priority: "Medium", action: "Enhanced Sensitivity Disclosures" },
      { priority: "Low", action: "CGU Boundary Documentation Update" },
    ],
  },
};

// ─── Before/After data (same review, improved version) ────────────────────────

interface BeforeAfterData {
  label: string; company: string; reviewType: string;
  scores: { auditorReadiness: number; evidenceCompleteness: number; professionalJudgment: number; reviewRisk: number };
  criticalFindings: number; mediumFindings: number; resolvedFindings: number;
  summary: string;
}

const BEFORE_AFTER: Record<string, { before: BeforeAfterData; after: BeforeAfterData }> = {
  "REV-2024-001": {
    before: {
      label: "Original Submission", company: "Acme Financial Corp", reviewType: "Expected Credit Loss (ECL)",
      scores: { auditorReadiness: 58, evidenceCompleteness: 52, professionalJudgment: 44, reviewRisk: 62 },
      criticalFindings: 3, mediumFindings: 4, resolvedFindings: 0,
      summary: "Initial submission lacked ECL methodology documentation, SPPI test, and management approval. 3 critical findings prevented audit acceptance.",
    },
    after: {
      label: "Improved Version", company: "Acme Financial Corp", reviewType: "Expected Credit Loss (ECL)",
      scores: { auditorReadiness: 92, evidenceCompleteness: 91, professionalJudgment: 86, reviewRisk: 9 },
      criticalFindings: 0, mediumFindings: 1, resolvedFindings: 6,
      summary: "All critical findings resolved. ECL methodology memo, SPPI analysis, and management sign-off attached. Submission is now audit-ready.",
    },
  },
  "REV-2024-003": {
    before: {
      label: "Original Submission", company: "Premier Credit Union", reviewType: "Financial Instrument Classification",
      scores: { auditorReadiness: 61, evidenceCompleteness: 58, professionalJudgment: 54, reviewRisk: 47 },
      criticalFindings: 2, mediumFindings: 3, resolvedFindings: 0,
      summary: "IBR justification absent and lease term documentation incomplete. Auditor raised questions on both classification decisions.",
    },
    after: {
      label: "Improved Version", company: "Premier Credit Union", reviewType: "Financial Instrument Classification",
      scores: { auditorReadiness: 88, evidenceCompleteness: 87, professionalJudgment: 83, reviewRisk: 13 },
      criticalFindings: 0, mediumFindings: 1, resolvedFindings: 4,
      summary: "IBR derived from benchmarked borrowing rates with documented methodology. Lease term supported by evidence of economic incentives. Ready for final review.",
    },
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const REVIEW_OPTIONS = Object.values(REVIEWS).map((r) => ({ value: r.id, label: `${r.id} — ${r.company}` }));
const BEFORE_AFTER_OPTIONS = Object.keys(BEFORE_AFTER).map((id) => ({
  value: id, label: `${id} — ${REVIEWS[id]?.company ?? id}`,
}));

function scoreBarColor(s: number) {
  return s >= 80 ? "bg-emerald-500" : s >= 65 ? "bg-amber-400" : "bg-red-500";
}
function scoreTextColor(s: number) {
  return s >= 80
    ? "text-emerald-700 bg-emerald-50 border-emerald-200"
    : s >= 65 ? "text-amber-700 bg-amber-50 border-amber-200"
    : "text-red-700 bg-red-50 border-red-200";
}

function SeverityDot({ severity }: { severity: Severity }) {
  const c = severity === "critical" ? "bg-red-500" : severity === "medium" ? "bg-amber-400" : "bg-emerald-500";
  return <span className={`inline-block w-2 h-2 rounded-full ${c} shrink-0 mt-1.5`} />;
}

function priorityBadge(p: string) {
  return p === "Critical" ? "bg-red-50 text-red-700 border-red-200"
    : p === "High" ? "bg-orange-50 text-orange-700 border-orange-200"
    : "bg-amber-50 text-amber-700 border-amber-200";
}

// ─── A vs B comparison ────────────────────────────────────────────────────────

function ScoreBar({ label, scoreA, scoreB }: { label: string; scoreA: number; scoreB: number }) {
  const diff = scoreB - scoreA;
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <div className="flex items-center gap-1 text-xs font-semibold">
          {diff > 0 ? <span className="flex items-center gap-0.5 text-emerald-600"><TrendingUp className="w-3.5 h-3.5" />+{diff}pts</span>
            : diff < 0 ? <span className="flex items-center gap-0.5 text-red-500"><TrendingDown className="w-3.5 h-3.5" />{diff}pts</span>
            : <span className="flex items-center gap-0.5 text-slate-400"><Minus className="w-3.5 h-3.5" />Tied</span>}
        </div>
      </div>
      <div className="space-y-1.5">
        {[{ score: scoreA, lbl: "A" }, { score: scoreB, lbl: "B" }].map(({ score, lbl }) => (
          <div key={lbl} className="flex items-center gap-3">
            <span className="text-xs text-slate-500 w-7 text-right font-medium">{score}%</span>
            <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div className={`h-full ${scoreBarColor(score)} rounded-full transition-all`} style={{ width: `${score}%` }} />
            </div>
            <span className="text-xs text-slate-400 w-4 font-semibold">{lbl}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewColumn({ label, review }: { label: "A" | "B"; review: ReviewData | null }) {
  if (!review) {
    return (
      <div className="flex-1 flex items-center justify-center py-20 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 min-w-0">
        <div className="text-center"><GitCompare className="w-10 h-10 mx-auto mb-3 opacity-30" /><p className="text-sm">Select Review {label}</p></div>
      </div>
    );
  }
  const SCORE_ITEMS = [
    { label: "Auditor Readiness", score: review.scores.auditorReadiness, Icon: ShieldCheck },
    { label: "Evidence", score: review.scores.evidenceCompleteness, Icon: FileCheck },
    { label: "Prof. Judgment", score: review.scores.professionalJudgment, Icon: Scale },
    { label: "Review Risk", score: review.scores.reviewRisk, Icon: AlertTriangle },
  ];
  return (
    <div className="flex-1 space-y-5 min-w-0">
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Review {label}</p>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-slate-900 leading-tight">{review.company}</h3>
          <Badge variant="outline" className="text-blue-900 border-blue-900 text-xs shrink-0">{review.id}</Badge>
        </div>
        <p className="text-sm text-slate-600 mt-0.5">{review.reviewType}</p>
        <p className="text-xs text-slate-400 mt-1">{review.date}</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {SCORE_ITEMS.map(({ label: lbl, score, Icon }) => (
          <div key={lbl} className={`p-3 rounded-xl border ${scoreTextColor(score)}`}>
            <div className="flex items-center gap-1.5 mb-1"><Icon className="w-3.5 h-3.5" /><span className="text-xs font-medium leading-tight">{lbl}</span></div>
            <div className="text-2xl font-bold">{score}%</div>
          </div>
        ))}
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Evidence Findings</p>
        <div className="space-y-2">{review.missingEvidence.map((item, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-slate-700"><SeverityDot severity={item.severity} /><span>{item.title}</span></div>
        ))}</div>
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Auditor Concerns</p>
        <div className="space-y-2">{review.auditorConcerns.map((item, i) => (
          <div key={i} className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2 text-sm text-slate-700"><SeverityDot severity={item.severity} /><span>{item.title}</span></div>
            <span className="text-xs text-slate-400 shrink-0">{item.likelihood}</span>
          </div>
        ))}</div>
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Recommendations</p>
        <div className="space-y-2">{review.recommendations.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold shrink-0 ${priorityBadge(item.priority)}`}>{item.priority}</span>
            <span className="text-sm text-slate-700">{item.action}</span>
          </div>
        ))}</div>
      </div>
    </div>
  );
}

// ─── Before/After view ────────────────────────────────────────────────────────

function ImprovementArrow({ before, after, label }: { before: number; after: number; label: string }) {
  const diff = after - before;
  const improved = diff > 0;
  const beforeColor = scoreBarColor(before);
  const afterColor = scoreBarColor(after);
  return (
    <div className="flex items-center gap-4 py-4 border-b border-slate-100 last:border-0">
      <div className="w-40 shrink-0">
        <p className="text-xs font-semibold text-slate-600 mb-1">{label}</p>
      </div>
      <div className="flex items-center gap-3 flex-1">
        {/* Before bar */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-slate-500">Before</span>
            <span className="text-sm font-bold text-slate-700">{before}%</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full ${beforeColor} rounded-full`} style={{ width: `${before}%` }} />
          </div>
        </div>
        {/* Arrow */}
        <div className="shrink-0 flex flex-col items-center">
          <ArrowRight className={`w-5 h-5 ${improved ? "text-emerald-500" : "text-red-400"}`} />
          <span className={`text-xs font-bold mt-0.5 ${improved ? "text-emerald-600" : "text-red-500"}`}>
            {improved ? "+" : ""}{diff}
          </span>
        </div>
        {/* After bar */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-slate-500">After</span>
            <span className="text-sm font-bold text-slate-700">{after}%</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full ${afterColor} rounded-full`} style={{ width: `${after}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function BeforeAfterView({ data }: { data: { before: BeforeAfterData; after: BeforeAfterData } }) {
  const { before, after } = data;
  const metrics = [
    { label: "Auditor Readiness", before: before.scores.auditorReadiness, after: after.scores.auditorReadiness },
    { label: "Evidence Completeness", before: before.scores.evidenceCompleteness, after: after.scores.evidenceCompleteness },
    { label: "Professional Judgment", before: before.scores.professionalJudgment, after: after.scores.professionalJudgment },
    { label: "Review Risk (lower is better)", before: before.scores.reviewRisk, after: after.scores.reviewRisk },
  ];

  return (
    <div className="space-y-5">
      {/* Score improvement chart */}
      <Card className="p-6 border-slate-200 shadow-sm">
        <h3 className="text-base font-semibold text-slate-900 mb-5">Score Improvements</h3>
        <div>
          {metrics.map((m) => (
            <ImprovementArrow key={m.label} label={m.label} before={m.before} after={m.after} />
          ))}
        </div>
      </Card>

      {/* Side-by-side summaries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Before */}
        <Card className="p-5 border-red-200 bg-red-50/40">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
            <h4 className="text-sm font-semibold text-slate-900">{before.label}</h4>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">{before.summary}</p>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-red-100 rounded-xl text-center">
              <p className="text-xs text-red-600 mb-1">Critical</p>
              <p className="text-2xl font-bold text-red-700">{before.criticalFindings}</p>
            </div>
            <div className="p-3 bg-amber-100 rounded-xl text-center">
              <p className="text-xs text-amber-600 mb-1">Medium</p>
              <p className="text-2xl font-bold text-amber-700">{before.mediumFindings}</p>
            </div>
            <div className="p-3 bg-slate-100 rounded-xl text-center">
              <p className="text-xs text-slate-500 mb-1">Resolved</p>
              <p className="text-2xl font-bold text-slate-600">{before.resolvedFindings}</p>
            </div>
          </div>
        </Card>

        {/* After */}
        <Card className="p-5 border-emerald-200 bg-emerald-50/40">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
            <h4 className="text-sm font-semibold text-slate-900">{after.label}</h4>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">{after.summary}</p>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-red-50 rounded-xl text-center border border-red-100">
              <p className="text-xs text-red-500 mb-1">Critical</p>
              <p className="text-2xl font-bold text-red-600">{after.criticalFindings}</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl text-center border border-amber-100">
              <p className="text-xs text-amber-500 mb-1">Medium</p>
              <p className="text-2xl font-bold text-amber-600">{after.mediumFindings}</p>
            </div>
            <div className="p-3 bg-emerald-100 rounded-xl text-center">
              <p className="text-xs text-emerald-600 mb-1">Resolved</p>
              <p className="text-2xl font-bold text-emerald-700">{after.resolvedFindings}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Legend */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-6 text-xs text-slate-500 flex-wrap">
        <span className="font-semibold text-slate-600">Severity:</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />Critical</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />Medium</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />Strong / Resolved</span>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

type Mode = "ab" | "beforeafter";

export default function CompareReviewsPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("ab");

  // A vs B state
  const [reviewAId, setReviewAId] = useState("");
  const [reviewBId, setReviewBId] = useState("");
  const reviewA = REVIEWS[reviewAId] ?? null;
  const reviewB = REVIEWS[reviewBId] ?? null;
  const bothSelected = !!(reviewA && reviewB);

  // Before/After state
  const [baId, setBaId] = useState("");
  const baData = BEFORE_AFTER[baId] ?? null;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-7">
        <button onClick={() => navigate("/")} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" />Back
        </button>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Compare Reviews</h1>
        <p className="text-sm text-slate-500">Compare two reviews side by side, or see how a submission improved after remediation.</p>
      </div>

      {/* Mode toggle */}
      <div className="flex gap-2 mb-7">
        <button onClick={() => setMode("ab")}
          className={`px-5 py-2.5 text-sm font-semibold rounded-lg border transition-all ${mode === "ab" ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"}`}>
          Review A vs Review B
        </button>
        <button onClick={() => setMode("beforeafter")}
          className={`px-5 py-2.5 text-sm font-semibold rounded-lg border transition-all ${mode === "beforeafter" ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"}`}>
          Before <ArrowRight className="w-3.5 h-3.5 inline mx-1" /> After Improvement
        </button>
      </div>

      {/* ── A vs B Mode ── */}
      {mode === "ab" && (
        <>
          <div className="grid grid-cols-2 gap-6 mb-7">
            {(["A", "B"] as const).map((lbl) => (
              <div key={lbl}>
                <label className="text-sm font-medium text-slate-700 block mb-2">Review {lbl}</label>
                <Select value={lbl === "A" ? reviewAId : reviewBId} onValueChange={lbl === "A" ? setReviewAId : setReviewBId}>
                  <SelectTrigger className="h-11 border-slate-200"><SelectValue placeholder="Select a review..." /></SelectTrigger>
                  <SelectContent>
                    {REVIEW_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value} disabled={opt.value === (lbl === "A" ? reviewBId : reviewAId)}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>

          {bothSelected && (
            <Card className="p-6 mb-6 border-slate-200 shadow-sm">
              <h2 className="text-base font-semibold text-slate-900 mb-5">Score Comparison</h2>
              <div className="max-w-2xl">
                <ScoreBar label="Auditor Readiness" scoreA={reviewA.scores.auditorReadiness} scoreB={reviewB.scores.auditorReadiness} />
                <ScoreBar label="Evidence Completeness" scoreA={reviewA.scores.evidenceCompleteness} scoreB={reviewB.scores.evidenceCompleteness} />
                <ScoreBar label="Professional Judgment" scoreA={reviewA.scores.professionalJudgment} scoreB={reviewB.scores.professionalJudgment} />
                <ScoreBar label="Review Risk" scoreA={reviewA.scores.reviewRisk} scoreB={reviewB.scores.reviewRisk} />
              </div>
              <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 flex-wrap">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />Strong (&gt;=80%)</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />Needs Work (65-79%)</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500 inline-block" />Critical (&lt;65%)</span>
              </div>
            </Card>
          )}

          <div className="flex gap-8">
            <ReviewColumn label="A" review={reviewA} />
            <div className="w-px bg-slate-200 shrink-0" />
            <ReviewColumn label="B" review={reviewB} />
          </div>

          {bothSelected && (
            <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-6 text-xs text-slate-500 flex-wrap">
              <span className="font-semibold text-slate-600">Severity:</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />Critical</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />Medium</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />Strong</span>
            </div>
          )}
        </>
      )}

      {/* ── Before / After Mode ── */}
      {mode === "beforeafter" && (
        <>
          <div className="mb-7">
            <label className="text-sm font-medium text-slate-700 block mb-2">Select a Review to Compare Versions</label>
            <Select value={baId} onValueChange={setBaId}>
              <SelectTrigger className="h-11 border-slate-200 max-w-md"><SelectValue placeholder="Select a review..." /></SelectTrigger>
              <SelectContent>
                {BEFORE_AFTER_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!baData && (
              <p className="text-xs text-slate-400 mt-2">
                Shows how a review improved after following the AI Action Plan recommendations.
              </p>
            )}
          </div>

          {baData ? (
            <BeforeAfterView data={baData} />
          ) : (
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-16 text-center text-slate-400">
              <GitCompare className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-sm font-medium mb-1">Select a review to see before vs after improvement</p>
              <p className="text-xs">Shows the impact of following the AI-generated Action Plan on each score category</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
