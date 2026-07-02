import { useState } from "react";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  Search, 
  BookOpen, 
  FileText, 
  CheckSquare,
  FolderOpen,
  ExternalLink,
  Download
} from "lucide-react";

export function KnowledgeBasePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const ifrsStandards = [
    {
      code: "IFRS 9",
      title: "Financial Instruments",
      description: "Classification, measurement, and impairment of financial assets and liabilities",
      documents: 12,
      lastUpdated: "2026-05-15",
    },
    {
      code: "IFRS 15",
      title: "Revenue from Contracts with Customers",
      description: "Five-step model for revenue recognition from customer contracts",
      documents: 18,
      lastUpdated: "2026-06-01",
    },
    {
      code: "IFRS 16",
      title: "Leases",
      description: "Recognition, measurement, presentation and disclosure of leases",
      documents: 15,
      lastUpdated: "2026-04-20",
    },
    {
      code: "IFRS 17",
      title: "Insurance Contracts",
      description: "Accounting for insurance contracts issued and reinsurance contracts held",
      documents: 10,
      lastUpdated: "2026-05-30",
    },
    {
      code: "IFRS 13",
      title: "Fair Value Measurement",
      description: "Framework for fair value measurement and disclosure requirements",
      documents: 9,
      lastUpdated: "2026-03-15",
    },
    {
      code: "IAS 36",
      title: "Impairment of Assets",
      description: "Procedures to ensure assets are carried at no more than recoverable amount",
      documents: 11,
      lastUpdated: "2026-04-10",
    },
  ];

  const auditGuidance = [
    {
      title: "Expected Credit Loss Models - Best Practices",
      category: "Credit Risk",
      type: "Guide",
      pages: 45,
      date: "2026-06-10",
    },
    {
      title: "Revenue Recognition - Common Pitfalls",
      category: "Revenue",
      type: "Alert",
      pages: 12,
      date: "2026-06-05",
    },
    {
      title: "Lease Modification Accounting",
      category: "Leases",
      type: "Technical Note",
      pages: 23,
      date: "2026-05-28",
    },
    {
      title: "Fair Value Hierarchy - Documentation Requirements",
      category: "Valuation",
      type: "Guide",
      pages: 18,
      date: "2026-05-20",
    },
    {
      title: "Goodwill Impairment Testing Framework",
      category: "Impairment",
      type: "Guide",
      pages: 32,
      date: "2026-05-15",
    },
  ];

  const checklists = [
    {
      title: "IFRS 9 Pre-Audit Checklist",
      items: 45,
      category: "Financial Instruments",
      completionRate: 92,
      lastUsed: "2026-06-17",
    },
    {
      title: "Revenue Recognition Review",
      items: 38,
      category: "Revenue",
      completionRate: 88,
      lastUsed: "2026-06-16",
    },
    {
      title: "Lease Accounting Compliance",
      items: 52,
      category: "Leases",
      completionRate: 95,
      lastUsed: "2026-06-15",
    },
    {
      title: "Credit Loss Provision Review",
      items: 41,
      category: "Credit Risk",
      completionRate: 85,
      lastUsed: "2026-06-14",
    },
  ];

  const pastCases = [
    {
      id: "REV-2245",
      company: "Regional Bank Corp",
      standard: "IFRS 9",
      scenario: "Stage 2 allocation for restructured loans",
      outcome: "Approved with modifications",
      score: 89,
      date: "2026-05-20",
    },
    {
      id: "REV-2198",
      company: "Tech Solutions Inc",
      standard: "IFRS 15",
      scenario: "Multi-element arrangement with variable consideration",
      outcome: "Approved",
      score: 94,
      date: "2026-05-10",
    },
    {
      id: "REV-2176",
      company: "Retail Group Ltd",
      standard: "IFRS 16",
      scenario: "Sale and leaseback transaction classification",
      outcome: "Rework required",
      score: 72,
      date: "2026-04-28",
    },
    {
      id: "REV-2134",
      company: "Financial Services Co",
      standard: "IFRS 9",
      scenario: "Forward-looking information in ECL calculation",
      outcome: "Approved",
      score: 91,
      date: "2026-04-15",
    },
  ];

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl text-[#0f172a] mb-1">Knowledge Base</h1>
        <p className="text-sm text-slate-600">Standards, guidance, and reference materials</p>
      </div>

      {/* Search */}
      <Card className="p-4 border-slate-200 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Search standards, guidance, or past cases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10"
            />
          </div>
          <Button className="bg-[#0f172a] hover:bg-[#1e293b]">
            Search
          </Button>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="standards" className="space-y-6">
        <TabsList className="bg-slate-100">
          <TabsTrigger value="standards" className="gap-2">
            <BookOpen className="w-4 h-4" />
            IFRS Standards
          </TabsTrigger>
          <TabsTrigger value="guidance" className="gap-2">
            <FileText className="w-4 h-4" />
            Audit Guidance
          </TabsTrigger>
          <TabsTrigger value="checklists" className="gap-2">
            <CheckSquare className="w-4 h-4" />
            Review Checklists
          </TabsTrigger>
          <TabsTrigger value="cases" className="gap-2">
            <FolderOpen className="w-4 h-4" />
            Past Cases
          </TabsTrigger>
        </TabsList>

        {/* IFRS Standards */}
        <TabsContent value="standards" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ifrsStandards.map((standard) => (
              <Card key={standard.code} className="p-6 border-slate-200 hover:border-slate-300 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg text-[#0f172a] mb-1">{standard.code}</h3>
                    <p className="text-sm text-slate-900">{standard.title}</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ExternalLink className="w-4 h-4 text-slate-600" />
                  </Button>
                </div>
                <p className="text-sm text-slate-600 mb-4">{standard.description}</p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{standard.documents} documents</span>
                  <span>Updated {standard.lastUpdated}</span>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Audit Guidance */}
        <TabsContent value="guidance" className="space-y-4">
          {auditGuidance.map((guide, index) => (
            <Card key={index} className="p-6 border-slate-200 hover:border-slate-300 transition-colors cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base text-[#0f172a] mb-1">{guide.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-slate-600">
                      <span className="px-2 py-1 bg-slate-100 rounded">{guide.category}</span>
                      <span className="px-2 py-1 bg-slate-100 rounded">{guide.type}</span>
                      <span>{guide.pages} pages</span>
                      <span>•</span>
                      <span>{guide.date}</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>
            </Card>
          ))}
        </TabsContent>

        {/* Review Checklists */}
        <TabsContent value="checklists" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {checklists.map((checklist, index) => (
              <Card key={index} className="p-6 border-slate-200 hover:border-slate-300 transition-colors cursor-pointer">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckSquare className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base text-[#0f172a] mb-1">{checklist.title}</h3>
                    <p className="text-xs text-slate-600">{checklist.category}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                      <span>Completion Rate</span>
                      <span>{checklist.completionRate}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className="bg-emerald-500 h-2 rounded-full transition-all"
                        style={{ width: `${checklist.completionRate}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{checklist.items} items</span>
                    <span>Last used {checklist.lastUsed}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Past Cases */}
        <TabsContent value="cases" className="space-y-4">
          {pastCases.map((caseItem) => (
            <Card key={caseItem.id} className="p-6 border-slate-200 hover:border-slate-300 transition-colors cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-base text-[#0f172a]">{caseItem.id}</h3>
                    <span className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-700">
                      {caseItem.standard}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-1">{caseItem.company}</p>
                  <p className="text-sm text-slate-900">{caseItem.scenario}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl text-emerald-600 mb-1">{caseItem.score}</div>
                  <p className="text-xs text-slate-500">Score</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <span className="text-xs text-slate-600">
                  Outcome: <span className="text-slate-900">{caseItem.outcome}</span>
                </span>
                <span className="text-xs text-slate-500">{caseItem.date}</span>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
