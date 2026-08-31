<div align="center">
  <img src="frontend/public/citizen_logo.jpg" alt="Root-Claim Logo" width="150" height="150"/>
  <h1>Root-Claim (IP-SAKTI Sahayak)</h1>
  <p><strong>Official Project Repository for Smart India Hackathon (SIH) 2026</strong></p>
  <p>Problem Statement ID: 26045 | Ministry of Ayush</p>
</div>

---

## 1. Executive Summary

**Root-Claim** is an enterprise-grade, Artificial Intelligence (AI) and Blockchain-integrated software ecosystem engineered to democratize intellectual property (IP) protection for Indian Traditional Knowledge (TK). The platform functions as a dual-role interface, providing grassroots practitioners with multilingual, legally accurate guidance via a Retrieval-Augmented Generation (RAG) architecture, while simultaneously equipping regulatory bodies with automated global surveillance tools to detect and challenge instances of international bio-piracy.

## 2. Problem Statement Context

The commercialization and protection of Ayurvedic therapeutics derived from complex plant, microbial, and animal sources demand navigation through overlapping legal regimes: patents, geographical indications (GI), trademarks, copyright, designs, trade secrets, and plant-variety rights. Furthermore, compliance with the Access-and-Benefit-Sharing (ABS) duties flowing from India’s sovereignty over its biological resources is mandatory.

The complexity of the drug-regulatory framework and international treaties (e.g., Nagoya Protocol, WIPO frameworks) severely disadvantages local practitioners, startups, and MSMEs. Consequently, legitimate Ayurvedic innovation remains severely under-protected within India, while simultaneously remaining highly vulnerable to misappropriation and unauthorized patenting by foreign entities.

Root-Claim addresses this systemic vulnerability by automating legal literacy, streamlining patent formulation, and proactively monitoring global patent registries.

## 3. Core Modules and Technical Implementation

### 3.1 IP-SAKTI Sahayak (Dual-Jurisdiction RAG Agent)
A sophisticated conversational agent designed to provide strictly cited guidance on IP laws without hallucination.
*   **Architecture:** Implements a localized RAG pipeline. User queries are embedded and cross-referenced against a verified database of Indian and International statutes.
*   **Jurisdictional Isolation:** The system utilizes conditional prompt engineering to separate legal contexts.
    *   *National Mode:* Confines analysis exclusively to the Indian Patents Act 1970 (Section 3(p)) and the Biological Diversity Act 2002.
    *   *International Mode:* Analyzes queries strictly through the frameworks of the Patent Cooperation Treaty (PCT), European Patent Office (EPO), and the Nagoya Protocol, preventing domestic legal interference in global strategy.

### 3.2 Smart Draft formulation Engine
An automated natural language processing (NLP) pipeline that translates conversational, vernacular descriptions of traditional remedies into formal, legally structured patent claims.
*   **Implementation:** The engine intercepts unstructured text and utilizes a constrained Large Language Model (LLM) to identify botanical entities, standardize terminology, and generate a formalized document comprising: Title, Abstract, Taxonomic Botanical Ingredients, Method of Preparation, and specific Traditional Claims.

### 3.3 Deep Patent Collision Radar
An automated surveillance module serving as an anti-bio-piracy defense mechanism.
*   **Implementation:** The system simulates the ingestion of newly published international patent applications. It executes semantic cross-referencing against the verified Indian Traditional Knowledge Digital Library (TKDL) database. Algorithmic scoring identifies high-risk taxonomic overlaps, flagging potential bio-piracy attempts for immediate regulatory intervention.

### 3.4 Historical Manuscript Digitization (OCR)
A computer vision module for the preservation and integration of decaying historical manuscripts.
*   **Implementation:** Utilizes multi-modal Vision-Language Models (VLMs) to execute Optical Character Recognition (OCR) on user-uploaded images of ancient texts, translating complex scripts into structured, searchable digital data.

### 3.5 Immutable Proof-of-Origin (Blockchain Timestamping)
A cryptographic verification system to establish incontrovertible Prior Art.
*   **Implementation:** Upon finalization of a formulated claim, the system generates a SHA-256 cryptographic hash of the JSON payload. This digital fingerprint is simulated onto a decentralized ledger (Polygon), yielding a verifiable Block Number and Transaction Hash to legally establish temporal possession of the knowledge.

## 4. System Architecture and Technology Stack

The platform utilizes a highly optimized decoupled architecture to ensure low latency and continuous availability.

### 4.1 Client-Side (Frontend)
*   **Framework:** Next.js 14 (App Router methodology).
*   **Language:** TypeScript (Strict mode).
*   **Interface:** Tailwind CSS.
*   **Deployment:** Edge-network distributed hosting (Vercel).

### 4.2 Server-Side (Backend)
*   **Framework:** FastAPI (Python 3.11+) operating via Uvicorn ASGI.
*   **AI Inference:** Externalized to Groq Cloud APIs (LPU architecture) to minimize local memory overhead and maximize inference throughput.
    *   *LLM:* `qwen/qwen3.8-27b`
    *   *VLM:* `llama-3.2-90b-vision-preview`
*   **Deployment:** Asynchronous web service (Render).

### 4.3 Database and Authentication
*   **Platform:** Supabase (PostgreSQL).
*   **Authentication:** Dual-role JSON Web Token (JWT) infrastructure with strict Role-Based Access Control (RBAC).

## 5. Repository Structure

```text
Root-Claim/
├── backend/                        # FastAPI Server Implementation
│   ├── services/                   # Core business logic and external API integrations
│   │   ├── ai_service.py           # LLM/VLM prompt engineering and parsing logic
│   │   └── vector_service.py       # Supabase search algorithms and RAG payload formatting
│   ├── main.py                     # API routing and endpoint definitions
│   ├── seed_tkdl.py                # Database population script for simulated TKDL data
│   └── requirements.txt            # Python dependency specification
├── frontend/                       # Next.js Client Application
│   ├── public/                     # Static assets (Logos, Icons)
│   ├── src/
│   │   ├── app/                    # Routing layer
│   │   │   ├── admin-dashboard/    # Ministry of Ayush restricted interface
│   │   │   ├── citizen-dashboard/  # Public practitioner interface
│   │   │   └── globals.css         # Global stylesheet configurations
│   │   ├── components/             # Reusable UI components
│   │   └── utils/                  # Supabase client instantiation and middleware
│   ├── tailwind.config.ts          # UI framework configuration
│   └── package.json                # Node.js dependency specification
└── Root_Claim_SIH26045_Technical_Documentation.pdf # Detailed Software Requirements Specification
```

## 6. Local Development and Configuration Guidelines

To deploy this ecosystem in a local environment, follow the steps below.

### 6.1 Prerequisites
*   Node.js (v18.x or higher)
*   Python (3.11.x or higher)
*   Git

### 6.2 Backend Configuration
1. Navigate to the backend directory: `cd backend`
2. Instantiate a virtual environment: `python -m venv venv`
3. Activate the virtual environment:
    * Windows: `venv\Scripts\activate`
    * Unix/MacOS: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Create a `.env` file in the `backend/` directory and supply the required API keys (Groq, Supabase).
6. Initialize the server: `uvicorn main:app --reload --port 8000`

### 6.3 Frontend Configuration
1. Navigate to the frontend directory: `cd frontend`
2. Install package dependencies: `npm install`
3. Create a `.env.local` file in the `frontend/` directory and supply the Supabase Project URL and Anon Key.
4. Initialize the development server: `npm run dev`
5. Access the application via `http://localhost:3000`

## 7. Security Architecture

*   **API Integrity:** Enforced Cross-Origin Resource Sharing (CORS) policies restrict backend access exclusively to the verified frontend domain, neutralizing CSRF vectors.
*   **Environmental Variables:** Cryptographic keys and database credentials are strictly isolated from the client-side bundle.
*   **Data Isolation:** Strict row-level security (RLS) policies within PostgreSQL ensure data segregation between citizen users and administrative personnel.

## 8. Acknowledgements

This software architecture was developed in direct response to Problem Statement ID 26045 for the Smart India Hackathon (SIH) 2026. The conceptual framework is dedicated to the Ministry of Ayush and the ongoing effort to secure India's traditional knowledge repositories.
