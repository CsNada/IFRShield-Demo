import json
import os
from datetime import datetime

REVIEWS_FILE = "reviews.json"


def load_reviews():

    if not os.path.exists(REVIEWS_FILE):
        return []

    with open(REVIEWS_FILE, "r", encoding="utf-8") as file:
        return json.load(file)


def save_review(

    company,

    review_type,

    accounting_topic,

    filename,

    result

):

    reviews = load_reviews()

    review = {

        "id": len(reviews) + 1,

        "company": company,

        "review_type": review_type,

        "accounting_topic": accounting_topic,

        "filename": filename,

        "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),

        "compliance_score": result["compliance_score"],

        "risk_level": result["risk_level"],

        "acceptance_probability": result["acceptance_probability"]

    }

    reviews.append(review)

    with open(REVIEWS_FILE, "w", encoding="utf-8") as file:

        json.dump(
            reviews,
            file,
            indent=4,
            ensure_ascii=False
        )

    return review