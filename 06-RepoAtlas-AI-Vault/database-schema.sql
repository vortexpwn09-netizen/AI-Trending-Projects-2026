-- Database Schema - RepoAtlas AI Vault
-- Postgres (Neon/Supabase) - hidden env via .env.development
-- Run: psql $DATABASE_URL -f database-schema.sql

CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  clerk_id TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE vaults (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  repo_url TEXT NOT NULL,
  repo_name TEXT NOT NULL,
  branch TEXT DEFAULT 'main',
  status TEXT DEFAULT 'pending', -- pending, cloning, parsing, generating, ready, failed
  stack JSONB, -- {frontend: [], backend: [], db: [], infra: []}
  file_count INT DEFAULT 0,
  vault_path TEXT, -- /tmp/vault_{id}.zip
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_vaults_user ON vaults(user_id);
CREATE INDEX idx_vaults_status ON vaults(status);

CREATE TABLE files (
  id TEXT PRIMARY KEY,
  vault_id TEXT REFERENCES vaults(id) ON DELETE CASCADE,
  path TEXT NOT NULL,
  language TEXT,
  functions JSONB, -- [{name, line, type}]
  routes JSONB,    -- [{method, path, line}]
  models JSONB,    -- [{table, fields}]
  imports TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_files_vault ON files(vault_id);
CREATE INDEX idx_files_language ON files(language);

CREATE TABLE embeddings (
  id TEXT PRIMARY KEY,
  vault_id TEXT REFERENCES vaults(id) ON DELETE CASCADE,
  file_id TEXT REFERENCES files(id) ON DELETE CASCADE,
  chunk_index INT,
  vector_id TEXT, -- Qdrant point id
  text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_embeddings_vault ON embeddings(vault_id);

CREATE TABLE chats (
  id TEXT PRIMARY KEY,
  vault_id TEXT REFERENCES vaults(id) ON DELETE CASCADE,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT,
  sources JSONB, -- [{path, line, score}]
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_chats_vault ON chats(vault_id);

CREATE TABLE daily_notes (
  id TEXT PRIMARY KEY,
  vault_id TEXT REFERENCES vaults(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  content_md TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(vault_id, date)
);

-- Note: Vectors stored in Qdrant collection repo_{vault_id}, not Postgres
-- Use parameterized queries only - SQL injection protection ON in prod
