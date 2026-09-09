import base64
import json
import logging
from .ai_service import groq_client

def extract_and_structure_text(image_bytes: bytes) -> dict:
    """
    Feature 4: Ancient Manuscript Multi-Modal Digitizer
    Takes image bytes, uses Groq Vision to extract and structure it into JSON.
    This avoids loading heavy PyTorch models (like EasyOCR) into memory.
    """
    try:
        # Convert bytes to base64
        base64_image = base64.b64encode(image_bytes).decode('utf-8')
        
        system_prompt = """
        You are an AI tasked with analyzing an image of ancient Ayurvedic or traditional medical manuscripts.
        Extract the text and identify key entities into a strict JSON format.
        
        Expected JSON format:
        {
            "identified_herbs": ["herb1", "herb2"],
            "symptoms_targeted": ["symptom1", "symptom2"],
            "formulation_steps": "Step by step process if found, otherwise 'Not found'",
            "confidence_score": "High/Medium/Low based on readability",
            "raw_ocr_text": "The raw text extracted from the image"
        }
        
        Output ONLY valid JSON. Do not include markdown blocks like ```json or any other text.
        """
        
        chat_completion = groq_client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": system_prompt},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}",
                            },
                        },
                    ],
                }
            ],
            model="qwen/qwen3.8-27b",
            temperature=0.1,
            max_tokens=800,
            response_format={"type": "json_object"}
        )
        
        structured_json = json.loads(chat_completion.choices[0].message.content)
        return structured_json
        
    except Exception as e:
        logging.error(f"Digitization failed: {str(e)}")
        # Real Mode: Return the actual error
        return {"error": str(e)}
