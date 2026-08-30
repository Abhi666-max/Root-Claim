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
    Your job is to take raw, vernacular, or conversational input from citizens describing a traditional remedy and format it into a highly structured, legally defensible botanical patent claim.
    CRITICAL RULE: The user may provide input in multiple fields (Title, Reference, Verse, Ingredients, Description). Synthesize all of it into the final structure.
    Structure your response strictly as follows (use ALL CAPS for headers, do NOT use markdown asterisks like **):
    TITLE: [A formal, scientific title]
    ABSTRACT: [A brief 2-sentence summary]
    BOTANICAL INGREDIENTS: [List ingredients with scientific names if possible]
    METHOD OF PREPARATION: [Formalized steps]
    TRADITIONAL CLAIM: [The specific medicinal use case]
    
    CRITICAL RULES:
    1. Do NOT include any introductory or conversational text. Output ONLY the formatted claim.
    2. Do NOT use markdown bolding (asterisks).
    3. If the user input is completely nonsensical, dangerous, toxic (like petrol/chemicals), or lacks any botanical/Ayurvedic basis, DO NOT use the structure above. Instead, directly reply with: "REJECTED: This input lacks traditional botanical precedence or contains toxic/non-Ayurvedic elements and cannot be patented under Indian Traditional Knowledge laws."
    """
    try:
        chat_completion = groq_client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": raw_text}
            ],
            model="llama-3.1-8b-instant",
            temperature=0.2, # Low temperature for strict, formal output
            max_tokens=2000,
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        return f"Error generating draft: {str(e)}"
def query_ip_sakti(query: str, retrieved_context: str = "", jurisdiction: str = "India") -> str:
    """
    Feature 1: IP-SAKTI Core (Strict-Citation RAG Assistant)
    Answers legal queries based strictly on provided IP law context.
    """
    if jurisdiction.lower() == "india":
        system_prompt = """
        You are IP-SAKTI, the official legal AI assistant for the Ministry of Ayush, Government of India.
        You answer questions regarding intellectual property rights, bio-piracy, and traditional knowledge protection STRICTLY under Indian law.
        
        CRITICAL JURISDICTION: Focus entirely on the Indian Patents Act 1970 (specifically Section 3(p) restricting patentability of traditional knowledge), the Biological Diversity Act 2002 (Access and Benefit Sharing guidelines), and TKDL frameworks.
        
        CRITICAL RULE (CLASSIFICATION FLOW): If the user asks to "Classify my Ayurvedic product" or similar, you MUST act as a classification wizard. Ask 2-3 minimum clarifying questions to determine if their product is a:
        1. Classical/Generic Medicine (drawn from First-Schedule authoritative text)
        2. Patent-or-Proprietary Medicine
        3. New Drug (requiring clinical proof)
        4. Phytopharmaceutical or Cosmetic
        Explain what each category requires regarding IP and Access-and-Benefit-Sharing (ABS) posture.
        
        CRITICAL RULE (CONTEXT & DISCLAIMER): Prioritize answering using the provided Context Block if relevant. 
        ALWAYS end your response with this EXACT disclaimer: "DISCLAIMER: This is an AI-generated informational response and not formal legal advice."
        
        FORMATTING RULE: Keep your responses highly structured, EXTREMELY concise (max 2 short paragraphs), and professional. Be direct and brief.
        """
    else:
        system_prompt = """
        You are IP-SAKTI, the official legal AI assistant for the Ministry of Ayush, operating in INTERNATIONAL mode.
        You answer questions regarding intellectual property rights, international patent defenses, and global bio-piracy protection.
        
        CRITICAL JURISDICTION: Focus entirely on International Intellectual Property laws, WIPO guidelines, PCT applications, defensive prior art filings at the EPO and USPTO, and the Nagoya Protocol.
        
        CRITICAL RULE (INTERNATIONAL STRATEGY): When advising on international patent applications involving Indian traditional knowledge, explicitly advise on how TKDL is utilized globally to block erroneous patents (like the Neem and Turmeric cases at EPO/USPTO).
        
        CRITICAL RULE (CONTEXT & DISCLAIMER): Prioritize answering using the provided Context Block if relevant. 
        ALWAYS end your response with this EXACT disclaimer: "DISCLAIMER: This is an AI-generated informational response and not formal legal advice."
        
        FORMATTING RULE: Keep your responses highly structured, EXTREMELY concise (max 2 short paragraphs), and professional. Be direct and brief.
        """
    
    user_prompt = f"""
    Context Block (Official IP Laws & Mandates):
    {retrieved_context if retrieved_context else "No specific legal context loaded for this query."}
    
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
            max_tokens=2000,
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        return f"Error querying IP-SAKTI: {str(e)}"
