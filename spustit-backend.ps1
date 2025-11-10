# Skript na spustenie backendu

Write-Host "Spúšťam backend..." -ForegroundColor Cyan

# Pridanie Node.js do PATH pre tento terminál (ak nie je v PATH)
$nodePath = "C:\Program Files\nodejs"
if ($env:Path -notlike "*$nodePath*") {
    $env:Path += ";$nodePath"
}

# Prechod do backend adresára
Set-Location "backend"

# Kontrola, či existuje node_modules
if (-not (Test-Path "node_modules")) {
    Write-Host "Inštalujem závislosti..." -ForegroundColor Yellow
    & "$nodePath\npm.cmd" install
}

# Kontrola .env súboru
if (-not (Test-Path ".env")) {
    Write-Host "Vytváram .env súbor..." -ForegroundColor Yellow
    @"
PORT=5000
MONGODB_URI=mongodb://localhost:27017/eshop
JWT_SECRET=moj-tajny-kluc-zmenit-v-produkcii
NODE_ENV=development
"@ | Out-File -FilePath ".env" -Encoding utf8
}

Write-Host "Spúšťam backend server..." -ForegroundColor Green
& "$nodePath\npm.cmd" run dev

