# Push to GitHub Helper - Run after gh auth login
# Usage: PowerShell -ExecutionPolicy Bypass -File PUSH_TO_GITHUB.ps1

Write-Host "=== GitHub Push Helper ===" -ForegroundColor Cyan
Write-Host "Local repo: C:\Users\Pc\AI-Trending-Projects-2026 (branch main, commit 2db4e51)" -ForegroundColor Yellow
Write-Host "Detected GitHub user: vortexpwn09-netizen (from remotes)" -ForegroundColor Yellow
Write-Host "Repo name: AI-Trending-Projects-2026" -ForegroundColor Yellow

# Check gh auth
$auth = gh auth status 2>&1 | Out-String
if ($auth -match "not logged") {
  Write-Host "`n[X] Not logged in to GitHub CLI" -ForegroundColor Red
  Write-Host "Run: gh auth login" -ForegroundColor Yellow
  Write-Host "  -> Choose GitHub.com -> HTTPS -> Yes -> Paste token" -ForegroundColor Yellow
  Write-Host "Or set env: `$env:GH_TOKEN='your_token'" -ForegroundColor Yellow
  Write-Host "`nAfter login, run again: PowerShell -ExecutionPolicy Bypass -File PUSH_TO_GITHUB.ps1" -ForegroundColor Yellow
  Write-Host "`nManual alternative:" -ForegroundColor Cyan
  Write-Host "  gh repo create AI-Trending-Projects-2026 --public --source=. --remote=origin --push" -ForegroundColor Green
  Write-Host "  # OR create repo manually on github.com/new then:" -ForegroundColor Green
  Write-Host "  git remote add origin https://github.com/vortexpwn09-netizen/AI-Trending-Projects-2026.git" -ForegroundColor Green
  Write-Host "  git push -u origin main" -ForegroundColor Green
  exit
}

Write-Host "`n[OK] GitHub authenticated" -ForegroundColor Green
Set-Location -LiteralPath "C:\Users\Pc\AI-Trending-Projects-2026"
gh repo create AI-Trending-Projects-2026 --public --source=. --remote=origin --push
if ($LASTEXITCODE -eq 0) {
  Write-Host "`n[SUCCESS] Pushed to https://github.com/vortexpwn09-netizen/AI-Trending-Projects-2026" -ForegroundColor Green
} else {
  Write-Host "`n[INFO] Repo may already exist, trying push..." -ForegroundColor Yellow
  git remote add origin https://github.com/vortexpwn09-netizen/AI-Trending-Projects-2026.git 2>$null
  git push -u origin main
}
