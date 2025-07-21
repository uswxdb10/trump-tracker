from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import federal_register, summarize

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(federal_register.router, prefix="/api")
app.include_router(summarize.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Trump Tracker API running"}
