import re

# ==========================================================
# IFRS Knowledge Base
# ==========================================================

IFRS_KEYWORDS = {
    "IFRS 9": 10,
    "IFRS 15": 8,
    "IFRS 16": 8,
    "IAS 1": 8,
    "IAS 32": 7,
    "IAS 36": 7,
    "IAS 37": 7,
    "Expected Credit Loss": 10,
    "Financial Instrument": 8,
    "Fair Value": 7,
    "Impairment": 7,
    "Recognition": 5,
    "Measurement": 5,
    "Disclosure": 5,
    "Materiality": 5,
    "Going Concern": 6,
    "Judgement": 6,
    "Revenue": 5,
    "Lease": 5,
    "Provision": 5
}


# ==========================================================
# Main Function
# ==========================================================

def analyze_ifrs(text: str):

    text_lower = text.lower()

    score = 50

    matched_standards = []

    # ------------------------------------------
    # Search for IFRS Keywords
    # ------------------------------------------

    for keyword, value in IFRS_KEYWORDS.items():

        if keyword.lower() in text_lower:

            score += value

            matched_standards.append(keyword)

    # ------------------------------------------
    # Professional Accounting Terms
    # ------------------------------------------

    professional_terms = [
        "management",
        "assessment",
        "analysis",
        "assumption",
        "estimate",
        "evidence",
        "policy",
        "compliance"
    ]

    professional_score = 0

    for term in professional_terms:

        if term in text_lower:

            professional_score += 2

    score += professional_score

    # ------------------------------------------
    # Limit Score
    # ------------------------------------------

    score = min(score, 100)

    # ------------------------------------------
    # Risk Level
    # ------------------------------------------

    if score >= 90:

        risk = "Low"

    elif score >= 75:

        risk = "Medium"

    else:

        risk = "High"

    # ------------------------------------------
    # Acceptance Probability
    # ------------------------------------------

    probability = min(score + 2, 99)

    # ------------------------------------------
    # Recommendations
    # ------------------------------------------

    recommendations = []

    if "IFRS 9" not in matched_standards:

        recommendations.append(
            "Reference IFRS 9 requirements where applicable."
        )

    if "IAS 1" not in matched_standards:

        recommendations.append(
            "Improve IAS 1 presentation and disclosure."
        )

    if "Expected Credit Loss" not in matched_standards:

        recommendations.append(
            "Include Expected Credit Loss methodology."
        )

    if "Financial Instrument" not in matched_standards:

        recommendations.append(
            "Clarify financial instrument classification."
        )

    if "Judgement" not in matched_standards:

        recommendations.append(
            "Document management judgement clearly."
        )

    if len(matched_standards) == 0:

        recommendations.append(
            "No IFRS references were detected."
        )

    # ------------------------------------------
    # Summary
    # ------------------------------------------

    if score >= 90:

        summary = (
            "The accounting memo demonstrates strong alignment with IFRS "
            "requirements and is likely ready for external review with only "
            "minor improvements."
        )

    elif score >= 75:

        summary = (
            "The accounting memo generally complies with IFRS requirements "
            "but requires additional clarification before submission."
        )

    else:

        summary = (
            "The accounting memo lacks sufficient IFRS evidence and should "
            "be revised before being submitted to the external auditor."
        )

    # ------------------------------------------
    # Quality Metrics
    # ------------------------------------------

    # ==========================================================
    # Detailed Metrics
    # ==========================================================

    coverage = min(len(matched_standards) * 15, 100)

    disclosure = min(score + 5, 100)

    judgement = 60 + professional_score * 4

    documentation = min(score + 3, 100)

    metrics = {

        "ifrs_coverage": coverage,

        "disclosure_quality": disclosure,

        "professional_judgement": min(judgement,100),

        "documentation_quality": documentation

    }

    # ------------------------------------------
    # Final JSON
    # ------------------------------------------

    return {

        "summary": summary,

        "compliance_score": score,

        "risk_level": risk,

        "acceptance_probability": probability,

        "relevant_ifrs": matched_standards,

        "recommendations": recommendations,

        "metrics": metrics

    }