# 🔑 Stripe Webhook Secret - Nastavenie

## ✅ Váš Webhook Secret

```
whsec_YOUR_WEBHOOK_SECRET_HERE
```

---

## 📝 Kde nastaviť

### 1. Lokálne vývojové prostredie

**Otvorte `eshop/backend/.env` a pridajte:**
```env
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
```

**Kompletný `.env` súbor by mal obsahovať:**
```env
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/eshop?retryWrites=true&w=majority

# JWT
JWT_SECRET=moj-tajny-kluc-zmenit-v-produkcii

# Stripe
STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE

# Frontend
FRONTEND_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000
```

**Po pridaní reštartujte backend server!**

---

### 2. Render (Backend)

1. Choďte na: https://dashboard.render.com
2. Kliknite na váš Web Service (`eshop-backend`)
3. Choďte do **"Environment"** sekcie
4. Pridajte alebo upravte:
   - **Key:** `STRIPE_WEBHOOK_SECRET`
   - **Value:** `whsec_YOUR_WEBHOOK_SECRET_HERE`
5. Kliknite **"Save Changes"**
6. Render automaticky reštartuje službu

---

### 3. Railway (Backend)

1. Choďte na: https://railway.app
2. Kliknite na váš projekt
3. Kliknite na váš backend service
4. Choďte do **"Variables"** tab
5. Pridajte alebo upravte:
   - **Key:** `STRIPE_WEBHOOK_SECRET`
   - **Value:** `whsec_YOUR_WEBHOOK_SECRET_HERE`
6. Railway automaticky reštartuje

---

### 4. Heroku (Backend)

```bash
heroku config:set STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
```

---

## ✅ Overenie

### Test webhooku v Stripe Dashboard:

1. Choďte na: https://dashboard.stripe.com (Live mode)
2. Choďte do **"Developers" → "Webhooks"**
3. Kliknite na váš endpoint
4. Kliknite **"Send test webhook"**
5. Vyberte event: `payment_intent.succeeded`
6. Kliknite **"Send test webhook"**

**Očakávaný výsledok:**
- ✅ V Stripe Dashboard: Zelený status (200 OK)
- ✅ V backend logoch: `Payment succeeded: pi_...`

---

## 🔒 Bezpečnosť

**⚠️ Dôležité:**
- ✅ Webhook secret je citlivý údaj - **NIKDY** ho necommitnite do Git
- ✅ `.env` súbor je v `.gitignore` (nebude sa commitovať)
- ✅ Pre produkciu používajte Environment Variables v hosting platformách
- ✅ Každý webhook endpoint má svoj vlastný secret

---

## 📋 Kompletný zoznam Stripe environment variables

### Pre produkciu (Live mode):

```env
# Stripe Live Keys
STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
```

### Pre frontend (Vercel/Netlify):

```env
VITE_STRIPE_PUBLISHABLE_KEY=YOUR_STRIPE_PUBLISHABLE_KEY_HERE
```

---

## 🧪 Testovanie webhooku lokálne

Pre lokálne testovanie webhookov môžete použiť Stripe CLI:

```bash
# Inštalácia Stripe CLI
# Windows: Stiahnite z https://github.com/stripe/stripe-cli/releases

# Spustenie webhook forwarding
stripe listen --forward-to localhost:5000/api/payments/webhook
```

Stripe CLI automaticky vytvorí testovací webhook secret, ktorý použijete lokálne.

---

## ❓ Časté problémy

### Problém: "Webhook signature verification failed"

**Riešenie:**
1. Skontrolujte, či je `STRIPE_WEBHOOK_SECRET` správne nastavený
2. Skontrolujte, či používate správny secret (Live vs Test)
3. Skontrolujte, či je webhook URL správna

### Problém: Webhook neprichádza

**Riešenie:**
1. Skontrolujte, či je webhook endpoint verejne dostupný (HTTPS)
2. Skontrolujte Network Access v Render/Railway
3. Skontrolujte logy v Stripe Dashboard → Webhooks → Recent deliveries

---

## ✅ Checklist

- [ ] `STRIPE_WEBHOOK_SECRET` pridaný do `backend/.env` (lokálne)
- [ ] `STRIPE_WEBHOOK_SECRET` pridaný do Render/Railway environment variables
- [ ] Backend reštartovaný (ak lokálne)
- [ ] Webhook endpoint vytvorený v Stripe Dashboard
- [ ] Webhook URL správna: `https://vas-backend-url.com/api/payments/webhook`
- [ ] Test webhooku úspešný v Stripe Dashboard

---

**Hotovo! Váš Stripe webhook secret je nastavený!** ✅

**Pamätajte:** Toto je Live webhook secret - používajte ho len v produkcii! 🔒

