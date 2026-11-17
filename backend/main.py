from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np

app = FastAPI(
    title="Kopintar Backend API",
    description="FastAPI backend for Kopintar with CORS configured for Vite frontend",
    version="0.1.0",
)

# Configure CORS
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class HealthResponse(BaseModel):
    status: str
    message: str


class MathRequest(BaseModel):
    numbers: list[float]


class MathResponse(BaseModel):
    mean: float
    sum: float
    std_dev: float


@app.get("/", tags=["Root"])
def read_root():
    return {
        "message": "Welcome to Kopintar API",
        "docs": "/docs",
        "health": "/health",
    }


@app.get("/health", response_model=HealthResponse, tags=["Health"])
def health_check():
    return HealthResponse(
        status="ok",
        message="Backend service is operational and healthy."
    )


@app.post("/api/math/summary", response_model=MathResponse, tags=["Math"])
def calculate_summary(data: MathRequest):
    arr = np.array(data.numbers) if data.numbers else np.array([0.0])
    return MathResponse(
        mean=float(np.mean(arr)),
        sum=float(np.sum(arr)),
        std_dev=float(np.std(arr)),
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
