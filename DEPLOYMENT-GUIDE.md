# 🚀 Produkčné nasadenie - Kompletný návod

Tento dokument obsahuje krok-za-krokom inštrukcie pre nasadenie e-shopu do produkcie.

---

## 📋 Prehľad krokov

1. ✅ **MongoDB Atlas** - Nastavenie cloud databázy (🇪🇺 **Odporúčané: Europe region**)
2. ✅ **Stripe Live Keys** - Prepnutie na produkčné kľúče
3. ✅ **Backend Deployment** - Railway / Render / DigitalOcean (🇪🇺 **Evropské servery**)
4. ✅ **Frontend Deployment** - Vercel / Netlify (🇪🇺 **Evropské edge servery**)
5. ✅ **Webhook Setup** - Stripe webhook konfigurácia
6. ✅ **Overenie** - Testovanie produkčného prostredia

---

## 🇪🇺 Pre slovenských zákazníkov - Evropské servery

**Pre lepší výkon a nižšiu latenciu pre slovenských zákazníkov odporúčame:**

### Backend (Evropské servery):
- ⭐ **Railway** - Automaticky vyberá najbližší region (Európa)
- ⭐ **Render** - Vyberte **Europe (Frankfurt)** region
- **DigitalOcean** - Amsterdam datacenter
- **AWS** - EU regiony (Frankfurt, Ireland, Paris)

### Frontend:
- ⭐ **Vercel** - Automaticky používa evropské edge servery
- **Netlify** - Automaticky používa evropské edge servery

### MongoDB Atlas:
- ⭐ **Odporúčané:** Vyberte **Europe - Frankfurt** alebo **Europe - Ireland**

---

## 1️⃣ MongoDB Atlas Setup

### Krok 1: Vytvorenie účtu
1. Choďte na: **https://www.mongodb.com/cloud/atlas/register**
2. Vytvorte bezplatný účet
3. Vyberte **FREE tier (M0)** - 512 MB, zadarmo

### Krok 2: Vytvorenie clusteru
1. Po prihlásení kliknite **"Build a Database"**
2. Vyberte **FREE (M0)** tier
3. **🇪🇺 Pre Slovensko:** Vyberte **Europe - Frankfurt** alebo **Europe - Ireland** (najbližšie regiony)
4. Dajte clusteru názov (napr. `eshop-cluster`)
5. Kliknite **"Create"**

**Prečo Europe region?**
- ✅ Nižšia latencia pre slovenských zákazníkov
- ✅ Rýchlejšie načítavanie stránok
- ✅ Lepšia rýchlosť API volaní

### Krok 3: Database Access (Užívateľ)
1. Choďte do **"Database Access"** (v ľavom menu)
2. Kliknite **"Add New Database User"**
3. Vyberte **"Password"** autentifikáciu
4. Zadajte **username** a **password** (uložte si ich!)
5. V **"Database User Privileges"** vyberte **"Atlas admin"**
6. Kliknite **"Add User"**

### Krok 4: Network Access (IP Whitelist)
1. Choďte do **"Network Access"** (v ľavom menu)
2. Kliknite **"Add IP Address"**
3. Pre produkciu:
   - **Odporúčané:** Pridajte IP adresy vašich serverov (Heroku, Railway, atď.)
   - **Pre vývoj:** Kliknite **"Allow Access from Anywhere"** (`0.0.0.0/0`)
4. Kliknite **"Confirm"**

### Krok 5: Získanie Connection String
1. Choďte do **"Database"** (v ľavom menu)
2. Kliknite **"Connect"** na vašom clusteri
3. Vyberte **"Connect your application"**
4. Skopírujte **connection string**
5. **Nahraďte:**
   - `<password>` → vašim heslom
   - `<dbname>` → `eshop` (alebo iný názov databázy)

**Príklad:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/eshop?retryWrites=true&w=majority
```

---

## 2️⃣ Stripe Live Keys

### Krok 1: Prepnutie na Live Mode
1. Choďte na: **https://dashboard.stripe.com**
2. V pravom hornom rohu prepnite z **"Test mode"** na **"Live mode"**
3. Potvrďte prepnutie

### Krok 2: Získanie Live Keys
1. Choďte do **"Developers" → "API keys"**
2. Skopírujte **Live Publishable key** (`pk_live_...`)
3. Skopírujte **Live Secret key** (`sk_live_...`)

### Krok 3: Webhook Secret (pre produkciu)
1. Choďte do **"Developers" → "Webhooks"**
2. Kliknite **"Add endpoint"**
3. Zadajte URL: `https://vas-backend-url.com/api/payments/webhook`
4. Vyberte eventy:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Kliknite **"Add endpoint"**
6. Skopírujte **Signing secret** (`whsec_...`)

---

## 3️⃣ Backend Deployment

### Možnosť A: Heroku

#### Krok 1: Inštalácia Heroku CLI
1. Stiahnite z: **https://devcenter.heroku.com/articles/heroku-cli**
2. Nainštalujte a prihláste sa:
   ```bash
   heroku login
   ```

#### Krok 2: Vytvorenie aplikácie
```bash
cd eshop/backend
heroku create vas-eshop-backend
```

#### Krok 3: Nastavenie Environment Variables
```bash
# MongoDB Atlas
heroku config:set MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/eshop?retryWrites=true&w=majority"

# JWT Secret (vygenerujte silný náhodný kľúč)
heroku config:set JWT_SECRET="vas-very-strong-secret-key-min-32-characters"

# Node Environment
heroku config:set NODE_ENV="production"

# Frontend URL (pre CORS)
heroku config:set FRONTEND_URL="https://vas-frontend.vercel.app"
heroku config:set CORS_ORIGIN="https://vas-frontend.vercel.app"

# Stripe Live Keys
heroku config:set STRIPE_SECRET_KEY="sk_live_..."
heroku config:set STRIPE_WEBHOOK_SECRET="whsec_..."

# Email (voliteľné - ak používate)
heroku config:set EMAIL_SERVICE="sendgrid"
heroku config:set SMTP_HOST="smtp.sendgrid.net"
heroku config:set SMTP_PORT="587"
heroku config:set EMAIL_USER="apikey"
heroku config:set EMAIL_PASS="your-sendgrid-api-key"
heroku config:set EMAIL_FROM="noreply@vasadomena.sk"
```

#### Krok 4: Deploy
```bash
# Ak ešte nemáte Git repository
git init
git add .
git commit -m "Initial commit"

# Pridanie Heroku remote
heroku git:remote -a vas-eshop-backend

# Deploy
git push heroku main
```

#### Krok 5: Overenie
```bash
# Zobrazenie logov
heroku logs --tail

# Otvorenie aplikácie
heroku open

# Test health endpoint
curl https://vas-eshop-backend.herokuapp.com/api/health
```

---

### Možnosť B: Railway ⭐ **ODORÚČANÉ PRE SLOVENSKO**

**Výhody:**
- ✅ Automaticky vyberá najbližší region (Európa)
- ✅ Veľmi jednoduché nasadenie
- ✅ Automatický deploy z GitHubu
- ✅ Zdarma tier dostupný

#### Krok 1: Vytvorenie účtu
1. Choďte na: **https://railway.app**
2. Prihláste sa cez GitHub

#### Krok 2: Vytvorenie projektu
1. Kliknite **"New Project"**
2. Vyberte **"Deploy from GitHub repo"**
3. Vyberte váš repository
4. Vyberte **"eshop/backend"** ako root directory

#### Krok 3: Nastavenie Environment Variables
1. Choďte do **"Variables"** tab
2. Pridajte všetky environment variables (rovnako ako pre Heroku)

#### Krok 4: Region (voliteľné)
- Railway automaticky vyberá najbližší region
- Pre manuálny výber: **Settings → Region → Europe**

#### Krok 5: Deploy
- Railway automaticky deployne po pushnutí do GitHubu
- Alebo kliknite **"Deploy"** manuálne

---

### Možnosť C: Render ⭐ **ODORÚČANÉ PRE SLOVENSKO**

**Výhody:**
- ✅ Môžete vybrať **Europe (Frankfurt)** region
- ✅ Zdarma tier dostupný
- ✅ Automatický deploy z GitHubu

#### Krok 1: Vytvorenie účtu
1. Choďte na: **https://render.com**
2. Prihláste sa cez GitHub

#### Krok 2: Vytvorenie Web Service
1. Kliknite **"New" → "Web Service"**
2. Pripojte váš GitHub repository
3. Nastavte:
   - **Name:** `eshop-backend`
   - **Root Directory:** `eshop/backend`
   - **Region:** ⭐ **Europe (Frankfurt)** - dôležité pre Slovensko!
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

#### Krok 3: Environment Variables
- Pridajte všetky environment variables v **"Environment"** sekcii

#### Krok 4: Deploy
- Render automaticky deployne po pushnutí

---

## 4️⃣ Frontend Deployment

### Možnosť A: Vercel ⭐ **ODORÚČANÉ PRE SLOVENSKO**

**Výhody:**
- ✅ Automaticky používa evropské edge servery
- ✅ Veľmi rýchle načítavanie pre slovenských zákazníkov
- ✅ Automatický deploy z GitHubu
- ✅ Zdarma tier s veľkorysými limity

#### Krok 1: Inštalácia Vercel CLI
```bash
npm install -g vercel
```

#### Krok 2: Prihlásenie
```bash
vercel login
```

#### Krok 3: Deploy
```bash
cd eshop/frontend
vercel --prod
```

**Alebo cez web:**

1. Choďte na: **https://vercel.com**
2. Kliknite **"Add New Project"**
3. Importujte váš GitHub repository
4. Nastavte:
   - **Framework Preset:** Vite
   - **Root Directory:** `eshop/frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Region:** Automaticky vyberie najbližší (Európa)

#### Krok 4: Environment Variables
V **"Settings" → "Environment Variables"** pridajte:

```
VITE_API_URL=https://vas-backend-url.railway.app/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

#### Krok 5: Deploy
- Kliknite **"Deploy"**
- Vercel automaticky deployne a poskytne URL
- Frontend bude dostupný z evropských edge serverov

---

### Možnosť B: Netlify

#### Krok 1: Vytvorenie účtu
1. Choďte na: **https://netlify.com**
2. Prihláste sa cez GitHub

#### Krok 2: Vytvorenie site
1. Kliknite **"Add new site" → "Import an existing project"**
2. Vyberte váš GitHub repository
3. Nastavte:
   - **Base directory:** `eshop/frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

#### Krok 3: Environment Variables
V **"Site settings" → "Environment variables"** pridajte:
```
VITE_API_URL=https://vas-backend-url.herokuapp.com/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

#### Krok 4: Deploy
- Netlify automaticky deployne po pushnutí

---

## 5️⃣ Stripe Webhook Setup

### Krok 1: Vytvorenie Webhook Endpointu
1. Choďte do Stripe Dashboard → **"Developers" → "Webhooks"**
2. Kliknite **"Add endpoint"**
3. Zadajte URL: `https://vas-backend-url.com/api/payments/webhook`
4. Vyberte eventy:
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`
5. Kliknite **"Add endpoint"**

### Krok 2: Získanie Webhook Secret
1. Kliknite na vytvorený webhook
2. Skopírujte **"Signing secret"** (`whsec_...`)
3. Pridajte do backend environment variables:
   ```bash
   heroku config:set STRIPE_WEBHOOK_SECRET="whsec_..."
   ```

### Krok 3: Testovanie Webhooku
1. V Stripe Dashboard kliknite na webhook
2. Kliknite **"Send test webhook"**
3. Skontrolujte backend logy, či sa webhook prijal

---

## 6️⃣ Overenie a testovanie

### Backend
```bash
# Health check
curl https://vas-backend-url.com/api/health

# Mala by sa vrátiť:
# {"status":"OK","message":"Backend beží"}
```

### Frontend
1. Otvorte: `https://vas-frontend-url.com`
2. Skontrolujte, či sa stránka načíta
3. Skontrolujte konzolu prehliadača (F12) - nemali by byť chyby
4. Skúste prihlásenie a registráciu
5. Skúste vytvoriť objednávku s testovacou kartou

### Stripe
1. Choďte do Stripe Dashboard → **"Payments"**
2. Mala by sa zobraziť testovacia platba
3. Skontrolujte, či sa platba správne spracovala

---

## 7️⃣ Bezpečnostné opatrenia

### ✅ Čo je už implementované:
- JWT autentifikácia
- Hashovanie hesiel (bcrypt)
- CORS konfigurácia
- Environment variables

### ⚠️ Odporúčané doplnky:

#### 1. Helmet.js (HTTP Security Headers)
```bash
cd eshop/backend
npm install helmet
```

Pridajte do `backend/src/index.js`:
```javascript
const helmet = require('helmet');
app.use(helmet());
```

#### 2. Rate Limiting
```bash
npm install express-rate-limit
```

Pridajte do `backend/src/index.js`:
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minút
  max: 100 // limit 100 requestov
});

app.use('/api/', limiter);
```

---

## 8️⃣ Environment Variables - Kompletný zoznam

### Backend (.env alebo platform config)

```env
# Server
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/eshop?retryWrites=true&w=majority

# JWT
JWT_SECRET=vas-very-strong-secret-key-min-32-characters

# CORS
FRONTEND_URL=https://vas-frontend.vercel.app
CORS_ORIGIN=https://vas-frontend.vercel.app

# Stripe (LIVE)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email (voliteľné)
EMAIL_SERVICE=sendgrid
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
EMAIL_FROM=noreply@vasadomena.sk
```

### Frontend (Vercel/Netlify Environment Variables)

```
VITE_API_URL=https://vas-backend-url.herokuapp.com/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

---

## 9️⃣ Checklist pred nasadením

- [ ] MongoDB Atlas cluster vytvorený a testovaný
- [ ] Database user vytvorený s oprávneniami
- [ ] Network Access nastavené (IP whitelist)
- [ ] Stripe Live keys získané
- [ ] Stripe webhook endpoint vytvorený
- [ ] Backend environment variables nastavené
- [ ] Frontend environment variables nastavené
- [ ] Backend úspešne deploynutý
- [ ] Frontend úspešne deploynutý
- [ ] Health check endpoint funguje
- [ ] CORS správne nakonfigurované
- [ ] Testovacia platba funguje
- [ ] Webhook funguje (skontrolované v Stripe Dashboard)

---

## 🔟 Riešenie problémov

### Backend nebeží
```bash
# Heroku
heroku logs --tail

# Railway
# Skontrolujte logs v Railway dashboard

# Render
# Skontrolujte logs v Render dashboard
```

**Časté problémy:**
- MongoDB connection string je nesprávny
- Chýbajú environment variables
- Port nie je správne nastavený

### Frontend nevidí backend
- Skontrolujte `VITE_API_URL` environment variable
- Skontrolujte CORS nastavenie v backendu
- Skontrolujte, či backend URL je správny

### Stripe nefunguje
- Skontrolujte, či používate **Live** kľúče (nie test)
- Skontrolujte webhook secret
- Skontrolujte Stripe Dashboard pre chyby

### MongoDB connection error
- Skontrolujte Network Access v MongoDB Atlas
- Overte connection string
- Skontrolujte username a password

---

## 📚 Užitočné odkazy

- **Heroku:** https://devcenter.heroku.com
- **Railway:** https://docs.railway.app
- **Render:** https://render.com/docs
- **Vercel:** https://vercel.com/docs
- **Netlify:** https://docs.netlify.com
- **MongoDB Atlas:** https://docs.atlas.mongodb.com
- **Stripe:** https://stripe.com/docs

---

## 🎉 Hotovo!

Váš e-shop by teraz mal bežať v produkcii! 🚀

**Backend URL:** `https://vas-backend-url.com`  
**Frontend URL:** `https://vas-frontend-url.com`

---

## 💡 Tipy

1. **Vždy testujte v testovacom režime pred prepnutím na Live**
2. **Používajte silné heslá pre JWT_SECRET**
3. **Pravidelne kontrolujte logy**
4. **Nastavte monitoring a alerting**
5. **Pravidelne zálohujte databázu**

