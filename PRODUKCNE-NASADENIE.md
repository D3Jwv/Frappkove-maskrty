# Produkčné nasadenie - Kompletný návod

## 📋 Prehľad

Tento dokument obsahuje kompletné inštrukcie pre nasadenie e-shopu do produkcie.

---

## 🚀 1. MongoDB Atlas (Cloud Database)

### Krok 1: Vytvorenie účtu
1. Choďte na https://www.mongodb.com/cloud/atlas
2. Vytvorte bezplatný účet (M0 cluster - zdarma)
3. Vytvorte nový cluster

### Krok 2: Konfigurácia
1. **Network Access:**
   - Pridajte IP adresu: `0.0.0.0/0` (pre všetky IP) alebo špecifickú IP
   
2. **Database Access:**
   - Vytvorte užívateľa s heslom
   - Dajte mu práva "Atlas admin"

3. **Získajte Connection String:**
   - Kliknite na "Connect" → "Connect your application"
   - Skopírujte connection string
   - Nahraďte `<password>` skutočným heslom

### Krok 3: Aktualizácia .env
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/eshop?retryWrites=true&w=majority
```

---

## 🌐 2. Backend Deployment (Heroku)

### Krok 1: Príprava
1. Nainštalujte Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
2. Prihláste sa: `heroku login`

### Krok 2: Vytvorenie aplikácie
```bash
cd eshop/backend
heroku create vas-eshop-backend
```

### Krok 3: Konfigurácia
```bash
# MongoDB Atlas
heroku config:set MONGODB_URI="mongodb+srv://..."

# JWT Secret
heroku config:set JWT_SECRET="vasa-very-secret-key-change-in-production"

# Email (SendGrid)
heroku config:set EMAIL_SERVICE="sendgrid"
heroku config:set SMTP_HOST="smtp.sendgrid.net"
heroku config:set SMTP_PORT="587"
heroku config:set EMAIL_USER="apikey"
heroku config:set EMAIL_PASS="your-sendgrid-api-key"
heroku config:set EMAIL_FROM="noreply@vasadomena.sk"
heroku config:set FRONTEND_URL="https://vas-frontend.vercel.app"

# Stripe
heroku config:set STRIPE_SECRET_KEY="sk_live_..."
heroku config:set STRIPE_WEBHOOK_SECRET="whsec_..."

# Node environment
heroku config:set NODE_ENV="production"
```

### Krok 4: Deploy
```bash
git init
git add .
git commit -m "Initial commit"
heroku git:remote -a vas-eshop-backend
git push heroku main
```

### Krok 5: Overenie
```bash
heroku logs --tail
heroku open
```

---

## 🎨 3. Frontend Deployment (Vercel)

### Krok 1: Príprava
1. Nainštalujte Vercel CLI: `npm i -g vercel`
2. Prihláste sa: `vercel login`

### Krok 2: Vytvorenie vercel.json
Už existuje v `frontend/vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Krok 3: Environment Variables
Vytvorte `frontend/.env.production`:
```env
VITE_API_URL=https://vas-eshop-backend.herokuapp.com
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

### Krok 4: Deploy
```bash
cd eshop/frontend
vercel --prod
```

Alebo cez web:
1. Choďte na https://vercel.com
2. Importujte Git repository
3. Nastavte environment variables
4. Deploy

---

## 🔒 4. HTTPS a Bezpečnosť

### Heroku
- HTTPS je automaticky zapnuté
- SSL certifikát je poskytovaný Heroku

### Vercel
- HTTPS je automaticky zapnuté
- SSL certifikát je poskytovaný Vercel

### Ďalšie bezpečnostné opatrenia:
1. **Helmet.js** (pridať do backendu):
```bash
npm install helmet
```
```javascript
const helmet = require('helmet');
app.use(helmet());
```

2. **Rate Limiting:**
```bash
npm install express-rate-limit
```
```javascript
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minút
  max: 100 // limit 100 requestov
});
app.use('/api/', limiter);
```

3. **CORS:**
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://vas-frontend.vercel.app',
  credentials: true
}));
```

---

## 📊 5. Monitoring a Logging

### Heroku Logs
```bash
heroku logs --tail
heroku logs --tail --app vas-eshop-backend
```

### Vercel Analytics
- Automaticky dostupné v Vercel Dashboard
- Choďte na Vercel → váš projekt → Analytics

### Error Tracking (odporúčané)
**Sentry:**
```bash
npm install @sentry/node @sentry/react
```

---

## 🔧 6. Environment Variables - Kompletný zoznam

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=very-secret-key-change-this
FRONTEND_URL=https://vas-frontend.vercel.app

# Email
EMAIL_SERVICE=sendgrid
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
EMAIL_FROM=noreply@vasadomena.sk

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Frontend (.env.production)
```env
VITE_API_URL=https://vas-eshop-backend.herokuapp.com
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

---

## ✅ 7. Checklist pred nasadením

- [ ] MongoDB Atlas nastavené a testované
- [ ] Všetky environment variables nastavené
- [ ] Stripe API keys (Live mode)
- [ ] Email služba nastavená (SendGrid/Mailgun)
- [ ] HTTPS zapnuté (automaticky na Heroku/Vercel)
- [ ] CORS správne nakonfigurované
- [ ] Error handling implementovaný
- [ ] Logging nastavený
- [ ] Backup stratégia (MongoDB Atlas má automatické backupy)
- [ ] Monitoring nastavený

---

## 🐛 8. Troubleshooting

### Backend nebeží
```bash
heroku logs --tail
# Skontrolujte MongoDB connection
# Skontrolujte environment variables
```

### Frontend nevidí backend
- Skontrolujte `VITE_API_URL`
- Skontrolujte CORS nastavenia
- Skontrolujte Heroku URL

### Email nefunguje
- Skontrolujte SendGrid API key
- Skontrolujte email konfiguráciu v Heroku
- Skontrolujte logs: `heroku logs --tail`

### Stripe nefunguje
- Skontrolujte API keys (Live vs Test)
- Skontrolujte webhook secret
- Skontrolujte Stripe Dashboard

---

## 📚 9. Ďalšie zdroje

- **Heroku dokumentácia:** https://devcenter.heroku.com
- **Vercel dokumentácia:** https://vercel.com/docs
- **MongoDB Atlas:** https://docs.atlas.mongodb.com
- **Stripe dokumentácia:** https://stripe.com/docs
- **SendGrid dokumentácia:** https://docs.sendgrid.com

---

## 🎉 Hotovo!

Váš e-shop by teraz mal bežať v produkcii! 🚀

**Backend URL:** https://vas-eshop-backend.herokuapp.com  
**Frontend URL:** https://vas-frontend.vercel.app
 E-shop projektu

## 📋 Prehľad

Tento dokument popisuje kroky na nasadenie e-shop aplikácie do produkčného prostredia.

---

## 🎯 Čo potrebujete:

1. **MongoDB Atlas** účet (cloud databáza)
2. **Heroku** alebo **AWS/DigitalOcean** účet (backend hosting)
3. **Vercel** alebo **Netlify** účet (frontend hosting)
4. **GitHub** účet (pre verziu kódu)

---

## 📦 Krok 1: MongoDB Atlas (Cloud Databáza)

### 1.1 Vytvorenie účtu
1. Choďte na: https://www.mongodb.com/cloud/atlas/register
2. Vytvorte bezplatný účet
3. Vytvorte nový cluster (M0 - Free tier)

### 1.2 Konfigurácia
1. **Database Access:**
   - Vytvorte databázového užívateľa
   - Zapamätajte si username a password

2. **Network Access:**
   - Pridajte IP adresu: `0.0.0.0/0` (pre vývoj)
   - Pre produkciu pridajte len IP adresy vašich serverov

3. **Connection String:**
   - Kliknite "Connect" → "Connect your application"
   - Skopírujte connection string
   - Formát: `mongodb+srv://username:password@cluster.mongodb.net/eshop?retryWrites=true&w=majority`

---

## 🚀 Krok 2: Backend Deployment (Heroku)

### 2.1 Príprava projektu

1. **Vytvorte `Procfile` v `eshop/backend/`:**
   ```
   web: node src/index.js
   ```

2. **Aktualizujte `package.json`:**
   ```json
   {
     "scripts": {
       "start": "node src/index.js",
       "dev": "nodemon src/index.js"
     }
   }
   ```

3. **Vytvorte `.gitignore` (ak neexistuje):**
   ```
   node_modules/
   .env
   *.log
   ```

### 2.2 Heroku Setup

1. **Inštalácia Heroku CLI:**
   - Stiahnite z: https://devcenter.heroku.com/articles/heroku-cli

2. **Prihlásenie:**
   ```bash
   heroku login
   ```

3. **Vytvorenie aplikácie:**
   ```bash
   cd eshop/backend
   heroku create eshop-backend
   ```

4. **Nastavenie environment variables:**
   ```bash
   heroku config:set MONGODB_URI=your-mongodb-atlas-connection-string
   heroku config:set JWT_SECRET=your-secret-key-here
   heroku config:set NODE_ENV=production
   heroku config:set PORT=5000
   ```

5. **Deploy:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   heroku git:remote -a eshop-backend
   git push heroku main
   ```

### 2.3 Alternatíva: AWS/DigitalOcean

**AWS Elastic Beanstalk:**
- Vytvorte aplikáciu cez AWS Console
- Upload kódu cez EB CLI
- Nastavte environment variables

**DigitalOcean App Platform:**
- Vytvorte novú aplikáciu
- Pripojte GitHub repository
- Nastavte environment variables
- Deploy automaticky

---

## 🌐 Krok 3: Frontend Deployment (Vercel)

### 3.1 Príprava projektu

1. **Vytvorte `vercel.json` v `eshop/frontend/`:**
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "devCommand": "npm run dev",
     "installCommand": "npm install",
     "framework": "vite",
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```

2. **Aktualizujte `vite.config.js`:**
   ```javascript
   export default defineConfig({
     plugins: [react()],
     build: {
       outDir: 'dist'
     }
   });
   ```

3. **Vytvorte `.env.production` v `eshop/frontend/`:**
   ```
   VITE_API_URL=https://your-backend-url.herokuapp.com/api
   ```

### 3.2 Vercel Setup

1. **Inštalácia Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd eshop/frontend
   vercel
   ```

3. **Alebo cez GitHub:**
   - Choďte na: https://vercel.com
   - Prihláste sa cez GitHub
   - Importujte repository
   - Nastavte:
     - Root Directory: `eshop/frontend`
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Pridajte Environment Variable:
     - `VITE_API_URL`: `https://your-backend-url.herokuapp.com/api`

### 3.3 Alternatíva: Netlify

1. **Vytvorte `netlify.toml` v `eshop/frontend/`:**
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Deploy:**
   - Choďte na: https://netlify.com
   - Drag & drop `dist` priečinok
   - Alebo pripojte GitHub repository

---

## 🔒 Krok 4: Bezpečnosť a HTTPS

### 4.1 HTTPS
- **Vercel/Netlify:** Automaticky poskytujú HTTPS
- **Heroku:** Automaticky poskytuje HTTPS
- **Custom domain:** Pridajte SSL certifikát

### 4.2 Environment Variables

**Backend (.env v produkcii):**
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=strong-random-secret-key
PORT=5000
CORS_ORIGIN=https://your-frontend-domain.com
```

**Frontend (.env.production):**
```
VITE_API_URL=https://your-backend-domain.com/api
```

### 4.3 CORS Nastavenie

Aktualizujte `eshop/backend/src/index.js`:
```javascript
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
};
app.use(cors(corsOptions));
```

---

## 📊 Krok 5: Monitoring a Error Tracking

### 5.1 Sentry (Error Tracking)

**Backend:**
```bash
npm install @sentry/node
```

**Frontend:**
```bash
npm install @sentry/react
```

### 5.2 Logging

**Backend:**
- Použite `winston` alebo `morgan` pre logging
- Heroku automaticky loguje stdout

**Frontend:**
- Vercel/Netlify poskytujú access logs

---

## ✅ Krok 6: Overenie

### 6.1 Backend
- Skontrolujte: `https://your-backend.herokuapp.com/api/health`
- Mala by sa zobraziť: `{"status":"OK","message":"Backend beží"}`

### 6.2 Frontend
- Otvorte: `https://your-frontend.vercel.app`
- Mala by sa zobraziť aplikácia
- Skontrolujte, či API volania fungujú

### 6.3 MongoDB
- Skontrolujte MongoDB Atlas dashboard
- Overte, či sa vytvárajú kolekcie

---

## 🔄 Krok 7: CI/CD (Voliteľné)

### 7.1 GitHub Actions

Vytvorte `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "eshop-backend"
          heroku_email: "your-email@example.com"
          appdir: "eshop/backend"

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: ./eshop/frontend
```

---

## 📝 Checklist pred nasadením

- [ ] MongoDB Atlas nastavené a testované
- [ ] Environment variables nastavené
- [ ] CORS správne nakonfigurované
- [ ] HTTPS aktivované
- [ ] Error handling implementovaný
- [ ] Logging nastavené
- [ ] Backup stratégia
- [ ] Monitoring nastavené
- [ ] Dokumentácia aktualizovaná

---

## 🆘 Riešenie problémov

### Problém: Backend sa nespustí
- Skontrolujte Heroku logs: `heroku logs --tail`
- Overte environment variables
- Skontrolujte MongoDB connection

### Problém: Frontend nefunguje
- Skontrolujte Vercel/Netlify logs
- Overte `VITE_API_URL` environment variable
- Skontrolujte CORS nastavenie

### Problém: MongoDB connection error
- Overte Network Access v MongoDB Atlas
- Skontrolujte connection string
- Overte username a password

---

## 📚 Ďalšie zdroje

- **Heroku dokumentácia:** https://devcenter.heroku.com
- **Vercel dokumentácia:** https://vercel.com/docs
- **MongoDB Atlas:** https://docs.atlas.mongodb.com
- **Netlify dokumentácia:** https://docs.netlify.com

---

**Šťastné nasadenie! 🚀**

