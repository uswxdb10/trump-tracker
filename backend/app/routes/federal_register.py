import httpx
from fastapi import APIRouter

router = APIRouter()

@router.get("/executive-orders")
async def get_executive_orders():
    url = "https://www.federalregister.gov/api/v1/documents.json?order=newest&per_page=5&conditions%5Bpresident%5D=donald-trump"
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        return {"results": response.json().get("results", [])}
