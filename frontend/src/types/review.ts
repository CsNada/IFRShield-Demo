export interface ReviewResult {
  review_id: number;
  status: string;
  created_at: string;

  summary: string;

  compliance_score: number;

  risk_level: string;

  acceptance_probability: number;

  relevant_ifrs: string[];

  recommendations: string[];

  metrics: {
    ifrs_coverage: number;
    disclosure_quality: number;
    professional_judgement: number;
    documentation_quality: number;
  };
}