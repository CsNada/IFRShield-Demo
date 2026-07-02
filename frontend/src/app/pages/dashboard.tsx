import { useNavigate } from "react-router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  ShieldCheck, FileCheck, Scale, AlertTriangle,
  ArrowRight, Lock, Plus, TrendingUp, TrendingDown, Clock,
} from "lucide-react";
import { useLanguage } from "../context/language";

// ── helpers ──────────────────────────────────────────────────────────────────

function DonutChart({ data }: { data: { name: string; value: number; color: string }[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = 60, cx = 75, cy = 75;
  const C = 2 * Math.PI * r;
  let offset = 0;
  const slices = data.map((d) => {
    const pct = d.value / total;
    const dash = pct * C;
    const rot = (offset / total) * 360 - 90;
    offset += d.value;
    return { ...d, dash, gap: C - dash, rot };
  });
  return (
    <div className="flex items-center gap-5">
      <svg width={150} height={150} viewBox="0 0 150 150">
        {slices.map((s, i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={s.color} strokeWidth={18}
            strokeDasharray={`${s.dash} ${s.gap}`} transform={`rotate(${s.rot} ${cx} ${cy})`} />
        ))}
        <circle cx={cx} cy={cy} r={42} fill="white" />
        <text x={cx} y={cy - 5} textAnchor="middle" fill="#3D3028" fontSize={18} fontWeight={700}>{total}</text>
        <text x={cx} y={cy + 14} textAnchor="middle" fill="#8C7B6E" fontSize={11}>reviews</text>
      </svg>
      <div className="space-y-2.5">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full shrink-0" style={{ background: d.color }} />
            <span className="text-sm text-[#5A4A3A]">{d.name}</span>
            <span className="text-sm font-semibold text-[#3D3028] ml-auto pl-3">{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BarChartCustom({ data }: { data: { month: string; count: number }[] }) {
  const max = Math.max(...data.map((d) => d.count));
  return (
    <div className="h-[200px] flex flex-col">
      <div className="flex-1 flex items-end gap-2 px-1">
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-xs font-semibold text-[#8C7B6E]">{d.count}</span>
            <div className="w-full flex items-end" style={{ height: 140 }}>
              <div className="w-full rounded-t-md transition-all"
                style={{ height: `${(d.count / max) * 100}%`, background: "#6B5240" }} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 px-1 pt-2 border-t mt-1" style={{ borderColor: "#DDD5CB" }}>
        {data.map((d, i) => <div key={i} className="flex-1 text-center text-xs text-[#8C7B6E]">{d.month}</div>)}
      </div>
    </div>
  );
}

// ── Empty state ──────────────────────────────────────────────────────────────

function EmptyDashboard() {
  const navigate = useNavigate();
  const PLACEHOLDER_CARDS = [
    { icon: ShieldCheck, label: "Auditor Readiness", desc: "Overall submission quality score" },
    { icon: Scale, label: "Professional Judgment", desc: "Strength of accounting conclusions" },
    { icon: AlertTriangle, label: "Auditor Rejection Risk", desc: "Predicted audit challenge level" },
    { icon: FileCheck, label: "Evidence Completeness", desc: "Supporting documentation gaps" },
  ];
  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Welcome hero */}
      <div className="mb-10 p-8 rounded-2xl border text-center" style={{ background: "#F5EFE8", borderColor: "#DDD5CB" }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 border"
          style={{ background: "#6B5240", borderColor: "#5A4030" }}>
          <ShieldCheck className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-2" style={{ color: "#3D3028" }}>Welcome to IFRShield AI</h1>
        <p className="text-base mb-6 max-w-lg mx-auto" style={{ color: "#8C7B6E" }}>
          Start your first Accounting Memo review to generate AI-powered insights against IFRS and IAS standards.
        </p>
        <Button onClick={() => navigate("/new-review")}
          className="gap-2 px-8 h-11 text-sm font-semibold border-0"
          style={{ background: "#6B5240", color: "#FFFFFF" }}>
          <Plus className="w-4 h-4" /> Start New Review
        </Button>
      </div>

      {/* Placeholder insight cards */}
      <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#B8A898" }}>
        What you'll see after your first review
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {PLACEHOLDER_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="p-5 rounded-xl border relative overflow-hidden"
              style={{ background: "#FFFFFF", borderColor: "#DDD5CB" }}>
              <div className="absolute inset-0 flex items-center justify-center opacity-5">
                <Lock className="w-16 h-16" style={{ color: "#6B5240" }} />
              </div>
              <div className="relative">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 border"
                  style={{ background: "#F2EDE7", borderColor: "#DDD5CB" }}>
                  <Icon className="w-4.5 h-4.5" style={{ color: "#6B5240" }} />
                </div>
                <div className="h-7 w-16 rounded mb-1.5 animate-pulse" style={{ background: "#EDE8E1" }} />
                <p className="text-xs" style={{ color: "#B8A898" }}>{card.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Placeholder review history */}
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: "#DDD5CB" }}>
        <div className="p-5 border-b" style={{ background: "#F5EFE8", borderColor: "#DDD5CB" }}>
          <h3 className="text-sm font-semibold" style={{ color: "#3D3028" }}>Review History</h3>
        </div>
        <div className="p-10 text-center" style={{ background: "#FFFFFF" }}>
          <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center border"
            style={{ background: "#F2EDE7", borderColor: "#DDD5CB" }}>
            <Clock className="w-6 h-6" style={{ color: "#B8A898" }} />
          </div>
          <p className="text-sm font-medium mb-1" style={{ color: "#5A4A3A" }}>No reviews yet</p>
          <p className="text-xs" style={{ color: "#B8A898" }}>Your completed reviews will appear here with scores, risk levels, and IFRS references.</p>
        </div>
      </div>
    </div>
  );
}

// ── Active state ─────────────────────────────────────────────────────────────

function ActiveDashboard() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const kpis = [
    { title: "Auditor Readiness", value: "87%", icon: ShieldCheck, trend: "+5%", up: true, color: "#6B8F71", bg: "#EFF5F0" },
    { title: "Evidence Completeness", value: "92%", icon: FileCheck, trend: "+3%", up: true, color: "#6B8F71", bg: "#EFF5F0" },
    { title: "Professional Judgment", value: "81%", icon: Scale, trend: "0%", up: null, color: "#C49A3C", bg: "#FBF5E8" },
    { title: "Review Risk", value: "18%", icon: AlertTriangle, trend: "-2%", up: false, color: "#B85450", bg: "#F9ECEC" },
  ];

  const riskDist = [
    { name: "Low Risk", value: 45, color: "#6B8F71" },
    { name: "Medium Risk", value: 35, color: "#C49A3C" },
    { name: "High Risk", value: 20, color: "#B85450" },
  ];

  const evidenceTrends = [
    { month: "Jan", count: 12 }, { month: "Feb", count: 9 }, { month: "Mar", count: 15 },
    { month: "Apr", count: 7 }, { month: "May", count: 5 }, { month: "Jun", count: 3 },
  ];

  const recentReviews = [
    { id: "REV-2024-001", company: "Acme Financial Corp", standard: "IFRS 9", score: 92, risk: "Low", date: "2026-06-17" },
    { id: "REV-2024-002", company: "Global Trade Bank", standard: "IFRS 15", score: 78, risk: "Medium", date: "2026-06-16" },
    { id: "REV-2024-003", company: "Premier Credit Union", standard: "IFRS 16", score: 65, risk: "High", date: "2026-06-15" },
    { id: "REV-2024-004", company: "CitiBank Holdings", standard: "IAS 36", score: 88, risk: "Low", date: "2026-06-14" },
  ];

  const riskBadge = (r: string) => {
    if (r === "Low") return { bg: "#EFF5F0", color: "#6B8F71" };
    if (r === "Medium") return { bg: "#FBF5E8", color: "#C49A3C" };
    return { bg: "#F9ECEC", color: "#B85450" };
  };

  const scoreColor = (s: number) => s >= 85 ? "#6B8F71" : s >= 70 ? "#C49A3C" : "#B85450";

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1" style={{ color: "#3D3028" }}>Dashboard</h1>
          <p className="text-sm" style={{ color: "#8C7B6E" }}>Monitor audit readiness and review performance</p>
        </div>
        <Button onClick={() => navigate("/new-review")} className="gap-2 border-0 text-sm"
          style={{ background: "#6B5240", color: "#FFFFFF" }}>
          <Plus className="w-4 h-4" /> New Review
        </Button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.title} className="p-5 rounded-xl border" style={{ background: k.bg, borderColor: "#DDD5CB" }}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center border"
                  style={{ background: "#FFFFFF", borderColor: "#DDD5CB" }}>
                  <Icon className="w-4 h-4" style={{ color: k.color }} />
                </div>
                <span className="flex items-center gap-1 text-xs font-semibold"
                  style={{ color: k.up === true ? "#6B8F71" : k.up === false ? "#B85450" : "#8C7B6E" }}>
                  {k.up === true && <TrendingUp className="w-3.5 h-3.5" />}
                  {k.up === false && <TrendingDown className="w-3.5 h-3.5" />}
                  {k.trend}
                </span>
              </div>
              <p className="text-2xl font-bold mb-0.5" style={{ color: k.color }}>{k.value}</p>
              <p className="text-xs" style={{ color: "#8C7B6E" }}>{k.title}</p>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-7">
        <Card className="p-6 border" style={{ borderColor: "#DDD5CB" }}>
          <h3 className="text-sm font-semibold mb-5" style={{ color: "#3D3028" }}>Risk Distribution</h3>
          <DonutChart data={riskDist} />
        </Card>
        <Card className="p-6 border" style={{ borderColor: "#DDD5CB" }}>
          <h3 className="text-sm font-semibold mb-4" style={{ color: "#3D3028" }}>Missing Evidence Trends</h3>
          <BarChartCustom data={evidenceTrends} />
        </Card>
      </div>

      {/* Recent reviews */}
      <Card className="border overflow-hidden" style={{ borderColor: "#DDD5CB" }}>
        <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: "#DDD5CB", background: "#F5EFE8" }}>
          <h3 className="text-sm font-semibold" style={{ color: "#3D3028" }}>Recent Reviews</h3>
          <button onClick={() => navigate("/cases")} className="flex items-center gap-1 text-xs font-semibold hover:underline"
            style={{ color: "#6B5240" }}>
            View All <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: "#DDD5CB" }}>
                {["Review ID", "Company", "Standard", "Score", "Risk", "Date"].map((h) => (
                  <th key={h} className="text-left py-3 px-5 text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "#8C7B6E" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentReviews.map((r) => {
                const rb = riskBadge(r.risk);
                return (
                  <tr key={r.id} className="border-b cursor-pointer transition-colors hover:bg-[#FAF8F5]"
                    style={{ borderColor: "#EDE8E1" }}
                    onClick={() => navigate(`/review-results/${r.id}`)}>
                    <td className="py-3.5 px-5 font-mono text-xs font-semibold" style={{ color: "#6B5240" }}>{r.id}</td>
                    <td className="py-3.5 px-5 font-medium" style={{ color: "#3D3028" }}>{r.company}</td>
                    <td className="py-3.5 px-5 text-xs font-mono font-semibold px-2 py-0.5 rounded"
                      style={{ color: "#5A4A3A" }}>{r.standard}</td>
                    <td className="py-3.5 px-5 font-bold text-sm" style={{ color: scoreColor(r.score) }}>{r.score}%</td>
                    <td className="py-3.5 px-5">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: rb.bg, color: rb.color }}>{r.risk}</span>
                    </td>
                    <td className="py-3.5 px-5 text-xs" style={{ color: "#8C7B6E" }}>{r.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ── Page entry ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  // sessionStorage tracks whether any review has been completed this session.
  const hasReview = typeof window !== "undefined"
    ? sessionStorage.getItem("ifrshield_has_review") === "true"
    : false;

  return hasReview ? <ActiveDashboard /> : <EmptyDashboard />;
}
