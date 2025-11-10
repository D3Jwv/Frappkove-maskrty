# 🔧 Oprava Render - Root Directory chyba

## ❌ Chyba:
```
==> Service Root Directory "/opt/render/project/src/eshop/backend" is missing.
```

## ✅ Riešenie:

### Krok 1: Otvorte Render Dashboard
1. Choďte na: https://dashboard.render.com
2. Prihláste sa
3. Kliknite na váš **Web Service** (eshop-backend)

### Krok 2: Upravte Root Directory
1. Kliknite na **"Settings"** (v ľavom menu)
2. Nájdite sekciu **"Build & Deploy"**
3. Nájdite pole **"Root Directory"**
4. **Zmeňte z:**
   ```
   /opt/render/project/src/eshop/backend
   ```
   **Na:**
   ```
   eshop/backend
   ```
   **ALEBO:**
   ```
   backend
   ```
   (ak je váš repository už v `eshop/` priečinku)

### Krok 3: Uložte zmeny
1. Kliknite **"Save Changes"** alebo **"Update"**
2. Render automaticky začne nový deploy

---

## 🔍 Ako zistiť správnu cestu?

### Možnosť 1: Skontrolujte štruktúru na GitHube
1. Choďte na váš GitHub repository
2. Pozrite sa na štruktúru:
   - Ak vidíte: `eshop/backend/package.json` → Root Directory: `eshop/backend`
   - Ak vidíte: `backend/package.json` (priamo v root) → Root Directory: `backend`

### Možnosť 2: Skontrolujte lokálne
Váš projekt má štruktúru:
```
eshop/
  backend/
    package.json
    src/
      index.js
  frontend/
    package.json
```

Takže **Root Directory** by malo byť: `eshop/backend`

---

## 📝 Správne nastavenia pre Render

### Backend Web Service:
- **Name:** `eshop-backend`
- **Root Directory:** `eshop/backend` ⭐ (bez `/opt/render/project/src/`)
- **Environment:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Region:** `Europe (Frankfurt)` 🇪🇺

### Frontend Static Site (ak používate):
- **Name:** `eshop-frontend`
- **Root Directory:** `eshop/frontend`
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist`

---

## ⚠️ Dôležité poznámky

1. **Render automaticky pridáva prefix:**
   - Render automaticky pridá `/opt/render/project/src/` pred váš Root Directory
   - Takže ak zadáte `eshop/backend`, Render hľadá `/opt/render/project/src/eshop/backend`
   - **NEPRIDÁVAJTE** `/opt/render/project/src/` do Root Directory!

2. **Cesta musí existovať v repository:**
   - Root Directory musí ukazovať na priečinok, ktorý existuje v GitHube
   - V tomto priečinku musí byť `package.json`

3. **Po zmene Root Directory:**
   - Render automaticky začne nový build
   - Počkajte na dokončenie buildu

---

## ✅ Overenie

Po oprave by ste mali vidieť v Render logoch:
```
==> Cloning from https://github.com/vas-username/eshop
==> Checking out commit abc123...
==> Using root directory: eshop/backend
==> Installing dependencies...
==> Building...
==> Starting service...
```

**Ak vidíte "Using root directory: eshop/backend"** → je to správne! ✅

---

## 🚀 Alternatíva: Railway (jednoduchšie)

Ak máte problémy s Render, skúste **Railway**:
- Automaticky deteguje správny root directory
- Jednoduchšie nastavenie
- Automaticky vyberá najbližší region (Európa)

**Postup:**
1. Choďte na: https://railway.app
2. Kliknite **"New Project"**
3. Vyberte **"Deploy from GitHub repo"**
4. Vyberte repository
5. Railway automaticky nájde `package.json` a nastaví root directory

---

## ❓ Stále nefunguje?

### Skontrolujte:
1. ✅ Je `package.json` v `eshop/backend/`?
2. ✅ Je repository správne pripojený?
3. ✅ Je Root Directory nastavený bez `/opt/render/project/src/`?
4. ✅ Začal sa nový build po zmene?

### Ak stále nefunguje:
- Skúste **Railway** namiesto Render (jednoduchšie)
- Alebo kontaktujte Render support

---

**Po oprave by mal deploy fungovať!** 🎉

