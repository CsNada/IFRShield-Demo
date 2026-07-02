import { useState } from "react";
import { useNavigate } from "react-router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Search, Filter, Download } from "lucide-react";
import { Badge } from "../components/ui/badge";

interface Case {
  id: string;
  company: string;
  standard: string;
  riskScore: number;
  status: "Completed" | "In Progress" | "Review" | "Archived";
  date: string;
}

export default function CaseManagementPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");

  const cases: Case[] = [
    {
      id: "REV-2024-001",
      company: "Acme Financial Corp",
      standard: "IFRS 9",
      riskScore: 92,
      status: "Completed",
      date: "2026-06-17",
    },
    {
      id: "REV-2024-002",
      company: "Global Trade Bank",
      standard: "IFRS 15",
      riskScore: 78,
      status: "In Progress",
      date: "2026-06-16",
    },
    {
      id: "REV-2024-003",
      company: "Premier Credit Union",
      standard: "IFRS 16",
      riskScore: 65,
      status: "Review",
      date: "2026-06-15",
    },
    {
      id: "REV-2024-004",
      company: "CitiBank Holdings",
      standard: "IAS 36",
      riskScore: 88,
      status: "Completed",
      date: "2026-06-14",
    },
    {
      id: "REV-2024-005",
      company: "United Capital Bank",
      standard: "IFRS 10",
      riskScore: 71,
      status: "In Progress",
      date: "2026-06-13",
    },
    {
      id: "REV-2024-006",
      company: "National Trust Bank",
      standard: "IFRS 13",
      riskScore: 95,
      status: "Completed",
      date: "2026-06-12",
    },
    {
      id: "REV-2024-007",
      company: "Regional Banking Corp",
      standard: "IAS 1",
      riskScore: 58,
      status: "Review",
      date: "2026-06-11",
    },
    {
      id: "REV-2024-008",
      company: "Metropolitan Credit",
      standard: "IFRS 7",
      riskScore: 82,
      status: "Completed",
      date: "2026-06-10",
    },
    {
      id: "REV-2024-009",
      company: "First National Bank",
      standard: "IFRS 9",
      riskScore: 76,
      status: "Archived",
      date: "2026-06-09",
    },
    {
      id: "REV-2024-010",
      company: "Community Bank Group",
      standard: "IFRS 15",
      riskScore: 89,
      status: "Completed",
      date: "2026-06-08",
    },
  ];

  const getRiskLevel = (score: number) => {
    if (score >= 85) return "Low";
    if (score >= 70) return "Medium";
    return "High";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Review":
        return "bg-amber-100 text-amber-800";
      case "Archived":
        return "bg-slate-100 text-slate-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const filteredCases = cases.filter((case_) => {
    const matchesSearch =
      case_.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.standard.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || case_.status === statusFilter;

    const riskLevel = getRiskLevel(case_.riskScore);
    const matchesRisk = riskFilter === "all" || riskLevel === riskFilter;

    return matchesSearch && matchesStatus && matchesRisk;
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Case Management
        </h1>
        <p className="text-slate-600">
          View and manage all review cases and their status
        </p>
      </div>

      {/* Filters and Search */}
      <Card className="p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search by company, case ID, or standard..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Review">Review</SelectItem>
                <SelectItem value="Archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Risk Filter */}
          <div>
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Filter by risk" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="Low">Low Risk</SelectItem>
                <SelectItem value="Medium">Medium Risk</SelectItem>
                <SelectItem value="High">High Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filters
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <div className="ml-auto text-sm text-slate-600">
            Showing {filteredCases.length} of {cases.length} cases
          </div>
        </div>
      </Card>

      {/* Cases Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">
                  Case ID
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">
                  Company
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">
                  Primary Standard
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">
                  Risk Score
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">
                  Date
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.map((case_) => {
                const riskLevel = getRiskLevel(case_.riskScore);
                return (
                  <tr
                    key={case_.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <button
                        onClick={() => navigate(`/review-results/${case_.id}`)}
                        className="text-sm font-medium text-blue-900 hover:underline"
                      >
                        {case_.id}
                      </button>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-900">
                      {case_.company}
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant="outline" className="text-slate-700">
                        {case_.standard}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-semibold ${
                            riskLevel === "Low"
                              ? "text-green-600"
                              : riskLevel === "Medium"
                              ? "text-amber-600"
                              : "text-red-600"
                          }`}
                        >
                          {case_.riskScore}%
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            riskLevel === "Low"
                              ? "bg-green-100 text-green-700"
                              : riskLevel === "Medium"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {riskLevel}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          case_.status
                        )}`}
                      >
                        {case_.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600">
                      {case_.date}
                    </td>
                    <td className="py-4 px-6">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/review-results/${case_.id}`)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50">
          <p className="text-sm text-slate-600">
            Page 1 of 1
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
