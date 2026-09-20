# Frontend Spec - RepoAtlas AI Vault

## Stack
Next.js 15 (App Router) + TypeScript + Tailwind + shadcn/ui + React Flow + Zustand + TanStack Query

## Pages
- `/` - Repo input: GitHub URL field, branch input, local folder drop, Generate button, progress SSE
- `/vault/[id]` - Vault detail: Tabs for Preview, Graph, Chat, Download
- `/dashboard` - My vaults list: cards with repo name, status, stack badges, graph thumbnail
- `/vault/[id]/chat` - Full screen Ask Repo

## Components
- `RepoInput.tsx` - Controlled input, validates GitHub URL regex, file drop handler for local folder
- `ProgressSSE.tsx` - EventSource to GET /api/vault/{id}/status, shows progress 0-100 and current file
- `VaultTree.tsx` - Recursive tree of vault markdown files, click to render markdown via react-markdown
- `GraphView.tsx` - React Flow: nodes from /api/vault/{id}/graph, edges for imports and DB relations, minimap and controls
- `ChatPanel.tsx` - Message list, input, streaming via fetch SSE, citation chips with file path
- `StackBadges.tsx` - Renders stack.json as badges (Next.js, FastAPI, Postgres)
- `DownloadButton.tsx` - Link to /api/vault/{id}/download, shows vault.zip size

## State
- Zustand `useVaultStore` - {vaultId, progress, graph, messages, isGenerating}
- TanStack Query `useQuery(['vaults'])` for dashboard

## Styling
- shadcn: Button, Card, Input, Badge, Progress, Dialog
- Tailwind: layout grid, responsive
- No emoji in code, use text labels

## API Calls
- POST /api/vault/create {github_url} -> {vault_id}
- GET /api/vault/{id}/status (SSE)
- GET /api/vault/{id}/graph
- POST /api/chat {vault_id, question} (SSE stream)
- GET /api/vault/{id}/download (blob)

## Build
- `npm run dev` - port 3000
- `npm run build` - production
- Env hidden via developer/.env.development, not committed

## Testing
- Playwright: input URL -> generate -> check graph nodes > 0 -> chat -> download
