# 🇪🇺 Nasadenie pre Slovensko - Evropské servery

Tento dokument obsahuje odporúčania pre nasadenie e-shopu pre slovenských zákazníkov s použitím evropských serverov pre optimálny výkon.

---

## 🎯 Prečo evropské servery?

- ✅ **Nižšia latencia** - Rýchlejšie načítavanie stránok
- ✅ **Lepšia rýchlosť** - Optimálny výkon pre slovenských zákazníkov
- ✅ **GDPR compliance** - Dáta zostávajú v Európe
- ✅ **Lepšia dostupnosť** - Menej problémov s pripojením

---

## 🏆 Odporúčaná konfigurácia pre Slovensko

### Možnosť 1: Cloud platformy (odporúčané pre začiatok)
- **Backend:** Railway alebo Render (Europe)
- **Frontend:** Vercel (automaticky evropské edge servery)
- **Database:** MongoDB Atlas (Europe - Frankfurt)

### Možnosť 2: Slovenské hostingy 🇸🇰 (odporúčané pre produkciu)
- **Backend:** WebSupport VPS alebo Platon VPS
- **Frontend:** WebSupport hosting alebo Platon hosting
- **Database:** MongoDB Atlas (Europe - Frankfurt) alebo lokálna MongoDB

---

## 🇸🇰 Slovenské hosting alternatívy

### Prečo zvážiť slovenské hostingy?

**Výhody:**
- ✅ **Najnižšia latencia** - Servery na Slovensku = najrýchlejšie pre slovenských zákazníkov
- ✅ **Slovenská podpora** - Podpora v slovenčine, rozumejú miestnym potrebám
- ✅ **Lokálne platobné brány** - Jednoduchšia integrácia s TatraPay, VÚB, atď.
- ✅ **GDPR compliance** - Dáta zostávajú na Slovensku
- ✅ **Lepšia kontrola** - VPS = plná kontrola nad serverom

**Nevýhody:**
- ⚠️ Vyžaduje viac technických znalostí (server setup, SSL, atď.)
- ⚠️ Vyššie náklady ako zdarma tier cloud platforiem
- ⚠️ Musíte sa starať o údržbu a bezpečnosť servera

---

## 1️⃣ MongoDB Atlas - Europe Region

### Krok 1: Vytvorenie clusteru
1. Choďte na: https://www.mongodb.com/cloud/atlas
2. Kliknite **"Build a Database"**
3. Vyberte **FREE (M0)** tier
4. **Dôležité:** Vyberte **Europe - Frankfurt** alebo **Europe - Ireland**
5. Vytvorte cluster

**Prečo Frankfurt/Ireland?**
- Najbližšie regiony k Slovensku
- Nižšia latencia (cca 20-30ms)
- GDPR compliant

---

## 2️⃣ Backend - Railway (Odporúčané)

### Výhody:
- ✅ Automaticky vyberá najbližší region
- ✅ Veľmi jednoduché nasadenie
- ✅ Zdarma tier dostupný
- ✅ Automatický deploy z GitHubu

### Postup:
1. Choďte na: https://railway.app
2. Prihláste sa cez GitHub
3. Kliknite **"New Project"**
4. Vyberte **"Deploy from GitHub repo"**
5. Vyberte váš repository
6. Nastavte **Root Directory:** `eshop/backend`
7. Pridajte environment variables
8. Railway automaticky deployne

**Region:** Railway automaticky vyberá najbližší region (Európa)

---

## 3️⃣ Backend - Render (Alternatíva)

### Výhody:
- ✅ Môžete manuálne vybrať **Europe (Frankfurt)**
- ✅ Zdarma tier dostupný
- ✅ Automatický deploy

### Postup:
1. Choďte na: https://render.com
2. Prihláste sa cez GitHub
3. Kliknite **"New" → "Web Service"**
4. Pripojte repository
5. **Dôležité:** V **"Region"** vyberte **"Europe (Frankfurt)"**
6. Nastavte:
   - **Root Directory:** `eshop/backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
7. Pridajte environment variables
8. Deploy

---

## 4️⃣ Frontend - Vercel (Odporúčané)

### Výhody:
- ✅ Automaticky používa evropské edge servery
- ✅ Veľmi rýchle načítavanie
- ✅ Automatický deploy z GitHubu
- ✅ Zdarma tier s veľkorysými limity

### Postup:
1. Choďte na: https://vercel.com
2. Prihláste sa cez GitHub
3. Kliknite **"Add New Project"**
4. Importujte repository
5. Nastavte:
   - **Root Directory:** `eshop/frontend`
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Pridajte environment variables:
   - `VITE_API_URL` = `https://vas-backend.railway.app/api`
   - `VITE_STRIPE_PUBLISHABLE_KEY` = `pk_live_...`
7. Deploy

**Vercel automaticky používa evropské edge servery** - nie je potrebné manuálne nastavovať region.

---

## 5️⃣ Frontend - Netlify (Alternatíva)

### Výhody:
- ✅ Automaticky používa evropské edge servery
- ✅ Jednoduché nasadenie

### Postup:
1. Choďte na: https://netlify.com
2. Prihláste sa cez GitHub
3. Kliknite **"Add new site" → "Import an existing project"**
4. Vyberte repository
5. Nastavte:
   - **Base directory:** `eshop/frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Pridajte environment variables
7. Deploy

---

## 6️⃣ Porovnanie latencie

### Pre slovenských zákazníkov:

| Platforma | Region | Latencia (cca) |
|-----------|--------|----------------|
| Railway | Auto (Európa) | 20-30ms |
| Render | Europe (Frankfurt) | 20-30ms |
| Vercel | Edge (Európa) | 15-25ms |
| Netlify | Edge (Európa) | 15-25ms |
| MongoDB Atlas | Europe (Frankfurt) | 20-30ms |

**Celková latencia:** ~40-60ms (veľmi dobrá pre Slovensko)

---

## 7️⃣ Environment Variables

### Backend (Railway/Render):
```env
MONGODB_URI=mongodb+srv://...@cluster.mongodb.net/eshop?retryWrites=true&w=majority
JWT_SECRET=vas-very-strong-secret-key
NODE_ENV=production
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
FRONTEND_URL=https://vas-frontend.vercel.app
CORS_ORIGIN=https://vas-frontend.vercel.app
```

### Frontend (Vercel/Netlify):
```
VITE_API_URL=https://vas-backend.railway.app/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

---

## 8️⃣ Testovanie výkonu

### Test latencie:
```bash
# Backend
curl -w "@curl-format.txt" -o /dev/null -s https://vas-backend.railway.app/api/health

# Frontend
curl -w "@curl-format.txt" -o /dev/null -s https://vas-frontend.vercel.app
```

### Online nástroje:
- **GTmetrix:** https://gtmetrix.com
- **PageSpeed Insights:** https://pagespeed.web.dev
- **WebPageTest:** https://www.webpagetest.org

---

## 9️⃣ Odporúčaná kombinácia pre Slovensko

### ⭐ Najlepšia kombinácia:

1. **Backend:** Railway (automaticky Európa)
2. **Frontend:** Vercel (evropské edge servery)
3. **Database:** MongoDB Atlas (Europe - Frankfurt)

**Výsledok:**
- ✅ Rýchle načítavanie stránok
- ✅ Nízka latencia API volaní
- ✅ Optimálny výkon pre slovenských zákazníkov
- ✅ GDPR compliant

---

## 🇸🇰 Slovenské hostingy - Detailný návod

### WebSupport VPS

**Výhody:**
- ✅ Servery na Slovensku (najnižšia latencia)
- ✅ Slovenská podpora v slovenčine
- ✅ VPS = plná kontrola
- ✅ Vhodné pre produkciu

**Nevýhody:**
- ⚠️ Vyžaduje technické znalosti
- ⚠️ Musíte sa starať o údržbu

**Postup:**
1. Choďte na: https://www.websupport.sk/vps
2. Vyberte VPS balík (odporúčané: minimálne 2GB RAM pre Node.js)
3. Vyberte operačný systém (Ubuntu Server 22.04 LTS)
4. Po aktivácii sa prihláste cez SSH
5. Nainštalujte Node.js, PM2, Nginx
6. Nastavte SSL certifikát (Let's Encrypt)
7. Deploy vášho backendu

**Cena:** Od ~15-30€/mesiac

---

### Platon VPS

**Výhody:**
- ✅ Servery na Slovensku
- ✅ Slovenská podpora
- ✅ VPS = plná kontrola

**Postup:**
1. Choďte na: https://www.platon.net
2. Vyberte VPS balík
3. Postup je podobný ako WebSupport

**Cena:** Od ~10-25€/mesiac

---

### WebSupport / Platon Webhosting (pre Frontend)

**Pre statický frontend (React build):**

1. Vytvorte build: `npm run build`
2. Nahrajte obsah `dist/` priečinka na hosting
3. Nastavte redirect pravidlá (všetko → index.html)
4. Aktivujte SSL

**Výhody:**
- ✅ Veľmi jednoduché
- ✅ Nízke náklady (~5-10€/mesiac)
- ✅ Rýchle načítavanie

---

## ⚠️ Dôležité poznámky o Shoptet

**Shoptet NIE JE hosting pre vlastný kód!**

Shoptet je **e-commerce platforma** (ako Shopify), ktorá:
- ✅ Poskytuje hotový e-shop systém
- ✅ Nevyžaduje programovanie
- ✅ Má integrované platobné brány
- ❌ **NEDÁ sa tam nasadiť vlastný Node.js kód**

**Kedy použiť Shoptet:**
- Ak chcete rýchlo spustiť e-shop bez programovania
- Ak nepotrebujete vlastné funkcie
- Ak chcete jednoduchú správu

**Kedy NEPOUŽIŤ Shoptet:**
- Ak máte vlastný kód (ako tento projekt)
- Ak potrebujete plnú kontrolu nad funkcionalitou
- Ak chcete použiť vlastné technológie

---

## 🇸🇰 Slovenské hostingy (WebSupport, Platon)

**Pre najnižšiu latenciu a plnú kontrolu:**

Ak chcete najlepší výkon pre slovenských zákazníkov a máte technické znalosti, zvážte:

- **WebSupport VPS** - Servery na Slovensku, najnižšia latencia (5-10ms)
- **Platon VPS** - Alternatíva s podobnými výhodami

**Výhody:**
- ✅ Najnižšia latencia (servery na Slovensku)
- ✅ Slovenská podpora v slovenčine
- ✅ Plná kontrola nad serverom
- ✅ GDPR compliance (dáta na Slovensku)

**Nevýhody:**
- ⚠️ Vyžaduje technické znalosti (Linux, SSH, Nginx)
- ⚠️ Vyššie náklady (~20-30€/mesiac)
- ⚠️ Musíte sa starať o údržbu

**Detailný návod:** Pozrite si **DEPLOYMENT-SLOVAKIA.md**

---

## ⚠️ Poznámka o Shoptet

**Shoptet NIE JE hosting pre vlastný kód!**

Shoptet je **e-commerce platforma** (ako Shopify), ktorá:
- ✅ Poskytuje hotový e-shop systém bez programovania
- ❌ **NEDÁ sa tam nasadiť vlastný Node.js kód**

**Kedy použiť Shoptet:**
- Ak chcete rýchlo spustiť e-shop bez programovania
- Ak nepotrebujete vlastné funkcie

**Kedy NEPOUŽIŤ Shoptet:**
- Ak máte vlastný kód (ako tento projekt) ❌
- Ak potrebujete plnú kontrolu nad funkcionalitou ❌

---

## 🔟 Alternatívy

### Ak potrebujete viac kontroly:

**DigitalOcean (Amsterdam):**
- VPS alebo App Platform
- Amsterdam datacenter (blízko Slovenska)
- Plná kontrola nad serverom
- Od ~$5/mesiac

**AWS (Frankfurt/Ireland):**
- Elastic Beanstalk alebo EC2
- EU regiony
- Veľká škálovateľnosť
- Od ~$10/mesiac

---

## 📊 Porovnanie cien

| Platforma | Zdarma tier | Začínajúci plán |
|-----------|-------------|-----------------|
| Railway | 500 hodín/mesiac | $5/mesiac |
| Render | 750 hodín/mesiac | $7/mesiac |
| Vercel | Neobmedzené | $20/mesiac |
| Netlify | 100 GB bandwidth | $19/mesiac |
| MongoDB Atlas | 512 MB | $9/mesiac |

**Pre začiatok:** Všetko môže bežať na zdarma tieroch!

---

## ✅ Checklist pre evropské nasadenie

- [ ] MongoDB Atlas cluster v **Europe - Frankfurt**
- [ ] Backend na **Railway** alebo **Render (Europe)**
- [ ] Frontend na **Vercel** alebo **Netlify**
- [ ] Environment variables nastavené
- [ ] CORS správne nakonfigurované (frontend URL)
- [ ] Testovanie latencie vykonané
- [ ] Výkon testovaný z Slovenska

---

## 🎉 Hotovo!

Váš e-shop je teraz optimalizovaný pre slovenských zákazníkov s evropskými servermi! 🇪🇺

**Očakávaný výkon:**
- ⚡ Načítavanie stránky: < 1 sekunda
- ⚡ API odpoveď: < 50ms
- ⚡ Celková latencia: < 100ms

---

**Viac informácií:** Pozrite si **DEPLOYMENT-GUIDE.md** pre detailné inštrukcie.

