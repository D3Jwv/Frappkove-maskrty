# 🔗 Prepojenie všetkých služieb

Kompletný návod na prepojenie Render backendu, Vercel frontendu, MongoDB Atlas a Stripe.

---

## 📋 Prehľad prepojení

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Vercel    │ ──────> │   Render    │ ──────> │ MongoDB     │
│  (Frontend) │  API    │  (Backend)  │  DB     │   Atlas     │
└─────────────┘         └─────────────┘         └─────────────┘
                              │
                              │ Webhook
                              ▼
                        ┌─────────────┐
                        │   Stripe    │
                        │  (Payments) │
                        └─────────────┘
```

---

## 1️⃣ Frontend (Vercel) → Backend (Render)

### Čo potrebujete:
- **Backend URL** z Render (napr. `https://eshop-backend.onrender.com`)

### Krok 1: Získajte Backend URL
1. Choďte na: https://dashboard.render.com
2. Kliknite na váš Web Service
3. Skopírujte **URL** (napr. `https://eshop-backend.onrender.com`)

### Krok 2: Nastavte v Vercel
1. Choďte na: https://vercel.com
2. Kliknite na váš projekt
3. Choďte do **"Settings" → "Environment Variables"**
4. Pridajte alebo upravte:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://vas-backend.onrender.com/api` ⚠️ (s `/api` na konci!)
   - **Environment:** Production (a Development ak chcete)
5. Kliknite **"Save"**
6. Vercel automaticky redeployne

**Príklad:**
```
VITE_API_URL=https://eshop-backend.onrender.com/api
```

---

## 2️⃣ Backend (Render) → Frontend (Vercel)

### Čo potrebujete:
- **Frontend URL** z Vercel (napr. `https://eshop-frontend.vercel.app`)

### Krok 1: Získajte Frontend URL
1. Choďte na: https://vercel.com
2. Kliknite na váš projekt
3. Skopírujte **URL** (napr. `https://eshop-frontend.vercel.app`)

### Krok 2: Nastavte v Render
1. Choďte na: https://dashboard.render.com
2. Kliknite na váš Web Service
3. Choďte do **"Environment"** sekcie
4. Pridajte alebo upravte:
   - **Key:** `FRONTEND_URL`
   - **Value:** `https://vas-frontend.vercel.app` (bez `/api`)
   - **Key:** `CORS_ORIGIN`
   - **Value:** `https://vas-frontend.vercel.app` (bez `/api`)
5. Kliknite **"Save Changes"**
6. Render automaticky reštartuje

**Príklad:**
```
FRONTEND_URL=https://eshop-frontend.vercel.app
CORS_ORIGIN=https://eshop-frontend.vercel.app
```

**Prečo obe?**
- `FRONTEND_URL` - používa sa pre redirecty, email linky, atď.
- `CORS_ORIGIN` - používa sa pre CORS (Cross-Origin Resource Sharing) - umožňuje frontendu volať backend API

---

## 3️⃣ Backend (Render) → MongoDB Atlas

### Čo potrebujete:
- **MongoDB Connection String** z Atlas

### Krok 1: Získajte Connection String
1. Choďte na: https://cloud.mongodb.com
2. Choďte do **"Database" → "Connect"**
3. Vyberte **"Connect your application"**
4. Skopírujte Connection String

**Váš Connection String:**
```
mongodb+srv://David:Animalia55@frappkovemaskrty.dedagxv.mongodb.net/eshop?retryWrites=true&w=majority
```

### Krok 2: Nastavte v Render
1. Choďte na: https://dashboard.render.com
2. Kliknite na váš Web Service
3. Choďte do **"Environment"** sekcie
4. Pridajte alebo upravte:
   - **Key:** `MONGODB_URI`
   - **Value:** `mongodb+srv://David:Animalia55@frappkovemaskrty.dedagxv.mongodb.net/eshop?retryWrites=true&w=majority`
5. Kliknite **"Save Changes"**

### Krok 3: Skontrolujte Network Access
1. Choďte na: https://cloud.mongodb.com
2. Choďte do **"Network Access"**
3. Uistite sa, že máte pridané:
   - Pre vývoj: `0.0.0.0/0` (všetky IP)
   - Pre produkciu: IP adresy Render serverov (alebo `0.0.0.0/0` ak Render nemá statickú IP)

---

## 4️⃣ Stripe → Backend (Render) Webhook

### Čo potrebujete:
- **Backend Webhook URL** (Render URL + `/api/payments/webhook`)

### Krok 1: Získajte Webhook URL
Vaša webhook URL bude:
```
https://vas-backend.onrender.com/api/payments/webhook
```

**Príklad:**
```
https://eshop-backend.onrender.com/api/payments/webhook
```

### Krok 2: Nastavte v Stripe Dashboard
1. Choďte na: https://dashboard.stripe.com (Live mode)
2. Choďte do **"Developers" → "Webhooks"**
3. Kliknite **"Add endpoint"**
4. Zadajte **Endpoint URL:**
   ```
   https://vas-backend.onrender.com/api/payments/webhook
   ```
5. Vyberte eventy:
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`
6. Kliknite **"Add endpoint"**
7. Skopírujte **Signing secret** (`whsec_...`)

### Krok 3: Nastavte Webhook Secret v Render
1. Choďte na: https://dashboard.render.com
2. Kliknite na váš Web Service
3. Choďte do **"Environment"** sekcie
4. Pridajte:
   - **Key:** `STRIPE_WEBHOOK_SECRET`
   - **Value:** `whsec_wOLdCq41WFWARoot7GcuxYrwDQiA5OuV`
5. Kliknite **"Save Changes"**

---

## 📋 Kompletný zoznam Environment Variables

### Render (Backend) - Environment Variables:

```env
# Server
PORT=5000
NODE_ENV=production

# MongoDB
MONGODB_URI=mongodb+srv://David:Animalia55@frappkovemaskrty.dedagxv.mongodb.net/eshop?retryWrites=true&w=majority

# JWT
JWT_SECRET=vas-very-strong-secret-key-change-this

# Stripe
STRIPE_SECRET_KEY=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
STRIPE_WEBHOOK_SECRET=whsec_wOLdCq41WFWARoot7GcuxYrwDQiA5OuV

# Frontend (pre CORS a redirecty)
FRONTEND_URL=https://vas-frontend.vercel.app
CORS_ORIGIN=https://vas-frontend.vercel.app
```

### Vercel (Frontend) - Environment Variables:

```env
# Backend API URL
VITE_API_URL=https://vas-backend.onrender.com/api

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_51SRfJ9GuvYdUKan8tagPRi5X4ypyxXxlBqgLgHUoRWzTiKKb4A7WWYsBX0TxHjDWaJejllKWqdU651pe8o9oEFUW00dKlEyrQg
```

---

## ✅ Checklist prepojení

### Frontend → Backend
- [ ] `VITE_API_URL` nastavený v Vercel
- [ ] Hodnota: `https://vas-backend.onrender.com/api` (s `/api`!)

### Backend → Frontend
- [ ] `FRONTEND_URL` nastavený v Render
- [ ] `CORS_ORIGIN` nastavený v Render
- [ ] Hodnoty: `https://vas-frontend.vercel.app` (bez `/api`)

### Backend → MongoDB
- [ ] `MONGODB_URI` nastavený v Render
- [ ] MongoDB Network Access nastavené (0.0.0.0/0 alebo IP adresy)

### Stripe → Backend
- [ ] Webhook endpoint vytvorený v Stripe Dashboard
- [ ] URL: `https://vas-backend.onrender.com/api/payments/webhook`
- [ ] `STRIPE_WEBHOOK_SECRET` nastavený v Render
- [ ] Eventy vybrané: `payment_intent.succeeded`, `payment_intent.payment_failed`

---

## 🧪 Testovanie prepojení

### 1. Test Frontend → Backend
1. Otvorte frontend: `https://vas-frontend.vercel.app`
2. Otvorte konzolu prehliadača (F12)
3. Skúste sa prihlásiť alebo načítať produkty
4. V Network tab by ste mali vidieť volania na: `https://vas-backend.onrender.com/api/...`
5. Nemali by byť CORS chyby

### 2. Test Backend → MongoDB
1. Skúste vytvoriť účet alebo objednávku
2. Skontrolujte Render logs - nemali by byť MongoDB chyby
3. Skontrolujte MongoDB Atlas - mali by sa tam objaviť dáta

### 3. Test Stripe → Backend
1. Choďte do Stripe Dashboard → Webhooks
2. Kliknite na váš endpoint
3. Kliknite **"Send test webhook"**
4. Skontrolujte Render logs - mali by ste vidieť: `Payment succeeded: pi_...`

---

## 🔧 Riešenie problémov

### Problém: Frontend nevidí backend (CORS chyba)

**Chyba:**
```
Access to fetch at 'https://vas-backend.onrender.com/api/...' from origin 'https://vas-frontend.vercel.app' has been blocked by CORS policy
```

**Riešenie:**
1. Skontrolujte `CORS_ORIGIN` v Render - musí byť presne URL frontendu
2. Skontrolujte `FRONTEND_URL` v Render
3. Reštartujte Render službu

### Problém: Backend nevidí MongoDB

**Chyba:**
```
MongoServerError: connection timed out
```

**Riešenie:**
1. Skontrolujte `MONGODB_URI` v Render
2. Skontrolujte MongoDB Network Access (0.0.0.0/0)
3. Skontrolujte, či je password správne (žiadne špeciálne znaky bez URL encoding)

### Problém: Stripe webhook nefunguje

**Chyba:**
```
Webhook signature verification failed
```

**Riešenie:**
1. Skontrolujte `STRIPE_WEBHOOK_SECRET` v Render
2. Skontrolujte, či používate správny secret (Live vs Test)
3. Skontrolujte webhook URL v Stripe Dashboard

---

## 📝 Rýchly súhrn

### Vercel (Frontend):
```
VITE_API_URL=https://vas-backend.onrender.com/api
```

### Render (Backend):
```
FRONTEND_URL=https://vas-frontend.vercel.app
CORS_ORIGIN=https://vas-frontend.vercel.app
MONGODB_URI=mongodb+srv://...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Stripe Dashboard:
```
Webhook URL: https://vas-backend.onrender.com/api/payments/webhook
```

---

**Hotovo! Všetky služby sú teraz prepojené!** ✅

**Po nastavení všetkých prepojení reštartujte:**
- Render službu (automaticky po uložení environment variables)
- Vercel (automaticky po uložení environment variables)

