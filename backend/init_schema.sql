-- Supabase Initial Schema for Root-Claim

-- Enable the vector extension for RAG search
CREATE EXTENSION IF NOT EXISTS vector;

-- Users Table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('Researcher', 'Admin', 'Legal')) NOT NULL
);

-- IP Documents Table (Vector Store)
CREATE TABLE IF NOT EXISTS public.ip_documents (
  doc_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  embedding vector(1536),
  metadata JSONB
);

-- Blockchain Vault Table
CREATE TABLE IF NOT EXISTS public.blockchain_vault (
  hash_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id),
  document_name TEXT NOT NULL,
  sha256_hash TEXT NOT NULL,
  polygon_tx_receipt TEXT,
  timestamp TIMESTAMPTZ DEFAULT now()
);

-- Note: Ensure Row Level Security (RLS) is configured later based on authentication needs.
