from ai import analyze_ifrs
from parser import extract_text
from fastapi import FastAPI, UploadFile, File
from reviews import save_review, load_reviews
from fastapi.middleware.cors import CORSMiddleware
import time
import shutil
import os
from fastapi import Form


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.get("/")
def root():
    return {
        "message": "IFRShield Backend is running successfully!"
    }


@app.post("/review")
async def review(

    company: str = Form(...),

    review_type: str = Form(...),

    accounting_topic: str = Form(""),

    file: UploadFile = File(...)

):

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = extract_text(file_path)
    time.sleep(2)
    result = analyze_ifrs(text)
    saved_review = save_review(
        company,
        review_type,
        accounting_topic,
        file.filename,
        result
    )


    result["review_id"] = saved_review["id"]
    result["created_at"] = saved_review["date"]
    result["status"] = "Completed"

    return result



@app.get("/history")
def get_history():

    return load_reviews()
