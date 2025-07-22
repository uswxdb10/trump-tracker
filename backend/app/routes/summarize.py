from fastapi import APIRouter, Body
from backend.app.services.gpt_service import summarize_text


router = APIRouter()

@router.post("/summarize")
def summarize_endpoint(content: str = Body(..., embed=True)):
    return {"summary": summarize_text(content)}
