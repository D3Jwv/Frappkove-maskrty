# Skript na deploy backendu na Heroku

Write-Host "=== Deploy Backend na Heroku ===" -ForegroundColor Cyan
Write-Host ""

# Kontrola Heroku CLI
if (-not (Get-Command heroku -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Heroku CLI nie je nainštalované!" -ForegroundColor Red
    Write-Host "Stiahnite z: https://devcenter.heroku.com/articles/heroku-cli" -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ Heroku CLI je nainštalované" -ForegroundColor Green
Write-Host ""

# Prechod do backend adresára
Set-Location "backend"

# Kontrola Git
if (-not (Test-Path ".git")) {
    Write-Host "Inicializujem Git repository..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit"
}

# Kontrola Heroku remote
$herokuRemote = git remote -v | Select-String "heroku"
if (-not $herokuRemote) {
    Write-Host ""
    Write-Host "Zadajte názov Heroku aplikácie (alebo stlačte Enter pre vytvorenie novej):" -ForegroundColor Cyan
    $appName = Read-Host
    if ($appName) {
        Write-Host "Pridávam Heroku remote: $appName" -ForegroundColor Yellow
        heroku git:remote -a $appName
    } else {
        Write-Host "Vytváram novú Heroku aplikáciu..." -ForegroundColor Yellow
        heroku create
    }
}

Write-Host ""
Write-Host "=== Nastavenie Environment Variables ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Dôležité: Pred deployom nastavte environment variables:" -ForegroundColor Yellow
Write-Host "  heroku config:set MONGODB_URI=..." -ForegroundColor White
Write-Host "  heroku config:set JWT_SECRET=..." -ForegroundColor White
Write-Host "  heroku config:set STRIPE_SECRET_KEY=..." -ForegroundColor White
Write-Host "  heroku config:set FRONTEND_URL=..." -ForegroundColor White
Write-Host ""

$continue = Read-Host "Chcete pokračovať s deployom? (Y/N)"
if ($continue -ne "Y" -and $continue -ne "y") {
    Write-Host "Deploy zrušený." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "Deployujem na Heroku..." -ForegroundColor Green
git push heroku main

Write-Host ""
Write-Host "=== Deploy dokončený ===" -ForegroundColor Green
Write-Host ""
Write-Host "Zobrazenie logov:" -ForegroundColor Cyan
Write-Host "  heroku logs --tail" -ForegroundColor White
Write-Host ""
Write-Host "Otvorenie aplikácie:" -ForegroundColor Cyan
Write-Host "  heroku open" -ForegroundColor White

