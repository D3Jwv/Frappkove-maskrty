# ✅ Deployment Checklist

Použite tento checklist pred produkčným nasadením.

---

## 📋 Pre-nasadenie

### MongoDB Atlas
- [ ] Účet vytvorený
- [ ] Cluster vytvorený (M0 Free tier)
- [ ] Database user vytvorený
- [ ] Network Access nastavené (IP whitelist)
- [ ] Connection string skopírovaný a testovaný

### Stripe
- [ ] Účet vytvorený
- [ ] Prepnuté na Live mode
- [ ] Live Publishable key skopírovaný (`pk_live_...`)
- [ ] Live Secret key skopírovaný (`sk_live_...`)
- [ ] Webhook endpoint pripravený (URL)

### Backend
- [ ] Heroku/Railway/Render účet vytvorený
- [ ] Aplikácia vytvorená
- [ ] Environment variables pripravené:
  - [ ] `MONGODB_URI`
  - [ ] `JWT_SECRET` (silný kľúč, min. 32 znakov)
  - [ ] `NODE_ENV=production`
  - [ ] `STRIPE_SECRET_KEY` (Live)
  - [ ] `STRIPE_WEBHOOK_SECRET`
  - [ ] `FRONTEND_URL`
  - [ ] `CORS_ORIGIN`
- [ ] `Procfile` existuje
- [ ] `package.json` má `start` script

### Frontend
- [ ] Vercel/Netlify účet vytvorený
- [ ] Environment variables pripravené:
  - [ ] `VITE_API_URL` (backend URL)
  - [ ] `VITE_STRIPE_PUBLISHABLE_KEY` (Live)
- [ ] `vercel.json` alebo `netlify.toml` existuje

---

## 🚀 Nasadenie

### Backend
- [ ] Heroku CLI nainštalované a prihlásené
- [ ] Git repository inicializované
- [ ] Environment variables nastavené v Heroku
- [ ] Deploy úspešný
- [ ] Health check funguje: `/api/health`

### Frontend
- [ ] Vercel CLI nainštalované (alebo použite web)
- [ ] Environment variables nastavené
- [ ] Deploy úspešný
- [ ] Frontend URL funguje

### Stripe Webhook
- [ ] Webhook endpoint vytvorený v Stripe Dashboard
- [ ] URL: `https://vas-backend-url.com/api/payments/webhook`
- [ ] Eventy vybrané: `payment_intent.succeeded`, `payment_intent.payment_failed`
- [ ] Webhook secret skopírovaný
- [ ] Webhook secret pridaný do backend environment variables

---

## ✅ Post-nasadenie

### Testovanie
- [ ] Backend health check funguje
- [ ] Frontend sa načíta bez chýb
- [ ] Prihlásenie funguje
- [ ] Registrácia funguje
- [ ] Produkty sa zobrazujú
- [ ] Košík funguje
- [ ] Checkout funguje
- [ ] Stripe platba funguje (testovacia karta)
- [ ] Objednávka sa vytvorí
- [ ] Email notifikácia funguje (ak je nastavená)

### Bezpečnosť
- [ ] HTTPS aktivované (automaticky na Heroku/Vercel)
- [ ] CORS správne nakonfigurované
- [ ] Environment variables nie sú v Git
- [ ] JWT_SECRET je silný a jedinečný
- [ ] Rate limiting funguje
- [ ] Helmet middleware aktivovaný (produkcia)

### Monitoring
- [ ] Backend logy dostupné
- [ ] Frontend logy dostupné
- [ ] Stripe Dashboard monitorovaný
- [ ] MongoDB Atlas monitorovaný

---

## 🔧 Konfigurácia

### Backend Environment Variables
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=vas-very-strong-secret-key
FRONTEND_URL=https://vas-frontend.vercel.app
CORS_ORIGIN=https://vas-frontend.vercel.app
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Frontend Environment Variables
```
VITE_API_URL=https://vas-backend.herokuapp.com/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

---

## 📞 Podpora

Ak máte problémy:
1. Skontrolujte logy (Heroku: `heroku logs --tail`)
2. Skontrolujte environment variables
3. Skontrolujte MongoDB connection
4. Skontrolujte Stripe Dashboard
5. Pozrite si **DEPLOYMENT-GUIDE.md** pre detailné riešenia

---

**Všetko hotové? Váš e-shop je v produkcii! 🎉**

