import { useState } from "react";
import { useNavigate } from "react-router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "../components/ui/select";
import { Upload, FileText, Loader2, Play, X } from "lucide-react";
import { useLanguage } from "../context/language";

import { uploadReview } from "../../services/reviewService";


const REVIEW_TYPES = [
  "Financial Instrument Classification",
  "Expected Credit Loss (ECL)",
  "Fair Value Assessment",
  "Revenue Recognition",
  "Impairment Assessment",
  "Provision Assessment",
  "General Accounting Review",
];

const ACCOUNTING_TOPICS = [
  "Business Model Assessment",
  "SPPI Test Analysis",
  "ECL Stage 1 / Stage 2 / Stage 3",
  "Lease Identification & IBR",
  "Revenue Performance Obligations",
  "CGU Identification & Value in Use",
  "Fair Value Hierarchy (Level 1/2/3)",
  "Disclosure Completeness",
  "Other",
];

export default function NewReviewPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [company, setCompany] = useState("");
  const [reviewType, setReviewType] = useState("");
  const [accountingTopic, setAccountingTopic] = useState("");
  const [memoText, setMemoText] = useState("");
  const [memoFile, setMemoFile] = useState<File | null>(null);
  const [supportingFiles, setSupportingFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState(false);

  // At least one of memoText, memoFile, or supportingFiles must be provided.
  const hasContent = memoText.trim().length > 0 || memoFile !== null || supportingFiles.length > 0;

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!hasContent) {
  //     setValidationError(true);
  //     return;
  //   }
  //   setValidationError(false);
  //   setIsSubmitting(true);
  //   setTimeout(() => navigate("/ai-pipeline"), 400);
  // };


  const handleSubmit = async (e: React.FormEvent) => {

  e.preventDefault();

  if (!hasContent) {

    setValidationError(true);

    return;

  }

  if (!memoFile) {

    alert("Please upload an Accounting Memo.");

    return;

  }

  try {

    setValidationError(false);

    setIsSubmitting(true);

    const result = await uploadReview(

      memoFile,

      company,

      reviewType,

      accountingTopic

    );

    sessionStorage.setItem(
      "reviewResult",
      JSON.stringify(result)
    );

    navigate("/ai-pipeline");

  } catch (error: any) {

    console.error("Full Error:", error);

    alert(error?.message || "Unknown Error");

    setIsSubmitting(false);

  }

};




  const B = "#6B5240"; // primary brown
  const BORDER = "#DDD5CB";
  const BG = "#FAF8F5";
  const MUTED = "#8C7B6E";
  const DARK = "#3D3028";

  const SectionCard = ({ children, title }: { children: React.ReactNode; title: string }) => (
    <Card className="mb-5 overflow-hidden border" style={{ borderColor: BORDER }}>
      <div className="px-6 py-4 border-b" style={{ background: "#F5EFE8", borderColor: BORDER }}>
        <h2 className="text-sm font-semibold" style={{ color: DARK }}>{title}</h2>
      </div>
      <div className="p-6 bg-white">{children}</div>
    </Card>
  );

  return (
    <div className="p-8 max-w-4xl mx-auto" style={{ background: BG, minHeight: "100%" }}>
      <div className="mb-7">
        <h1 className="text-3xl font-bold mb-1" style={{ color: DARK }}>New Review Request</h1>
        <p className="text-sm" style={{ color: MUTED }}>
          Submit an Accounting Memo for AI-powered pre-audit evaluation against IFRS / IAS standards.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Company & Review Type */}
        <SectionCard title="Review Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium" style={{ color: "#5A4A3A" }}>
                Company / Bank Name <span style={{ color: "#B85450" }}>*</span>
              </Label>
              <Input placeholder="e.g. Acme Financial Corp" value={company}
                onChange={(e) => setCompany(e.target.value)} required maxLength={200}
                className="h-11 text-sm" style={{ borderColor: BORDER, background: "#FFFFFF" }} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium" style={{ color: "#5A4A3A" }}>
                Review Type <span style={{ color: "#B85450" }}>*</span>
              </Label>
              <Select value={reviewType} onValueChange={setReviewType}>
                <SelectTrigger className="h-11 text-sm" style={{ borderColor: BORDER, background: "#FFFFFF" }}>
                  <SelectValue placeholder="Select review type" />
                </SelectTrigger>
                <SelectContent>
                  {REVIEW_TYPES.map((rt) => (
                    <SelectItem key={rt} value={rt}>{rt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label className="text-sm font-medium" style={{ color: "#5A4A3A" }}>
                Accounting Topic
              </Label>
              <Select value={accountingTopic} onValueChange={setAccountingTopic}>
                <SelectTrigger className="h-11 text-sm" style={{ borderColor: BORDER, background: "#FFFFFF" }}>
                  <SelectValue placeholder="Select specific accounting topic" />
                </SelectTrigger>
                <SelectContent>
                  {ACCOUNTING_TOPICS.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </SectionCard>

        {/* Upload Accounting Memo */}
        <SectionCard title="Accounting Memo">
          {/* File upload */}
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: MUTED }}>
              Upload Memo File
            </p>
            {memoFile ? (
              <div className="flex items-center gap-3 p-4 rounded-xl border" style={{ background: "#F5EFE8", borderColor: BORDER }}>
                <FileText className="w-5 h-5 shrink-0" style={{ color: B }} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: DARK }}>{memoFile.name}</p>
                  <p className="text-xs" style={{ color: MUTED }}>{(memoFile.size / 1024).toFixed(1)} KB</p>
                </div>
                <button type="button" onClick={() => setMemoFile(null)}
                  className="shrink-0 p-1 rounded hover:bg-[#EDE8E1] transition-colors">
                  <X className="w-4 h-4" style={{ color: MUTED }} />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:opacity-80 transition-all"
                style={{ borderColor: BORDER, background: "#FDFAF7" }}
                onClick={() => document.getElementById("memo-upload")?.click()}>
                <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: B }} />
                <p className="text-sm font-medium" style={{ color: DARK }}>Upload Accounting Memo</p>
                <p className="text-xs mt-1" style={{ color: MUTED }}>PDF, Word, or Excel — Max 25 MB</p>
                <input id="memo-upload" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx"
                  onChange={(e) => { if (e.target.files?.[0]) { setMemoFile(e.target.files[0]); setValidationError(false); } }} className="hidden" />
              </div>
            )}
          </div>

          {/* Or manual paste */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: MUTED }}>
              Or Paste Memo Text
            </p>
            <Textarea placeholder="Paste the full Accounting Memo here — include facts, accounting treatment, IFRS / IAS standards applied, professional judgment, and key assumptions..."
              value={memoText} onChange={(e) => { setMemoText(e.target.value); if (validationError) setValidationError(false); }}
              className="min-h-[200px] font-mono text-sm resize-none"
              style={{ borderColor: validationError && !hasContent ? "#B85450" : BORDER, background: "#FFFFFF" }} />
            <p className="text-xs mt-1.5" style={{ color: MUTED }}>
              Optional if you upload a file above. You can provide text, a file, or both.
            </p>
          </div>
        </SectionCard>

        {/* Supporting Documents */}
        <SectionCard title="Supporting Documents (Optional)">
          <div className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:opacity-80 transition-all mb-4"
            style={{ borderColor: BORDER, background: "#FDFAF7" }}
            onClick={() => document.getElementById("support-upload")?.click()}>
            <Upload className="w-7 h-7 mx-auto mb-2" style={{ color: MUTED }} />
            <p className="text-sm font-medium" style={{ color: DARK }}>Upload Supporting Evidence</p>
            <p className="text-xs mt-1" style={{ color: MUTED }}>Board minutes, calculations, external data, valuations — Max 10 MB each</p>
            <input id="support-upload" type="file" multiple accept=".pdf,.doc,.docx,.xls,.xlsx"
              onChange={(e) => { if (e.target.files) { setSupportingFiles(f => [...f, ...Array.from(e.target.files!)]); setValidationError(false); } }}
              className="hidden" />
          </div>
          {supportingFiles.length > 0 && (
            <div className="space-y-2">
              {supportingFiles.map((f, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg border"
                  style={{ background: "#F5EFE8", borderColor: BORDER }}>
                  <FileText className="w-4 h-4 shrink-0" style={{ color: B }} />
                  <span className="text-sm flex-1 truncate" style={{ color: DARK }}>{f.name}</span>
                  <span className="text-xs" style={{ color: MUTED }}>{(f.size / 1024).toFixed(1)} KB</span>
                  <button type="button" onClick={() => setSupportingFiles(files => files.filter((_, j) => j !== i))}
                    className="shrink-0 p-1 rounded hover:bg-[#EDE8E1]">
                    <X className="w-3.5 h-3.5" style={{ color: MUTED }} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        {/* Validation message */}
        {validationError && !hasContent && (
          <div className="mb-4 px-4 py-3 rounded-xl border text-sm font-medium flex items-start gap-2.5"
            style={{ background: "#FDF2F2", borderColor: "#E8BFBF", color: "#8B3535" }}>
            <span className="shrink-0 mt-0.5">⚠</span>
            Please provide an Accounting Memo, upload a document, or both before starting the AI review.
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <Button type="button" variant="outline" onClick={() => navigate("/")} disabled={isSubmitting}
            className="text-sm" style={{ borderColor: BORDER, color: DARK }}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || (!hasContent && false)}
            className="gap-2 px-8 h-11 text-sm font-semibold border-0"
            style={{
              background: isSubmitting ? "#9A8470" : B,
              color: "#FFFFFF",
              opacity: (!hasContent && !isSubmitting) ? 0.6 : 1,
            }}>
            {isSubmitting
              ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting...</>
              : <><Play className="w-4 h-4" />Run AI Review</>}
          </Button>
        </div>
      </form>
    </div>
  );
}
