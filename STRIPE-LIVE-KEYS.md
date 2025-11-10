# 🔑 Stripe Live Keys - Nastavenie

## ✅ Vaše nové Live kľúče

### Secret Key (Backend):
```
YOUR_STRIPE_SECRET_KEY_HERE
```

### Publishable Key (Frontend):
```
YOUR_STRIPE_PUBLISHABLE_KEY_HERE
```

---

## ⚠️ DÔLEŽITÉ - Bezpečnosť

**Tieto sú LIVE (produkčné) kľúče!**
- ❌ **NIKDY** ich necommitnite do Git!
- ❌ **NIKDY** ich nedávajte do verejných repozitárov!
- ✅ Používajte ich len v `.env` súboroch (ktoré sú v `.gitignore`)
- ✅ Pre produkciu použite Environment Variables v Render/Railway/Vercel

---

## 📝 Kde nastaviť kľúče

### 1. Lokálne vývojové prostredie

#### Backend (`eshop/backend/.env`):
```env
STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY_HERE
```

#### Frontend (`eshop/frontend/.env`):
```env
VITE_STRIPE_PUBLISHABLE_KEY=YOUR_STRIPE_PUBLISHABLE_KEY_HERE
```

**Po pridaní reštartujte servery!**

---

### 2. Render (Backend)

1. Choďte na: https://dashboard.render.com
2. Kliknite na váš Web Service (`eshop-backend`)
3. Choďte do **"Environment"** sekcie
4. Pridajte alebo upravte:
   - **Key:** `STRIPE_SECRET_KEY`
   - **Value:** `YOUR_STRIPE_SECRET_KEY_HERE`
5. Kliknite **"Save Changes"**
6. Render automaticky reštartuje službu

---

### 3. Railway (Backend)

1. Choďte na: https://railway.app
2. Kliknite na váš projekt
3. Kliknite na váš backend service
4. Choďte do **"Variables"** tab
5. Pridajte alebo upravte:
   - **Key:** `STRIPE_SECRET_KEY`
   - **Value:** `YOUR_STRIPE_SECRET_KEY_HERE`
6. Railway automaticky reštartuje

---

### 4. Vercel (Frontend)

1. Choďte na: https://vercel.com
2. Kliknite na váš projekt
3. Choďte do **"Settings" → "Environment Variables"**
4. Pridajte alebo upravte:
   - **Key:** `VITE_STRIPE_PUBLISHABLE_KEY`
   - **Value:** `YOUR_STRIPE_PUBLISHABLE_KEY_HERE`
   - **Environment:** Production (a Development ak chcete)
5. Kliknite **"Save"**
6. Vercel automaticky redeployne

---

### 5. Netlify (Frontend)

1. Choďte na: https://app.netlify.com
2. Kliknite na váš site
3. Choďte do **"Site settings" → "Environment variables"**
4. Pridajte alebo upravte:
   - **Key:** `VITE_STRIPE_PUBLISHABLE_KEY`
   - **Value:** `YOUR_STRIPE_PUBLISHABLE_KEY_HERE`
5. Kliknite **"Save"**
6. Netlify automaticky redeployne

---

## 🔑 Webhook Secret

### Váš Webhook Secret:
```
whsec_YOUR_WEBHOOK_SECRET_HERE
```

### Kde ho nastaviť:

#### Backend `.env` (lokálne testovanie):
```env
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
```

#### Render (Backend):
1. Choďte do **"Environment"** sekcie
2. Pridajte:
   - **Key:** `STRIPE_WEBHOOK_SECRET`
   - **Value:** `whsec_YOUR_WEBHOOK_SECRET_HERE`

#### Railway (Backend):
1. Choďte do **"Variables"** tab
2. Pridajte:
   - **Key:** `STRIPE_WEBHOOK_SECRET`
   - **Value:** `whsec_YOUR_WEBHOOK_SECRET_HERE`

**⚠️ Dôležité:** Po pridaní reštartujte backend službu!

---

## 🔒 Bezpečnostné opatrenia

### ✅ Čo robiť:
- ✅ Ukladajte kľúče len v `.env` súboroch
- ✅ `.env` súbory sú v `.gitignore` (necommitnú sa)
- ✅ Pre produkciu používajte Environment Variables v hosting platformách
- ✅ Používajte rôzne kľúče pre development a production

### ❌ Čo NEROBIT:
- ❌ Necommitnite kľúče do Git
- ❌ Nedávajte kľúče do verejných repozitárov
- ❌ Nezdieľajte kľúče v chate/emaili (okrem tohto dokumentu, ktorý je lokálny)
- ❌ Nepoužívajte testovacie kľúče v produkcii

---

## ✅ Checklist

- [ ] Backend `.env` aktualizovaný s `STRIPE_SECRET_KEY`
- [ ] Frontend `.env` aktualizovaný s `VITE_STRIPE_PUBLISHABLE_KEY`
- [ ] Backend server reštartovaný
- [ ] Frontend server reštartovaný
- [ ] Render/Railway environment variables nastavené (ak používate)
- [ ] Vercel/Netlify environment variables nastavené (ak používate)
- [ ] Testovanie platby v produkcii

---

## 🧪 Testovanie Live kľúčov

**POZOR:** S Live kľúčmi sa robia skutočné platby!

### Testovacie karty (Stripe):
- **Úspešná platba:** `4242 4242 4242 4242`
- **Zlyhaná platba:** `4000 0000 0000 0002`

**Vždy testujte s malými sumami!**

---

## 📞 Ak máte problémy

1. **Skontrolujte, či sú kľúče správne skopírované** (bez medzier, nových riadkov)
2. **Skontrolujte, či servery boli reštartované** po zmene `.env`
3. **Skontrolujte logy** v Render/Railway/Vercel
4. **Skontrolujte Stripe Dashboard** - mali by ste vidieť platby

---

**Hotovo! Vaše Live Stripe kľúče sú pripravené na použitie!** ✅

**Pamätajte:** Tieto sú produkčné kľúče - používajte ich opatrne! 🔒

