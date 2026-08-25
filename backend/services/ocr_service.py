import easyocr
import json
import logging
from .ai_service import groq_client

# Initialize EasyOCR Reader (loads models into memory on first run)
# We use 'en' and 'hi' (Hindi) since we are dealing with Indian traditional knowledge
try:
    reader = easyocr.Reader(['en', 'hi'], gpu=False) # CPU mode for compatibility
except Exception as e:
    logging.warning(f"EasyOCR initialization failed (this is expected if models aren't downloaded yet): {str(e)}")
    reader = None

def extract_and_structure_text(image_bytes: bytes) -> dict:
    """
    Feature 4: Ancient Manuscript Multi-Modal Digitizer
    Takes image bytes, runs OCR to extract raw text, and uses Groq to structure it into JSON.
    """
    if reader is None:
        return {"error": "OCR Engine not initialized."}

    try:
        # 1. Run EasyOCR
        # reader.readtext accepts bytes directly
        ocr_results = reader.readtext(image_bytes, detail=0)
        raw_text = " ".join(ocr_results)
        
        if not raw_text.strip():
            return {"error": "No text detected in the image."}

        # 2. Use Groq to Structure the text
        system_prompt = """
        You are an AI tasked with analyzing raw, messy OCR text extracted from ancient Ayurvedic or traditional medical manuscripts.
        Your goal is to parse the text and extract key entities into a strict JSON format.
        
        Expected JSON format:
        {
            "identified_herbs": ["herb1", "herb2"],
            "symptoms_targeted": ["symptom1", "symptom2"],
            "formulation_steps": "Step by step process if found, otherwise 'Not found'",
            "confidence_score": "High/Medium/Low based on readability"
        }
        
        Output ONLY valid JSON. Do not include markdown blocks like ```json or any other text.
        """
        
        chat_completion = groq_client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"OCR Raw Text:\n{raw_text}"}
            ],
            model="llama-3.1-8b-instant",
            temperature=0.1,
            response_format={"type": "json_object"}
        )
        
        structured_json = json.loads(chat_completion.choices[0].message.content)
        structured_json['raw_ocr_text'] = raw_text # Include the raw text for transparency
        
        return structured_json
        
    except Exception as e:
        return {"error": f"Digitization failed: {str(e)}"}
