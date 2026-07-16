import { useState } from "react";
import { useNavigate } from "react-router";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Upload, FileText, X } from "lucide-react";

export default function NewReviewPage() {

  console.log("NewReviewPage Render");

  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [analysisType, setAnalysisType] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles([...uploadedFiles, ...files.map(f => f.name)]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleRunReview = () => {
    // Simulate review and navigate to results
    navigate("/review-results/REV-2405");
  };

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl text-[#0f172a] mb-1">New Review</h1>
        <p className="text-sm text-slate-600">Submit accounting analysis for AI-powered audit review</p>
      </div>

      <Card className="p-8 border-slate-200">
        <div className="space-y-6">
          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="company-name">Company Name</Label>
            <Input
              id="company-name"
              placeholder="Enter company or entity name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="h-11"
            />
          </div>

          {/* Analysis Type */}
          {/* <div className="space-y-2">
            <Label htmlFor="analysis-type">Analysis Type</Label>
            <Select value={analysisType} onValueChange={setAnalysisType}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select analysis type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="revenue-recognition">Revenue Recognition (IFRS 15 / ASC 606)</SelectItem>
                <SelectItem value="lease-accounting">Lease Accounting (IFRS 16 / ASC 842)</SelectItem>
                <SelectItem value="credit-loss">Credit Loss Provision (IFRS 9 / ASC 326)</SelectItem>
                <SelectItem value="fair-value">Fair Value Measurement (IFRS 13 / ASC 820)</SelectItem>
                <SelectItem value="impairment">Asset Impairment (IAS 36 / ASC 350)</SelectItem>
                <SelectItem value="consolidation">Consolidation (IFRS 10 / ASC 810)</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div> */}

          {/* Accounting Analysis */}
          <div className="space-y-2">
            <Label htmlFor="analysis">Paste Accounting Analysis</Label>
            <Textarea
              id="analysis"
              placeholder="Paste your accounting memo, analysis, or documentation here..."
              value={analysis}
              onChange={(e) => setAnalysis(e.target.value)}
              className="min-h-[300px] font-mono text-sm"
            />
            <p className="text-xs text-slate-500">
              Include: transaction details, accounting treatment, standards applied, and professional judgment
            </p>
          </div>

          {/* File Upload */}
          <div className="space-y-3">
            <Label>Upload Supporting Documents</Label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-slate-400 transition-colors">
              <input
                type="file"
                id="file-upload"
                multiple
                className="hidden"
                onChange={handleFileUpload}
                accept=".pdf,.docx,.xlsx,.csv"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <p className="text-sm text-slate-600 mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-slate-500">
                  PDF, DOCX, XLSX, CSV (max 50MB)
                </p>
              </label>
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-2 mt-4">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-600" />
                      <span className="text-sm text-slate-700">{file}</span>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200">
            <Button variant="outline" className="h-11">
              Save Draft
            </Button>
            <Button 
              onClick={handleRunReview}
              className="h-11 bg-[#0f172a] hover:bg-[#1e293b] px-8"
            >
              Run Review
            </Button>
          </div>
        </div>
      </Card>

      {/* Help Section */}
      <Card className="mt-6 p-6 bg-blue-50 border-blue-200">
        <h3 className="text-sm text-[#0f172a] mb-2">Review Guidelines</h3>
        <ul className="text-sm text-slate-700 space-y-1 list-disc list-inside">
          <li>Ensure all accounting positions are clearly stated</li>
          <li>Include references to specific accounting standards</li>
          <li>Document assumptions and professional judgment used</li>
          <li>Attach supporting schedules and calculations</li>
          <li>Include management assertions and evidence</li>
        </ul>
      </Card>
    </div>
  );
}
