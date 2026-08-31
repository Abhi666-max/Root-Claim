<div align="center">
  <img src="https://img.icons8.com/color/150/000000/scales--v1.png" alt="Root-Claim Logo" width="100"/>
  <h1>Root-Claim (IP-SAKTI Sahayak)</h1>
  <p><strong>SIH 2026 Winner Submission - Problem Statement ID: 26045</strong></p>
  <p>An AI-driven, multilingual RAG assistant & Blockchain ecosystem for Indian Traditional Knowledge IP protection and Anti Bio-piracy.</p>

  [![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org/)
  [![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
  [![Supabase](https://img.shields.io/badge/Supabase-DB-3ECF8E?style=flat&logo=supabase)](https://supabase.com/)
  [![Groq](https://img.shields.io/badge/Groq-LPU_Engine-F55036?style=flat)](https://groq.com/)
  [![Blockchain](https://img.shields.io/badge/Polygon-Simulated-8247E5?style=flat&logo=polygon)](https://polygon.technology/)
</div>

<br />

## 🌟 Overview (Ministry of Ayush)

Ayurveda rests on a vast corpus of traditional knowledge (TK). However, legitimate Ayurvedic innovation remains under-protected, while India's traditional knowledge is constantly exposed to global **bio-piracy** abroad (e.g., historical patent attempts on Turmeric and Neem).

**Root-Claim** bridges this gap. It provides a dual-interface ecosystem that:
1. Empowers grassroots citizens (Vaidyas, Farmers, MSMEs) to formalize their traditional knowledge into legally defensible patent structures using AI.
2. Equips the **Ministry of Ayush** with a real-time "Collision Radar" to actively detect and destroy foreign bio-piracy attempts globally.

---

## 🚀 Core Features & Working Mechanism

### 1. IP-SAKTI Sahayak (Dual-Jurisdiction RAG Chatbot)
A highly accurate, hallucination-free legal assistant for IP law.
* **Mechanism:** Uses a strict Jurisdiction Toggle. If "India" is selected, the AI limits itself exclusively to the *Patents Act 1970 (Section 3p)* and *Biodiversity Act*. If "International (WIPO)" is selected, it completely shifts its persona to analyze queries via *PCT, EPO, and the Nagoya Protocol*.
* **Tech:** RAG Pipeline with Supabase `ilike` searching + Groq `qwen3.8-27b`.

### 2. Smart Draft Engine (Vernacular to Patent)
* **Mechanism:** Intercepts unstructured, conversational inputs from villagers (e.g., "Neem heals wounds") and utilizes a highly constrained Prompt Engineering architecture to output a formal patent structure (Title, Botanical Ingredients, Method of Prep, Traditional Claim).

### 3. Deep Patent Collision Radar (Anti Bio-Piracy)
* **Mechanism:** Simulates the continuous ingestion of newly filed international patents. It cross-references these against the verified Indian Traditional Knowledge Digital Library (TKDL) database hosted in Supabase. High overlap generates a RED alert for instant Ministry intervention.

### 4. Ancient Manuscript OCR Digitizer
* **Mechanism:** The Next.js frontend captures an image of a historical manuscript and converts it to Base64. The FastAPI backend pipes this into Groq's multi-modal Vision API (`llama-3.2-90b-vision-preview`) to transcribe and digitize the decaying text.

### 5. Blockchain Proof-of-Origin (Immutable Timestamping)
* **Mechanism:** To provide irrefutable proof of Prior Art, the system takes the entire JSON payload of a citizen's claim and runs it through a SHA-256 cryptographic hashing algorithm. This 64-character digital fingerprint is simulated onto the Polygon Blockchain, yielding a verifiable Block Number and Transaction Hash.

---

## 🛠️ Tech Stack & Architecture

We engineered a highly optimized decoupled architecture to guarantee 0-second latency during live presentations, fully bypassing standard edge computing constraints.

### Frontend (Client-Side)
* **Next.js 14** (App Router)
* **TypeScript**
* **Tailwind CSS + Aceternity UI** (Premium Glassmorphism)
* **Framer Motion** (Fluid micro-interactions)
* Hosted on **Vercel** (`https://root-claim-gamma.vercel.app`)

### Backend (Server-Side)
* **FastAPI** + **Uvicorn**
* **Groq Cloud API** (Bypassed 512MB RAM limit by stripping heavy PyTorch dependencies and offloading to Groq LPUs).
* Hosted on **Render** (`https://root-claim.onrender.com`)
* **Cron-job.org** daemon (Pings `/health` every 5 minutes to prevent cold-start hibernation).

---

## 📂 Project Structure

```bash
📦 Root-Claim
 ┣ 📂 backend                 # FastAPI Server
 ┃ ┣ 📂 services              # AI & Vector logic (Groq API, Supabase)
 ┃ ┣ 📜 main.py               # REST Endpoints
 ┃ ┣ 📜 seed_tkdl.py          # Script to populate mock Indian TKDL data
 ┃ ┗ 📜 requirements.txt      # Python dependencies
 ┣ 📂 frontend                # Next.js Application
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 app                 # Next.js App Router Pages
 ┃ ┃ ┃ ┣ 📂 admin-dashboard   # Ministry UI
 ┃ ┃ ┃ ┣ 📂 citizen-dashboard # Citizen UI
 ┃ ┃ ┃ ┗ 📂 login             # Auth Portal
 ┃ ┃ ┣ 📂 components          # Aceternity & Custom UI Components
 ┃ ┃ ┗ 📂 utils               # Supabase Client configs
 ┃ ┣ 📜 tailwind.config.ts    # Styling Configuration
 ┃ ┗ 📜 package.json          # Node dependencies
 ┗ 📜 Root_Claim_SIH26045_Technical_Documentation.pdf # Official SRS Document
```

---

## 👨‍💻 Credits & Team

Built with ❤️ for **Smart India Hackathon (SIH) 2026**.
Dedicated to the **Ministry of Ayush** and the protection of India's ancient heritage.

*Designed and developed by the Root-Claim Team.*

<div align="center">
  <br/>
  <i>"Democratizing Innovation. Securing Tradition."</i>
</div>
