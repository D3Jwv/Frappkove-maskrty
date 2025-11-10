# 🎉 Produkcia je pripravená!

Váš e-shop je teraz nasadený a pripravený na produkciu!

---

## ✅ Čo máte hotové

- ✅ **Render Backend** - Nasadený s kľúčmi
- ✅ **Vercel Frontend** - Nasadený s kľúčmi
- ✅ **MongoDB Atlas** - Nastavené a pripojené
- ✅ **Stripe Live** - Nastavené s Live kľúčmi a webhookmi

---

## 🔗 Vaše produkčné URL

### Backend (Render):
```
https://vas-backend.onrender.com
```
Alebo vaša skutočná URL: `_________________`

### Frontend (Vercel):
```
https://vas-frontend.vercel.app
```
Alebo vaša skutočná URL: `_________________`

### API Endpoints:
- Health check: `https://vas-backend.onrender.com/api/health`
- Webhook: `https://vas-backend.onrender.com/api/payments/webhook`

---

## ✅ Finálny checklist

### Backend (Render)
- [ ] Backend beží a je dostupný
- [ ] Environment variables nastavené:
  - [ ] `MONGODB_URI` ✅
  - [ ] `JWT_SECRET` ✅
  - [ ] `STRIPE_SECRET_KEY` ✅
  - [ ] `STRIPE_WEBHOOK_SECRET` ✅
  - [ ] `FRONTEND_URL` (URL vášho Vercel frontendu)
  - [ ] `CORS_ORIGIN` (URL vášho Vercel frontendu)
  - [ ] `NODE_ENV=production`
- [ ] Health check funguje: `/api/health`

### Frontend (Vercel)
- [ ] Frontend beží a je dostupný
- [ ] Environment variables nastavené:
  - [ ] `VITE_API_URL` (URL vášho Render backendu + `/api`)
  - [ ] `VITE_STRIPE_PUBLISHABLE_KEY` ✅
- [ ] Frontend sa načíta bez chýb

### MongoDB Atlas
- [ ] Cluster beží
- [ ] Connection string nastavený ✅
- [ ] Network Access nastavené (0.0.0.0/0 alebo IP adresy serverov)
- [ ] Database user vytvorený ✅

### Stripe
- [ ] Live mode aktivovaný ✅
- [ ] Live kľúče nastavené ✅
- [ ] Webhook endpoint vytvorený:
  - [ ] URL: `https://vas-backend.onrender.com/api/payments/webhook`
  - [ ] Eventy: `payment_intent.succeeded`, `payment_intent.payment_failed`
  - [ ] Webhook secret nastavený ✅

---

## 🧪 Testovanie produkcie

### 1. Test Backend Health Check
```bash
curl https://vas-backend.onrender.com/api/health
```

**Očakávaný výsledok:**
```json
{"status":"OK","message":"Backend beží"}
```

### 2. Test Frontend
1. Otvorte: `https://vas-frontend.vercel.app`
2. Skontrolujte, či sa stránka načíta
3. Skontrolujte konzolu prehliadača (F12) - nemali by byť chyby

### 3. Test prihlásenia
1. Vytvorte účet alebo sa prihláste
2. Skontrolujte, či funguje autentifikácia

### 4. Test produktov
1. Prezrite si produkty
2. Pridajte produkty do košíka
3. Skontrolujte, či košík funguje

### 5. Test platby (s testovacou kartou)
1. Prejdite do košíka
2. Kliknite "Pokračovať k platbe"
3. Použite testovaciu kartu:
   - **Číslo:** `4242 4242 4242 4242`
   - **Expiry:** `12/25`
   - **CVC:** `123`
   - **ZIP:** `12345`
4. Dokončite platbu
5. Skontrolujte:
   - ✅ Platba prešla
   - ✅ Objednávka sa vytvorila
   - ✅ V Stripe Dashboard vidíte platbu

### 6. Test webhooku
1. Choďte do Stripe Dashboard → Webhooks
2. Kliknite na váš endpoint
3. Kliknite "Send test webhook"
4. Vyberte `payment_intent.succeeded`
5. Skontrolujte:
   - ✅ Status: 200 OK (zelený)
   - ✅ V Render logoch vidíte: `Payment succeeded: pi_...`

---

## 🔧 Dôležité nastavenia - PREPOJENIE SLUŽIEB

### ⚠️ DÔLEŽITÉ: Všetky služby musia byť prepojené!

**Detailný návod:** Pozrite si **PREPOJENIE-SLUZIEB.md**

### Rýchly prehľad:

#### 1. Frontend (Vercel) → Backend (Render)
```env
VITE_API_URL=https://vas-backend.onrender.com/api
```
⚠️ **Dôležité:** URL musí končiť s `/api`!

#### 2. Backend (Render) → Frontend (Vercel)
```env
FRONTEND_URL=https://vas-frontend.vercel.app
CORS_ORIGIN=https://vas-frontend.vercel.app
```
⚠️ **Dôležité:** URL bez `/api`!

#### 3. Backend (Render) → MongoDB Atlas
```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/eshop?retryWrites=true&w=majority
```

#### 4. Stripe → Backend (Render) Webhook
```
Webhook URL: https://vas-backend.onrender.com/api/payments/webhook
```
⚠️ **Dôležité:** Musí byť HTTPS a správna cesta!

---

## 📊 Monitoring

### Render Logs
```bash
# V Render Dashboard
# Choďte do vášho Web Service → Logs
```

### Vercel Analytics
- Automaticky dostupné v Vercel Dashboard
- Choďte do vášho projektu → Analytics

### Stripe Dashboard
- Choďte na: https://dashboard.stripe.com (Live mode)
- Prezrite si platby, webhooky, atď.

### MongoDB Atlas
- Choďte na: https://cloud.mongodb.com
- Prezrite si dáta, performance, atď.

---

## 🚨 Riešenie problémov

### Backend nebeží
1. Skontrolujte Render logs
2. Skontrolujte environment variables
3. Skontrolujte MongoDB connection

### Frontend nevidí backend
1. Skontrolujte `VITE_API_URL` v Vercel
2. Skontrolujte CORS nastavenia v Render
3. Skontrolujte konzolu prehliadača (F12)

### Platby nefungujú
1. Skontrolujte Stripe kľúče (Live vs Test)
2. Skontrolujte webhook endpoint URL
3. Skontrolujte Stripe Dashboard pre chyby

### Webhook nefunguje
1. Skontrolujte webhook secret
2. Skontrolujte webhook URL (musí byť HTTPS)
3. Skontrolujte Render logs
4. Skontrolujte Stripe Dashboard → Webhooks → Recent deliveries

---

## 📝 Zoznam všetkých kľúčov (pre referenciu)

### MongoDB Atlas
```
Connection String: mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/eshop?retryWrites=true&w=majority
```

### Stripe Live
```
Secret Key: sk_live_YOUR_SECRET_KEY_HERE
Publishable Key: pk_live_YOUR_PUBLISHABLE_KEY_HERE
Webhook Secret: whsec_YOUR_WEBHOOK_SECRET_HERE
```

---

## 🎯 Ďalšie kroky

### 1. Testovanie
- [ ] Otestujte všetky funkcie
- [ ] Otestujte platby s testovacou kartou
- [ ] Skontrolujte webhooky

### 2. Monitoring
- [ ] Nastavte upozornenia v Stripe
- [ ] Sledujte Render/Vercel logy
- [ ] Sledujte MongoDB Atlas performance

### 3. Bezpečnosť
- [ ] Obmedzte MongoDB Network Access len na IP adresy serverov
- [ ] Skontrolujte, či všetky kľúče sú v environment variables (nie v kóde)
- [ ] Skontrolujte, či `.env` súbory nie sú v Git

### 4. Optimalizácia
- [ ] Nastavte caching (ak potrebujete)
- [ ] Optimalizujte obrázky produktov
- [ ] Skontrolujte výkon stránky (PageSpeed Insights)

---

## 🎉 Gratulujeme!

Váš e-shop je teraz v produkcii a pripravený na skutočných zákazníkov! 🚀

**Pamätajte:**
- ✅ Sledujte logy pravidelne
- ✅ Testujte platby s testovacou kartou pred skutočnými platbami
- ✅ Zálohujte dáta pravidelne (MongoDB Atlas má automatické zálohy)
- ✅ Aktualizujte závislosti pravidelne

---

**Šťastné predávanie! 💰**

