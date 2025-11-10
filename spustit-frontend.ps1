# Skript na spustenie frontendu

Write-Host "Spúšťam frontend..." -ForegroundColor Cyan

# Pridanie Node.js do PATH pre tento terminál (ak nie je v PATH)
$nodePath = "C:\Program Files\nodejs"
if ($env:Path -notlike "*$nodePath*") {
    $env:Path += ";$nodePath"
}

# Prechod do frontend adresára
Set-Location "frontend"

# Kontrola, či existuje node_modules
if (-not (Test-Path "node_modules")) {
    Write-Host "Inštalujem závislosti..." -ForegroundColor Yellow
    & "$nodePath\npm.cmd" install
}

Write-Host "Spúšťam frontend server..." -ForegroundColor Green
& "$nodePath\npm.cmd" run dev

