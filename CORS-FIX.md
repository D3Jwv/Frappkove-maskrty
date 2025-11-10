# 🔧 Oprava CORS chyby

## ❌ Chyba:
```
Access to XMLHttpRequest at 'http://localhost:5000/api/users/register' from origin 'https://frappkove-maskrty.vercel.app' has been blocked by CORS policy
```

## 🔍 Problém:
1. **Frontend volá `localhost:5000`** namiesto produkčného backendu
2. **Backend má CORS nastavený na `localhost:3000`** namiesto Vercel URL

---

## ✅ Riešenie

### 1. Oprava Frontend (Vercel)

**Problém:** Frontend volá `http://localhost:5000` namiesto produkčného backendu.

**Riešenie:**
1. Choďte na: https://vercel.com
2. Kliknite na váš projekt (`frappkove-maskrty`)
3. Choďte do **"Settings" → "Environment Variables"**
4. **Pridajte alebo upravte:**
   - **Key:** `VITE_API_URL`
   - **Value:** `https://vas-backend.onrender.com/api` ⚠️ (nahraďte `vas-backend.onrender.com` vašou skutočnou Render URL!)
   - **Environment:** Production (a Development ak chcete)
5. Kliknite **"Save"**
6. Vercel automaticky redeployne

**Príklad:**
```
VITE_API_URL=https://eshop-backend.onrender.com/api
```

**⚠️ Dôležité:**
- URL musí byť **HTTPS** (nie HTTP)
- URL musí končiť s **`/api`**
- Po uložení musí Vercel redeploynúť (automaticky)

---

### 2. Oprava Backend (Render)

**Problém:** Backend má CORS nastavený na `localhost:3000` namiesto Vercel URL.

**Riešenie:**
1. Choďte na: https://dashboard.render.com
2. Kliknite na váš Web Service
3. Choďte do **"Environment"** sekcie
4. **Pridajte alebo upravte:**
   - **Key:** `FRONTEND_URL`
   - **Value:** `https://frappkove-maskrty.vercel.app` ⚠️ (bez `/api`!)
   - **Key:** `CORS_ORIGIN`
   - **Value:** `https://frappkove-maskrty.vercel.app` ⚠️ (bez `/api`!)
5. Kliknite **"Save Changes"**
6. Render automaticky reštartuje službu

**Príklad:**
```
FRONTEND_URL=https://frappkove-maskrty.vercel.app
CORS_ORIGIN=https://frappkove-maskrty.vercel.app
```

**⚠️ Dôležité:**
- URL musí byť **HTTPS** (nie HTTP)
- URL **NEMUSÍ** končiť s `/api`
- Po uložení musí Render reštartovať službu (automaticky)

---

## 📋 Kompletný zoznam Environment Variables

### Vercel (Frontend):
```env
VITE_API_URL=https://vas-backend.onrender.com/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_51SRfJ9GuvYdUKan8tagPRi5X4ypyxXxlBqgLgHUoRWzTiKKb4A7WWYsBX0TxHjDWaJejllKWqdU651pe8o9oEFUW00dKlEyrQg
```

### Render (Backend):
```env
PORT=5000
NODE_ENV=production

# MongoDB
MONGODB_URI=mongodb+srv://David:Animalia55@frappkovemaskrty.dedagxv.mongodb.net/eshop?retryWrites=true&w=majority

# JWT
JWT_SECRET=vas-very-strong-secret-key

# Stripe
STRIPE_SECRET_KEY=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
STRIPE_WEBHOOK_SECRET=whsec_wOLdCq41WFWARoot7GcuxYrwDQiA5OuV

# Frontend (pre CORS)
FRONTEND_URL=https://frappkove-maskrty.vercel.app
CORS_ORIGIN=https://frappkove-maskrty.vercel.app
```

---

## ✅ Overenie

### 1. Skontrolujte Vercel Environment Variables
1. Choďte do Vercel → Settings → Environment Variables
2. Skontrolujte, či `VITE_API_URL` je nastavený na Render URL (nie localhost)
3. Skontrolujte, či je URL HTTPS a končí s `/api`

### 2. Skontrolujte Render Environment Variables
1. Choďte do Render → Environment
2. Skontrolujte, či `FRONTEND_URL` a `CORS_ORIGIN` sú nastavené na Vercel URL
3. Skontrolujte, či sú URL HTTPS (nie HTTP)

### 3. Testovanie
1. Počkajte, kým Vercel redeployne (1-2 minúty)
2. Počkajte, kým Render reštartuje (30 sekúnd)
3. Obnovte frontend stránku (Ctrl + F5)
4. Skúste sa registrovať znova
5. Otvorte konzolu prehliadača (F12) - nemali by byť CORS chyby
6. V Network tab by ste mali vidieť volania na Render URL (nie localhost)

---

## 🔍 Ako zistiť vaše URL

### Render Backend URL:
1. Choďte na: https://dashboard.render.com
2. Kliknite na váš Web Service
3. V hornej časti uvidíte **URL** (napr. `https://eshop-backend.onrender.com`)

### Vercel Frontend URL:
1. Choďte na: https://vercel.com
2. Kliknite na váš projekt
3. V hornej časti uvidíte **URL** (napr. `https://frappkove-maskrty.vercel.app`)

---

## ❓ Časté problémy

### Problém: Stále vidím localhost v Network tab

**Riešenie:**
1. Skontrolujte, či je `VITE_API_URL` nastavený v Vercel
2. Vercel musí redeploynúť - počkajte 1-2 minúty
3. Vymažte cache prehliadača (Ctrl + Shift + Delete)
4. Obnovte stránku (Ctrl + F5)

### Problém: Stále vidím CORS chybu

**Riešenie:**
1. Skontrolujte, či sú `FRONTEND_URL` a `CORS_ORIGIN` nastavené v Render
2. Render musí reštartovať - počkajte 30 sekúnd
3. Skontrolujte, či sú URL presne rovnaké (žiadne medzery, správne HTTPS)
4. Skontrolujte Render logs pre chyby

### Problém: Backend nebeží

**Riešenie:**
1. Skontrolujte Render logs
2. Skontrolujte, či sú všetky environment variables nastavené
3. Skontrolujte, či MongoDB connection funguje

---

## 📝 Rýchly checklist

- [ ] Vercel: `VITE_API_URL` = `https://vas-backend.onrender.com/api` (s `/api`)
- [ ] Render: `FRONTEND_URL` = `https://frappkove-maskrty.vercel.app` (bez `/api`)
- [ ] Render: `CORS_ORIGIN` = `https://frappkove-maskrty.vercel.app` (bez `/api`)
- [ ] Vercel redeploynutý (automaticky po uložení)
- [ ] Render reštartovaný (automaticky po uložení)
- [ ] Cache prehliadača vymazaná
- [ ] Stránka obnovená (Ctrl + F5)

---

**Po týchto opravách by CORS chyba mala zmiznúť!** ✅

**Ak stále máte problémy, skontrolujte:**
1. Render logs - či backend beží
2. Vercel logs - či frontend sa správne buildol
3. Konzolu prehliadača (F12) - aké sú presné chyby

