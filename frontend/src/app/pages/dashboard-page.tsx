import { Card } from "../components/ui/card";
import { 
  TrendingUp, 
  TrendingDown,
  CheckCircle2, 
  AlertTriangle, 
  FileText,
  Clock
} from "lucide-react";
import { Badge } from "../components/ui/badge";

export function DashboardPage() {
  const kpis = [
    {
      title: "Auditor Readiness Score",
      value: "92",
      unit: "%",
      change: "+5%",
      trend: "up",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Evidence Completeness",
      value: "87",
      unit: "%",
      change: "+3%",
      trend: "up",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Professional Judgment Strength",
      value: "94",
      unit: "%",
      change: "+2%",
      trend: "up",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Review Risk",
      value: "12",
      unit: "%",
      change: "-4%",
      trend: "down",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ];

  const recentReviews = [
    {
      id: "REV-2401",
      company: "Acme Financial Corp",
      standard: "IFRS 9",
      risk: "Low",
      date: "2026-06-17",
    },
    {
      id: "REV-2402",
      company: "Global Trade Bank",
      standard: "IFRS 16",
      risk: "Medium",
      date: "2026-06-17",
    },
    {
      id: "REV-2403",
      company: "Premier Credit Union",
      standard: "ASC 326",
      risk: "High",
      date: "2026-06-16",
    },
    {
      id: "REV-2404",
      company: "Metropolitan Savings",
      standard: "IFRS 15",
      risk: "Low",
      date: "2026-06-16",
    },
  ];

  const riskDistribution = [
    { level: "Critical", count: 3, color: "bg-red-500" },
    { level: "High", count: 8, color: "bg-orange-500" },
    { level: "Medium", count: 15, color: "bg-amber-500" },
    { level: "Low", count: 42, color: "bg-emerald-500" },
  ];

  const missingEvidence = [
    { type: "Management Assertions", count: 5, trend: "up" },
    { type: "Supporting Documentation", count: 12, trend: "down" },
    { type: "Third-party Confirmations", count: 3, trend: "stable" },
    { type: "Historical Data Analysis", count: 8, trend: "up" },
  ];

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl text-[#0f172a] mb-1">Dashboard</h1>
        <p className="text-sm text-slate-600">Real-time audit readiness monitoring</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi) => (
          <Card key={kpi.title} className="p-6 border-slate-200">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${kpi.bgColor} rounded-lg flex items-center justify-center`}>
                <span className={`text-xl ${kpi.color}`}>
                  {kpi.value}
                  <span className="text-sm">{kpi.unit}</span>
                </span>
              </div>
              <div className="flex items-center gap-1">
                {kpi.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-emerald-600" />
                )}
                <span className="text-sm text-emerald-600">{kpi.change}</span>
              </div>
            </div>
            <h3 className="text-sm text-slate-600">{kpi.title}</h3>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Reviews */}
        <Card className="p-6 border-slate-200">
          <h2 className="text-lg text-[#0f172a] mb-4">Recent Reviews</h2>
          <div className="space-y-3">
            {recentReviews.map((review) => (
              <div
                key={review.id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="text-sm text-[#0f172a]">{review.company}</p>
                    <p className="text-xs text-slate-600">{review.id} • {review.standard}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant={review.risk === "Low" ? "default" : review.risk === "Medium" ? "secondary" : "destructive"}
                    className={
                      review.risk === "Low"
                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                        : review.risk === "Medium"
                        ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                        : "bg-red-100 text-red-700 hover:bg-red-100"
                    }
                  >
                    {review.risk}
                  </Badge>
                  <span className="text-xs text-slate-500">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Risk Distribution */}
        <Card className="p-6 border-slate-200">
          <h2 className="text-lg text-[#0f172a] mb-4">Risk Distribution</h2>
          <div className="space-y-4">
            {riskDistribution.map((risk) => (
              <div key={risk.level}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">{risk.level}</span>
                  <span className="text-sm text-[#0f172a]">{risk.count} cases</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className={`${risk.color} h-2 rounded-full transition-all`}
                    style={{ width: `${(risk.count / 68) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Total Cases</span>
              <span className="text-xl text-[#0f172a]">68</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Missing Evidence Trends */}
        <Card className="p-6 border-slate-200">
          <h2 className="text-lg text-[#0f172a] mb-4">Missing Evidence Trends</h2>
          <div className="space-y-4">
            {missingEvidence.map((item) => (
              <div key={item.type} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="text-sm text-[#0f172a]">{item.type}</p>
                    <p className="text-xs text-slate-600">{item.count} occurrences</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {item.trend === "up" && <TrendingUp className="w-4 h-4 text-red-500" />}
                  {item.trend === "down" && <TrendingDown className="w-4 h-4 text-emerald-500" />}
                  {item.trend === "stable" && <span className="w-4 h-0.5 bg-slate-400"></span>}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Review Statistics */}
        <Card className="p-6 border-slate-200">
          <h2 className="text-lg text-[#0f172a] mb-4">Review Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="text-xs text-slate-600">Completed</span>
              </div>
              <p className="text-2xl text-[#0f172a]">156</p>
              <p className="text-xs text-emerald-600 mt-1">+12 this week</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-xs text-slate-600">In Progress</span>
              </div>
              <p className="text-2xl text-[#0f172a]">23</p>
              <p className="text-xs text-blue-600 mt-1">8 active today</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span className="text-xs text-slate-600">Flagged</span>
              </div>
              <p className="text-2xl text-[#0f172a]">11</p>
              <p className="text-xs text-amber-600 mt-1">Needs attention</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-purple-600" />
                <span className="text-xs text-slate-600">Avg. Score</span>
              </div>
              <p className="text-2xl text-[#0f172a]">89%</p>
              <p className="text-xs text-purple-600 mt-1">+2% vs last month</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
