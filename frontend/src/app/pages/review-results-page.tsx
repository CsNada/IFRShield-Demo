import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  FileText,
  Download,
  Share2,
  TrendingUp
} from "lucide-react";

export function ReviewResultsPage() {
  const scoreCards = [
    {
      title: "Auditor Readiness",
      score: 88,
      status: "strong",
      icon: CheckCircle2,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      description: "Well-documented position",
    },
    {
      title: "Evidence Completeness",
      score: 82,
      status: "medium",
      icon: AlertTriangle,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      description: "Some gaps identified",
    },
    {
      title: "Judgment Strength",
      score: 91,
      status: "strong",
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      description: "Clear reasoning provided",
    },
    {
      title: "Review Risk",
      score: 15,
      status: "low",
      icon: CheckCircle2,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Low probability of challenge",
    },
  ];

  const detectedStandards = [
    { name: "IFRS 9 - Financial Instruments", relevance: "Primary" },
    { name: "IFRS 7 - Financial Instruments Disclosures", relevance: "Secondary" },
    { name: "IAS 32 - Financial Instruments Presentation", relevance: "Supporting" },
  ];

  const missingEvidence = [
    {
      severity: "critical",
      item: "Management's documentation of expected credit loss methodology",
      impact: "Inability to validate ECL calculation approach",
    },
    {
      severity: "medium",
      item: "Historical loss experience data for similar portfolios",
      impact: "Limited support for forward-looking assumptions",
    },
    {
      severity: "medium",
      item: "Third-party market data validation",
      impact: "Reduced confidence in external inputs",
    },
  ];

  const weakJustifications = [
    {
      severity: "medium",
      area: "Stage allocation methodology",
      issue: "Insufficient explanation of significant increase in credit risk determination",
      recommendation: "Provide detailed criteria and thresholds for stage transitions",
    },
    {
      severity: "low",
      area: "Discount rate selection",
      issue: "Limited documentation of rate derivation",
      recommendation: "Include market data sources and calculation methodology",
    },
  ];

  const auditorConcerns = [
    {
      severity: "critical",
      concern: "Model validation evidence",
      detail: "No independent validation of ECL model parameters documented",
      action: "Required: Obtain model validation report from risk management",
    },
    {
      severity: "medium",
      concern: "Management override controls",
      detail: "Limited documentation of post-model adjustments",
      action: "Document approval process and supporting analysis",
    },
  ];

  const recommendations = [
    {
      priority: "high",
      recommendation: "Obtain and attach model validation documentation",
      effort: "2-4 hours",
    },
    {
      priority: "high",
      recommendation: "Expand stage allocation criteria explanation",
      effort: "1-2 hours",
    },
    {
      priority: "medium",
      recommendation: "Include historical loss data analysis",
      effort: "3-5 hours",
    },
    {
      priority: "low",
      recommendation: "Add cross-references to disclosure requirements",
      effort: "1 hour",
    },
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Critical</Badge>;
      case "medium":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Medium</Badge>;
      case "low":
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Low</Badge>;
      case "high":
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">High</Badge>;
      default:
        return <Badge>{severity}</Badge>;
    }
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-[#0f172a] mb-1">Review Results</h1>
          <p className="text-sm text-slate-600">Case REV-2405 • Acme Financial Corp • IFRS 9 Analysis</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {scoreCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className="p-6 border-slate-200">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 ${card.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-7 h-7 ${card.color}`} />
                </div>
              </div>
              <h3 className="text-sm text-slate-600 mb-2">{card.title}</h3>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-3xl text-[#0f172a]">{card.score}</span>
                <span className="text-slate-500 mb-1">/ 100</span>
              </div>
              <p className="text-xs text-slate-500">{card.description}</p>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Detected Standards */}
        <Card className="p-6 border-slate-200">
          <h2 className="text-lg text-[#0f172a] mb-4">Detected Standards</h2>
          <div className="space-y-3">
            {detectedStandards.map((standard, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-slate-600" />
                  <span className="text-sm text-[#0f172a]">{standard.name}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {standard.relevance}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Missing Evidence */}
        <Card className="p-6 border-slate-200">
          <h2 className="text-lg text-[#0f172a] mb-4">Missing Evidence</h2>
          <div className="space-y-3">
            {missingEvidence.map((item, index) => (
              <div key={index} className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm text-[#0f172a]">{item.item}</span>
                  {getSeverityBadge(item.severity)}
                </div>
                <p className="text-xs text-slate-600">Impact: {item.impact}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Weak Justifications */}
      <Card className="p-6 border-slate-200 mb-6">
        <h2 className="text-lg text-[#0f172a] mb-4">Weak Justifications</h2>
        <div className="space-y-4">
          {weakJustifications.map((item, index) => (
            <div key={index} className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-[#0f172a]">{item.area}</p>
                    <p className="text-xs text-slate-600 mt-1">{item.issue}</p>
                  </div>
                </div>
                {getSeverityBadge(item.severity)}
              </div>
              <div className="ml-8 mt-2 p-3 bg-blue-50 rounded border-l-2 border-blue-400">
                <p className="text-xs text-slate-700">
                  <strong>Recommendation:</strong> {item.recommendation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Auditor Concerns */}
      <Card className="p-6 border-slate-200 mb-6">
        <h2 className="text-lg text-[#0f172a] mb-4">Auditor Concerns</h2>
        <div className="space-y-4">
          {auditorConcerns.map((item, index) => (
            <div key={index} className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-[#0f172a]">{item.concern}</p>
                    <p className="text-xs text-slate-600 mt-1">{item.detail}</p>
                  </div>
                </div>
                {getSeverityBadge(item.severity)}
              </div>
              <div className="ml-8 mt-2 p-3 bg-red-50 rounded border-l-2 border-red-400">
                <p className="text-xs text-slate-700">
                  <strong>Action Required:</strong> {item.action}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recommendations */}
      <Card className="p-6 border-slate-200">
        <h2 className="text-lg text-[#0f172a] mb-4">Recommendations</h2>
        <div className="space-y-3">
          {recommendations.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-[#0f172a]">{item.recommendation}</span>
              </div>
              <div className="flex items-center gap-3">
                {getSeverityBadge(item.priority)}
                <span className="text-xs text-slate-500">{item.effort}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="mt-8 flex items-center justify-end gap-3">
        <Button variant="outline" className="h-11">
          Request Re-review
        </Button>
        <Button className="h-11 bg-[#0f172a] hover:bg-[#1e293b]">
          Mark as Reviewed
        </Button>
      </div>
    </div>
  );
}
