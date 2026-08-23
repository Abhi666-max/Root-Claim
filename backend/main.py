from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Root-Claim API", version="1.0.0")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    query: str

@app.get("/")
def read_root():
    return {"message": "Root-Claim FastAPI Backend is running."}

@app.get("/api/v1/health")
def health_check():
    return {"status": "healthy", "groq": bool(os.getenv("GROQ_API_KEY"))}

@app.post("/api/v1/chat")
def chat(request: ChatRequest):
    # TODO: Implement RAG with Groq and Supabase pgvector
    return {"reply": f"Received query: {request.query}", "citations": []}
