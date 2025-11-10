# Skript na deploy frontendu na Vercel

Write-Host "=== Deploy Frontend na Vercel ===" -ForegroundColor Cyan
Write-Host ""

# Kontrola Vercel CLI
if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Vercel CLI nie je nainštalované!" -ForegroundColor Red
    Write-Host "Inštalujem Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

Write-Host "✓ Vercel CLI je nainštalované" -ForegroundColor Green
Write-Host ""

# Prechod do frontend adresára
Set-Location "frontend"

Write-Host "=== Kontrola Environment Variables ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Dôležité: Pred deployom nastavte environment variables:" -ForegroundColor Yellow
Write-Host "  VITE_API_URL=https://vas-backend-url.com/api" -ForegroundColor White
Write-Host "  VITE_STRIPE_PUBLISHABLE_KEY=pk_live_..." -ForegroundColor White
Write-Host ""
Write-Host "Môžete ich nastaviť:" -ForegroundColor Cyan
Write-Host "  1. V Vercel Dashboard (Settings → Environment Variables)" -ForegroundColor White
Write-Host "  2. Alebo cez Vercel CLI pri deployi" -ForegroundColor White
Write-Host ""

$continue = Read-Host "Chcete pokračovať s deployom? (Y/N)"
if ($continue -ne "Y" -and $continue -ne "y") {
    Write-Host "Deploy zrušený." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "Deployujem na Vercel..." -ForegroundColor Green
vercel --prod

Write-Host ""
Write-Host "=== Deploy dokončený ===" -ForegroundColor Green
Write-Host ""
Write-Host "Váš frontend by mal byť dostupný na URL zobrazenej vyššie." -ForegroundColor Cyan

