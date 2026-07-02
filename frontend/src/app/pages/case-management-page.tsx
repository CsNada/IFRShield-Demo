import { useState } from "react";
import { Link } from "react-router";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../components/ui/table";
import { Search, Filter, Download, Plus } from "lucide-react";

export function CaseManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const cases = [
    {
      id: "REV-2405",
      company: "Acme Financial Corp",
      standard: "IFRS 9",
      riskScore: 88,
      status: "In Review",
      date: "2026-06-18",
      reviewer: "Sarah Chen",
    },
    {
      id: "REV-2404",
      company: "Metropolitan Savings",
      standard: "IFRS 15",
      riskScore: 95,
      status: "Completed",
      date: "2026-06-16",
      reviewer: "Michael Torres",
    },
    {
      id: "REV-2403",
      company: "Premier Credit Union",
      standard: "ASC 326",
      riskScore: 72,
      status: "Flagged",
      date: "2026-06-16",
      reviewer: "Jessica Park",
    },
    {
      id: "REV-2402",
      company: "Global Trade Bank",
      standard: "IFRS 16",
      riskScore: 85,
      status: "Completed",
      date: "2026-06-17",
      reviewer: "David Kim",
    },
    {
      id: "REV-2401",
      company: "Acme Financial Corp",
      standard: "IFRS 9",
      riskScore: 92,
      status: "Completed",
      date: "2026-06-17",
      reviewer: "Sarah Chen",
    },
    {
      id: "REV-2400",
      company: "Coastal Insurance Co",
      standard: "IFRS 17",
      riskScore: 78,
      status: "In Review",
      date: "2026-06-15",
      reviewer: "Rachel Adams",
    },
    {
      id: "REV-2399",
      company: "TechVenture Capital",
      standard: "IFRS 10",
      riskScore: 89,
      status: "Completed",
      date: "2026-06-15",
      reviewer: "James Wilson",
    },
    {
      id: "REV-2398",
      company: "Regional Bank Corp",
      standard: "ASC 606",
      riskScore: 66,
      status: "Flagged",
      date: "2026-06-14",
      reviewer: "Emily Chen",
    },
    {
      id: "REV-2397",
      company: "Midwest Credit Union",
      standard: "IFRS 9",
      riskScore: 94,
      status: "Completed",
      date: "2026-06-14",
      reviewer: "Michael Torres",
    },
    {
      id: "REV-2396",
      company: "Global Finance Ltd",
      standard: "IAS 36",
      riskScore: 81,
      status: "In Review",
      date: "2026-06-13",
      reviewer: "Sarah Chen",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Completed</Badge>;
      case "In Review":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">In Review</Badge>;
      case "Flagged":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Flagged</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-amber-600";
    return "text-red-600";
  };

  const filteredCases = cases.filter((c) =>
    c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.standard.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-[#0f172a] mb-1">Case Management</h1>
          <p className="text-sm text-slate-600">Track and manage all audit reviews</p>
        </div>
        <Link to="/new-review">
          <Button className="bg-[#0f172a] hover:bg-[#1e293b] gap-2">
            <Plus className="w-4 h-4" />
            New Review
          </Button>
        </Link>
      </div>

      {/* Filters and Search */}
      <Card className="p-4 border-slate-200 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Search by case ID, company, or standard..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </Card>

      {/* Cases Table */}
      <Card className="border-slate-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="text-[#0f172a]">Case ID</TableHead>
              <TableHead className="text-[#0f172a]">Company</TableHead>
              <TableHead className="text-[#0f172a]">Primary Standard</TableHead>
              <TableHead className="text-[#0f172a]">Risk Score</TableHead>
              <TableHead className="text-[#0f172a]">Status</TableHead>
              <TableHead className="text-[#0f172a]">Reviewer</TableHead>
              <TableHead className="text-[#0f172a]">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCases.map((caseItem) => (
              <TableRow 
                key={caseItem.id} 
                className="hover:bg-slate-50 cursor-pointer"
              >
                <TableCell>
                  <Link 
                    to={`/review-results/${caseItem.id}`}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {caseItem.id}
                  </Link>
                </TableCell>
                <TableCell className="text-[#0f172a]">
                  {caseItem.company}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {caseItem.standard}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className={`text-lg ${getRiskScoreColor(caseItem.riskScore)}`}>
                      {caseItem.riskScore}
                    </span>
                    <span className="text-xs text-slate-500">/ 100</span>
                  </div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(caseItem.status)}
                </TableCell>
                <TableCell className="text-slate-600">
                  {caseItem.reviewer}
                </TableCell>
                <TableCell className="text-slate-600">
                  {caseItem.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <Card className="p-4 border-slate-200">
          <p className="text-xs text-slate-600 mb-1">Total Cases</p>
          <p className="text-2xl text-[#0f172a]">{cases.length}</p>
        </Card>
        <Card className="p-4 border-slate-200">
          <p className="text-xs text-slate-600 mb-1">In Review</p>
          <p className="text-2xl text-blue-600">
            {cases.filter(c => c.status === "In Review").length}
          </p>
        </Card>
        <Card className="p-4 border-slate-200">
          <p className="text-xs text-slate-600 mb-1">Flagged</p>
          <p className="text-2xl text-red-600">
            {cases.filter(c => c.status === "Flagged").length}
          </p>
        </Card>
        <Card className="p-4 border-slate-200">
          <p className="text-xs text-slate-600 mb-1">Avg Risk Score</p>
          <p className="text-2xl text-emerald-600">
            {Math.round(cases.reduce((sum, c) => sum + c.riskScore, 0) / cases.length)}
          </p>
        </Card>
      </div>
    </div>
  );
}
