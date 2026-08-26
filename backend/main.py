from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv

# Import our Groq AI Service
from services.ai_service import generate_smart_draft, query_ip_sakti
from services.ocr_service import extract_and_structure_text
from services.vector_service import run_collision_radar, get_rag_context
from services.blockchain_service import generate_claim_hash, anchor_to_blockchain
from fastapi import UploadFile, File
import os
from supabase import create_client, Client

load_dotenv()

# Initialize Supabase
url: str = os.getenv("SUPABASE_URL", "")
key: str = os.getenv("SUPABASE_KEY", "")
supabase: Client = create_client(url, key) if url and key else None

app = FastAPI(title="Root-Claim API", version="1.0.0")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DraftRequest(BaseModel):
    raw_text: str

class ChatRequest(BaseModel):
    query: str

@app.get("/")
def read_root():
    return {"message": "Root-Claim FastAPI Backend is running."}

@app.get("/api/v1/health")
def health_check():
    return {"status": "healthy", "groq": bool(os.getenv("GROQ_API_KEY"))}

@app.post("/api/v1/draft")
def api_smart_draft(request: DraftRequest):
    """
    Feature 2: Vernacular AI Smart Draft Engine
    Converts Hinglish/English to formal botanical claims.
    """
    if not request.raw_text:
        raise HTTPException(status_code=400, detail="Raw text is required.")
    
    formatted_claim = generate_smart_draft(request.raw_text)
    return {"formatted_claim": formatted_claim}

@app.post("/api/v1/ip-sakti")
def api_ip_sakti(request: ChatRequest):
    """
    Feature 1: IP-SAKTI Core (Strict-Citation RAG Assistant)
    """
    if not request.query:
        raise HTTPException(status_code=400, detail="Query is required.")
    
    # Real RAG Execution: Fetch context from Supabase Vector DB
    retrieved_context, sources = get_rag_context(request.query)
    
    # Pass both the user query and the retrieved context to Groq
    answer = query_ip_sakti(request.query, retrieved_context=retrieved_context)
    return {"reply": answer, "sources": sources}

class ClaimRequest(BaseModel):
    user_id: str
    title: str
    raw_description: str
    ai_formatted_claim: str
    collision_score: float = 0.0

@app.post("/api/v1/claims")
def create_claim(request: ClaimRequest):
    if not supabase:
        raise HTTPException(status_code=500, detail="Database connection not configured")
    try:
        data, _ = supabase.table("claims").insert({
            "title": request.title,
            "raw_description": request.raw_description,
            "ai_formatted_claim": request.ai_formatted_claim,
            "collision_score": request.collision_score,
            # Assigning a dummy user ID if missing, or use provided
            # user_id must be a UUID format, for hackathon we just assume it's omitted or valid
        }).execute()
        return {"status": "success", "data": data[1] if data and len(data) > 1 else data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/v1/claims")
def get_claims():
    if not supabase:
        raise HTTPException(status_code=500, detail="Database connection not configured")
    try:
        response = supabase.table("claims").select("*").order("created_at", desc=True).execute()
        return {"status": "success", "claims": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class ClaimUpdate(BaseModel):
    status: str
    polygon_tx_hash: str = None

@app.patch("/api/v1/claims/{claim_id}")
def update_claim_status(claim_id: str, request: ClaimUpdate):
    if not supabase:
        raise HTTPException(status_code=500, detail="Database connection not configured")
    try:
        update_data = {"status": request.status}
        if request.polygon_tx_hash:
            update_data["polygon_tx_hash"] = request.polygon_tx_hash
        
        response = supabase.table("claims").update(update_data).eq("id", claim_id).execute()
        return {"status": "success", "data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class BroadcastEnhanceRequest(BaseModel):
    raw_message: str

@app.post("/api/v1/enhance-broadcast")
def api_enhance_broadcast(request: BroadcastEnhanceRequest):
    """
    Takes a raw alert message and formalizes it for the Ministry Broadcast System.
    """
    from groq import Groq
    try:
        client = Groq(api_key=os.getenv("GROQ_API_KEY"))
        completion = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[
                {"role": "system", "content": "You are a Ministry of Ayush official. Rewrite the user's raw broadcast alert into a highly formal, authoritative, and concise emergency notification (max 2 sentences). Do not use introductory words like 'Here is the rewrite', output only the final text."},
                {"role": "user", "content": request.raw_message}
            ],
            temperature=0.3,
            max_tokens=100
        )
        return {"enhanced_message": completion.choices[0].message.content.strip()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to enhance broadcast: {str(e)}")

class RadarRequest(BaseModel):
    claim_text: str

@app.post("/api/v1/radar")
def api_collision_radar(request: RadarRequest):
    """
    Feature 3: Deep Patent Collision Radar
    """
    if not request.claim_text:
        raise HTTPException(status_code=400, detail="Claim text is required.")
    
    result = run_collision_radar(request.claim_text)
    if "error" in result:
        raise HTTPException(status_code=500, detail=result["error"])
    return result

@app.post("/api/v1/ocr")
async def api_ocr_digitizer(file: UploadFile = File(...)):
    """
    Feature 4: Ancient Manuscript Multi-Modal Digitizer
    """
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image.")
    
    try:
        contents = await file.read()
        result = extract_and_structure_text(contents)
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process image: {str(e)}")

class AnchorRequest(BaseModel):
    claim_data: dict

@app.post("/api/v1/anchor")
def api_blockchain_vault(request: AnchorRequest):
    """
    Feature 5: Cryptographic 'Proof-of-Origin' Blockchain Vault
    """
    if not request.claim_data:
        raise HTTPException(status_code=400, detail="Claim data is required to anchor.")
    
    claim_hash = generate_claim_hash(request.claim_data)
    result = anchor_to_blockchain(claim_hash)
    
    if result.get("status") == "error":
        raise HTTPException(status_code=500, detail=result["message"])
    
    result["sha256_hash"] = claim_hash
    return result
