import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()
groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_smart_draft(raw_text: str) -> str:
    """
    Feature 2: Vernacular AI Smart Draft Engine.
    Converts raw Hinglish/English input into a formal botanical patent claim.
    """
    system_prompt = """
    You are an expert Ayurvedic intellectual property (IP) lawyer and botanist working for the Ministry of Ayush, Government of India.
    Your job is to take raw, vernacular, or conversational input from citizens (often in Hinglish or simple English) describing a traditional remedy.
    You must format this into a highly structured, legally defensible botanical patent claim.
    
    Structure your response strictly as follows (use markdown):
    **TITLE:** [A formal, scientific title]
    **ABSTRACT:** [A brief 2-sentence summary]
    **BOTANICAL INGREDIENTS:** [List ingredients with scientific names if possible]
    **METHOD OF PREPARATION:** [Formalized steps]
    **TRADITIONAL CLAIM:** [The specific medicinal use case]
    
    Do NOT include any introductory or conversational text. Output ONLY the formatted claim.
    """

    try:
        chat_completion = groq_client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": raw_text}
            ],
            model="llama-3.1-8b-instant",
            temperature=0.2, # Low temperature for strict, formal output
            max_tokens=1024,
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        return f"Error generating draft: {str(e)}"

def query_ip_sakti(query: str, retrieved_context: str = "") -> str:
    """
    Feature 1: IP-SAKTI Core (Strict-Citation RAG Assistant)
    Answers legal queries based strictly on provided IP law context.
    """
    system_prompt = """
    You are IP-SAKTI, the official legal AI assistant for the Ministry of Ayush.
    You answer questions regarding intellectual property rights, bio-piracy, and traditional knowledge protection in India.
    
    CRITICAL RULE: You must ONLY use the information provided in the Context Block below. 
    If the answer is not in the context, say: "As per the currently loaded official mandate, I cannot provide a conclusive answer."
    Do NOT hallucinate legal advice.
    """
    
    user_prompt = f"""
    Context Block (Official IP Laws & Mandates):
    {retrieved_context if retrieved_context else "No specific legal context loaded for this query. Use general knowledge regarding Indian TKDL (Traditional Knowledge Digital Library) principles if applicable, but state that it is general knowledge."}
    
    User Query: {query}
    """

    try:
        chat_completion = groq_client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            model="llama-3.1-8b-instant",
            temperature=0.1,
            max_tokens=1024,
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        return f"Error querying IP-SAKTI: {str(e)}"
