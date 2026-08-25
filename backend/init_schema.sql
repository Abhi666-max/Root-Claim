-- Supabase Initial Schema for Root-Claim (Hackathon Edition)

-- 1. Enable the vector extension for AI Similarity Search (RAG & Collision Radar)
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Users Table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('Citizen', 'Ministry_Admin')) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Claims Table (Citizen's Digital Vault)
CREATE TABLE IF NOT EXISTS public.claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id),
  title TEXT NOT NULL,
  raw_description TEXT, -- What citizen typed (Hinglish/Vernacular)
  ai_formatted_claim TEXT, -- What Groq formatted
  status TEXT CHECK (status IN ('Drafted', 'Pending Review', 'Verified', 'Rejected', 'Blockchain Anchored')) DEFAULT 'Drafted',
  collision_score FLOAT, -- Risk % from AI Radar
  polygon_tx_hash TEXT, -- Immutable proof
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Patents Database (For Collision Radar)
CREATE TABLE IF NOT EXISTS public.patents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patent_number TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  abstract TEXT NOT NULL,
  embedding vector(384) -- Using sentence-transformers all-MiniLM-L6-v2 (384 dims)
);

-- 5. IP Laws Database (For IP-SAKTI RAG Assistant)
CREATE TABLE IF NOT EXISTS public.ip_laws (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_title TEXT NOT NULL,
  legal_text TEXT NOT NULL,
  page_number INTEGER,
  embedding vector(384) -- Using sentence-transformers all-MiniLM-L6-v2 (384 dims)
);

-- Note: Ensure Row Level Security (RLS) is configured later based on authentication needs.
