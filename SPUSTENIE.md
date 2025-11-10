# Inštrukcie na spustenie E-shop projektu

## Predpoklady

1. **Node.js** (verzia 14 alebo vyššia) - [Stiahnuť](https://nodejs.org/)
2. **MongoDB** - [Stiahnuť](https://www.mongodb.com/try/download/community) alebo použiť MongoDB Atlas (cloud)

## ⚠️ Dôležité: Nastavenie PATH a Execution Policy

### Problém s PATH:
Ak `npm` nie je rozpoznaný v termináli, musíte pridať Node.js do PATH. 

**Pozrite si:** `NASTAVENIE-PATH.md` pre podrobné inštrukcie.

### Problém s Execution Policy:
Ak vidíte chybu: "npm.ps1 cannot be loaded because running scripts is disabled"

**Rýchle riešenie:**
- Spustite PowerShell ako **Administrator**
- Spustite: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
- Alebo použite opravené skripty: `spustit-backend-fix.ps1` a `spustit-frontend-fix.ps1`

**Pozrite si:** `OPRAVA-POWERSHELL.md` pre podrobné inštrukcie.

## Krok 1: Inštalácia závislostí

### Backend

```bash
cd eshop/backend
npm install
```

### Frontend

```bash
cd eshop/frontend
npm install
```

## Krok 2: Konfigurácia Backendu

1. Vytvorte súbor `.env` v priečinku `eshop/backend/`:

```bash
cd eshop/backend
copy .env.example .env
```

Alebo manuálne vytvorte súbor `.env` s týmto obsahom:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/eshop
JWT_SECRET=moj-tajny-kluc-zmenit-v-produkcii
NODE_ENV=development
```

**Poznámka:** 
- Ak používate MongoDB Atlas (cloud), zmeňte `MONGODB_URI` na vašu connection string
- `JWT_SECRET` by mal byť náhodný bezpečný reťazec

## Krok 3: Spustenie MongoDB

**📖 Pozrite si podrobné inštrukcie v:** `MONGODB-SETUP.md`

### Rýchly prehľad:

**MongoDB Atlas (Odporúčané - Cloud):**
- ✅ Najjednoduchšie - žiadna inštalácia
- ✅ Zadarmo tier (512 MB)
- ✅ Dostupné z ktoréhokoľvek zariadenia
- Postup: https://www.mongodb.com/cloud/atlas/register
- Získajte connection string a pridajte do `.env`

**Lokálne MongoDB:**
- Stiahnite MongoDB Community Server 7.0 alebo 6.0
- Nainštalujte (beží ako Windows služba automaticky)
- `.env` už má správne nastavenie: `mongodb://localhost:27017/eshop`

**Firebase:**
- Vyžaduje prepísanie backendu
- Ak chcete, môžem to prepísať

## Krok 4: Spustenie aplikácie

### Možnosť A: Použitie pomocných skriptov (Odporúčané)

**Terminal 1 - Backend:**
```powershell
cd eshop
.\spustit-backend.ps1
```

**Terminal 2 - Frontend:**
```powershell
cd eshop
.\spustit-frontend.ps1
```

### Možnosť B: Manuálne spustenie

**Terminal 1 - Backend:**
```powershell
cd eshop\backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd eshop\frontend
npm install
npm run dev
```

Backend beží na: `http://localhost:5000`  
Frontend beží na: `http://localhost:3000`

## Overenie, že všetko funguje

1. Otvorte prehliadač a choďte na `http://localhost:3000`
2. Mala by sa zobraziť homepage e-shopu
3. Backend API je dostupné na `http://localhost:5000/api/health`

## Riešenie problémov

### MongoDB connection error:
- Uistite sa, že MongoDB beží
- Skontrolujte `MONGODB_URI` v `.env` súbore
- Pre MongoDB Atlas: skontrolujte, že máte správne IP adresy whitelisted

### Port už používaný:
- Zmeňte `PORT` v `.env` súbore (backend)
- Alebo zmeňte port vo `vite.config.js` (frontend)

### Module not found errors:
- Spustite `npm install` znova v príslušnom priečinku
- Skontrolujte, či ste v správnom priečinku

## Prvé kroky po spustení

1. **Registrácia užívateľa:**
   - Choďte na `/register` a vytvorte účet

2. **Pridanie produktov (admin):**
   - Pre pridanie produktov potrebujete admin účet
   - V databáze nastavte `role: 'admin'` pre váš užívateľský účet

3. **Testovanie:**
   - Prezrite si produkty
   - Pridajte produkty do košíka
   - Vytvorte objednávku

