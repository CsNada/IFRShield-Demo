from PyPDF2 import PdfReader
from docx import Document
import os


def extract_text(file_path):

    extension = os.path.splitext(file_path)[1].lower()

    if extension == ".pdf":

        reader = PdfReader(file_path)

        text = ""

        for page in reader.pages:
            text += page.extract_text() or ""

        return text

    elif extension == ".docx":

        document = Document(file_path)

        text = ""

        for paragraph in document.paragraphs:
            text += paragraph.text + "\n"

        return text

    else:

        raise ValueError("Unsupported file type")