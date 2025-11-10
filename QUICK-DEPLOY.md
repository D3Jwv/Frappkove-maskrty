# ⚡ Rýchle nasadenie - Quick Start

Rýchly návod na nasadenie e-shopu do produkcie.

---

## 🎯 Čo potrebujete (5 minút)

1. **MongoDB Atlas** účet (zdarma) - 🇪🇺 **Vyberte Europe region**
2. **Railway** alebo **Render** účet (zdarma tier) - 🇪🇺 **Evropské servery**
3. **Vercel** účet (zdarma) - 🇪🇺 **Automaticky evropské edge servery**
4. **Stripe** účet (zdarma testovací režim)

**🇪🇺 Pre slovenských zákazníkov:** Pozrite si **DEPLOYMENT-EUROPE.md** pre optimalizáciu výkonu!

---

## 📝 Krok 1: MongoDB Atlas (2 minúty)

1. Choďte na: https://www.mongodb.com/cloud/atlas/register
2. Vytvorte FREE cluster (M0)
3. **🇪🇺 Dôležité:** Vyberte **Europe - Frankfurt** alebo **Europe - Ireland** (pre Slovensko)
4. Vytvorte database user
5. Pridajte IP: `0.0.0.0/0` (pre vývoj)
6. Skopírujte connection string

**Connection string formát:**
```
mongodb+srv://username:password@cluster.mongodb.net/eshop?retryWrites=true&w=majority
```

---

## 💳 Krok 2: Stripe Live Keys (1 minúta)

1. Choďte na: https://dashboard.stripe.com
2. Prepnite na **Live mode**
3. Skopírujte **Live Publishable key** (`pk_live_...`)
4. Skopírujte **Live Secret key** (`sk_live_...`)

---

## 🚀 Krok 3: Backend na Railway/Render (3 minúty) 🇪🇺

**Pre Slovensko odporúčame Railway alebo Render (Europe region) namiesto Heroku!**

### Railway (Odporúčané pre Slovensko):

1. Choďte na: https://railway.app
2. Prihláste sa cez GitHub
3. Kliknite **"New Project"**
4. Vyberte **"Deploy from GitHub repo"**
5. Vyberte repository a nastavte **Root Directory:** `eshop/backend`
6. Pridajte environment variables v **"Variables"** tab
7. Railway automaticky deployne (vyberie najbližší region - Európa)

### Render (Alternatíva):

1. Choďte na: https://render.com
2. Prihláste sa cez GitHub
3. Kliknite **"New" → "Web Service"**
4. Pripojte repository
5. **Dôležité:** Vyberte **Region: Europe (Frankfurt)**
6. Nastavte **Root Directory:** `eshop/backend`
7. Pridajte environment variables
8. Deploy

**Environment variables (rovnako pre obe platformy):**
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=vas-very-strong-secret-key
NODE_ENV=production
STRIPE_SECRET_KEY=sk_live_...
FRONTEND_URL=https://vas-frontend.vercel.app
CORS_ORIGIN=https://vas-frontend.vercel.app
```

---

## 🌐 Krok 4: Frontend na Vercel (2 minúty) 🇪🇺

**Vercel automaticky používa evropské edge servery - ideálne pre Slovensko!**

### Cez web (najjednoduchšie):

1. Choďte na: https://vercel.com
2. Prihláste sa cez GitHub
3. Kliknite **"Add New Project"**
4. Importujte váš repository
5. Nastavte:
   - **Root Directory:** `eshop/frontend`
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Pridajte Environment Variables:
   - `VITE_API_URL` = `https://vas-backend.railway.app/api` (alebo render.com)
   - `VITE_STRIPE_PUBLISHABLE_KEY` = `pk_live_...`
7. Kliknite **"Deploy"**

### Cez CLI:
```bash
cd eshop/frontend
npm install -g vercel
vercel login
vercel --prod
```

**Alebo použite skript:**
```powershell
.\deploy-frontend.ps1
```

---

## ✅ Krok 5: Overenie

### Backend:
```bash
curl https://vas-backend.herokuapp.com/api/health
# Mala by sa vrátiť: {"status":"OK","message":"Backend beží"}
```

### Frontend:
- Otvorte: `https://vas-frontend.vercel.app`
- Skontrolujte, či sa stránka načíta

---

## 🔧 Alternatívy

### Backend:
- **Railway:** https://railway.app 🇪🇺 (automaticky Európa, odporúčané)
- **Render:** https://render.com 🇪🇺 (vyberte Europe region)
- **Heroku:** https://heroku.com (USA servery - vyššia latencia pre Slovensko)

### Frontend:
- **Vercel:** https://vercel.com 🇪🇺 (automaticky evropské edge servery, odporúčané)
- **Netlify:** https://netlify.com 🇪🇺 (automaticky evropské edge servery)

---

## 📚 Detailný návod

- **DEPLOYMENT-SLOVAKIA.md** 🇸🇰 - Nasadenie na slovenských hostingoch (WebSupport, Platon)
- **DEPLOYMENT-EUROPE.md** 🇪🇺 - Optimalizácia pre Slovensko (evropské cloud servery)
- **DEPLOYMENT-GUIDE.md** - Kompletný návod so všetkými možnosťami

---

## ⚠️ Dôležité poznámky

1. **Po deployi** nastavte Stripe webhook:
   - URL: `https://vas-backend.herokuapp.com/api/payments/webhook`
   - Eventy: `payment_intent.succeeded`, `payment_intent.payment_failed`

2. **MongoDB Atlas** - pre produkciu odporúčame obmedziť IP adresy len na vaše servery

3. **Environment Variables** - nikdy necommitnite `.env` súbory do Git

4. **HTTPS** - automaticky poskytované Heroku a Vercel

---

**Šťastné nasadenie! 🚀**

