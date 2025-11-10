# 🇸🇰 Nasadenie na slovenských hostingoch

Kompletný návod na nasadenie e-shopu na slovenských hostingoch (WebSupport, Platon) pre optimálny výkon pre slovenských zákazníkov.

---

## 🎯 Prečo slovenské hostingy?

### Výhody:
- ✅ **Najnižšia latencia** - Servery na Slovensku = najrýchlejšie pre slovenských zákazníkov (5-10ms)
- ✅ **Slovenská podpora** - Podpora v slovenčine, rozumejú miestnym potrebám
- ✅ **GDPR compliance** - Dáta zostávajú na Slovensku
- ✅ **Lokálne platobné brány** - Jednoduchšia integrácia s TatraPay, VÚB, atď.
- ✅ **Plná kontrola** - VPS = môžete robiť čokoľvek

### Nevýhody:
- ⚠️ Vyžaduje technické znalosti (Linux, SSH, Nginx, SSL)
- ⚠️ Vyššie náklady ako zdarma tier cloud platforiem
- ⚠️ Musíte sa starať o údržbu a bezpečnosť servera
- ⚠️ Musíte sa starať o zálohy

---

## 📋 Prehľad riešení

### Možnosť 1: VPS (plná kontrola)
- **Backend:** WebSupport VPS alebo Platon VPS
- **Frontend:** Rovnaký VPS (Nginx reverse proxy)
- **Database:** MongoDB Atlas (Europe) alebo lokálna MongoDB

### Možnosť 2: Hybrid (odporúčané)
- **Backend:** WebSupport VPS alebo Platon VPS
- **Frontend:** WebSupport/Platon webhosting (statický hosting)
- **Database:** MongoDB Atlas (Europe - Frankfurt)

---

## 1️⃣ WebSupport VPS - Backend Setup

### Krok 1: Vytvorenie VPS
1. Choďte na: https://www.websupport.sk/vps
2. Vyberte VPS balík:
   - **Minimálne:** 2GB RAM, 2 CPU, 40GB disk (pre začiatok)
   - **Odporúčané:** 4GB RAM, 4 CPU, 80GB disk (pre produkciu)
3. Vyberte operačný systém: **Ubuntu Server 22.04 LTS**
4. Vytvorte VPS a počkajte na aktiváciu

### Krok 2: Pripojenie cez SSH
```bash
ssh root@vas-server-ip
# alebo
ssh root@vas-server.websupport.sk
```

### Krok 3: Aktualizácia systému
```bash
apt update && apt upgrade -y
```

### Krok 4: Inštalácia Node.js
```bash
# Inštalácia Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Overenie
node --version
npm --version
```

### Krok 5: Inštalácia PM2 (process manager)
```bash
npm install -g pm2
```

### Krok 6: Inštalácia Nginx
```bash
apt install -y nginx
systemctl start nginx
systemctl enable nginx
```

### Krok 7: Inštalácia MongoDB (voliteľné - alebo použite Atlas)
```bash
# Ak chcete lokálnu MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list
apt update
apt install -y mongodb-org
systemctl start mongod
systemctl enable mongod
```

### Krok 8: Upload kódu
```bash
# Vytvorte priečinok pre aplikáciu
mkdir -p /var/www/eshop-backend
cd /var/www/eshop-backend

# Upload kódu (použite Git alebo SCP)
# Možnosť 1: Git
git clone https://github.com/vas-repo/eshop.git .
cd backend

# Možnosť 2: SCP (z lokálneho počítača)
# scp -r eshop/backend/* root@vas-server:/var/www/eshop-backend/
```

### Krok 9: Inštalácia závislostí
```bash
cd /var/www/eshop-backend
npm install --production
```

### Krok 10: Nastavenie environment variables
```bash
nano .env
```

Pridajte:
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://... alebo mongodb://localhost:27017/eshop
JWT_SECRET=vas-very-strong-secret-key
STRIPE_SECRET_KEY=sk_live_...
FRONTEND_URL=https://vas-frontend.websupport.sk
CORS_ORIGIN=https://vas-frontend.websupport.sk
```

### Krok 11: Spustenie s PM2
```bash
pm2 start src/index.js --name eshop-backend
pm2 save
pm2 startup
```

### Krok 12: Konfigurácia Nginx
```bash
nano /etc/nginx/sites-available/eshop-backend
```

Pridajte:
```nginx
server {
    listen 80;
    server_name api.vasadomena.sk;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Aktivujte:
```bash
ln -s /etc/nginx/sites-available/eshop-backend /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### Krok 13: SSL certifikát (Let's Encrypt)
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d api.vasadomena.sk
```

---

## 2️⃣ WebSupport Webhosting - Frontend Setup

### Krok 1: Vytvorenie webhostingu
1. Choďte na: https://www.websupport.sk/webhosting
2. Vyberte hosting balík
3. Vytvorte účet

### Krok 2: Build frontendu
```bash
cd eshop/frontend
npm run build
```

### Krok 3: Upload build súborov
1. Prihláste sa do WebSupport administrácie
2. Choďte do **File Manager**
3. Nahrajte všetky súbory z `dist/` priečinka do `public_html/`

### Krok 4: Nastavenie .htaccess (pre Apache)
Vytvorte `.htaccess` v `public_html/`:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Krok 5: Environment variables
Vytvorte `public_html/.env.production` alebo nastavte v build:
```bash
# Pred buildom
export VITE_API_URL=https://api.vasadomena.sk/api
export VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
npm run build
```

### Krok 6: SSL certifikát
- WebSupport obvykle poskytuje SSL automaticky
- Alebo použite Let's Encrypt cez administráciu

---

## 3️⃣ Platon VPS - Alternatíva

Postup je podobný ako WebSupport:

1. Choďte na: https://www.platon.net
2. Vyberte VPS balík
3. Postupujte podľa krokov 2-13 z WebSupport sekcie

---

## 4️⃣ Hybrid riešenie (Odporúčané)

### Backend: VPS (WebSupport/Platon)
- Plná kontrola
- Node.js, PM2, Nginx
- SSL certifikát

### Frontend: Webhosting (WebSupport/Platon)
- Jednoduché nahranie statických súborov
- Nízke náklady
- Automatický SSL

### Database: MongoDB Atlas (Europe)
- Cloud riešenie
- Automatické zálohy
- Škálovateľnosť

**Výhody:**
- ✅ Najnižšia latencia (backend aj frontend na Slovensku)
- ✅ Nízke náklady (frontend na webhostingu je lacný)
- ✅ Jednoduchá údržba (frontend = len statické súbory)

---

## 5️⃣ Porovnanie cien

| Riešenie | Backend | Frontend | Database | Celkom/mesiac |
|----------|---------|----------|----------|---------------|
| **VPS + Webhosting** | 20€ | 5€ | 0€ (Atlas Free) | ~25€ |
| **VPS + VPS** | 20€ | 20€ | 0€ (Atlas Free) | ~40€ |
| **Railway + Vercel** | 0€ (Free tier) | 0€ (Free tier) | 0€ (Atlas Free) | **0€** |

**Pre začiatok:** Railway + Vercel (zdarma)  
**Pre produkciu:** VPS + Webhosting (optimálne pre Slovensko)

---

## 6️⃣ Monitoring a údržba

### PM2 Monitoring
```bash
pm2 status
pm2 logs eshop-backend
pm2 monit
```

### Nginx Logy
```bash
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### Automatické zálohy
```bash
# Vytvorte backup script
nano /root/backup.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/root/backups"
mkdir -p $BACKUP_DIR

# Backup MongoDB (ak lokálna)
mongodump --out $BACKUP_DIR/mongodb_$DATE

# Backup aplikácie
tar -czf $BACKUP_DIR/app_$DATE.tar.gz /var/www/eshop-backend

# Odstráňte staré backupy (staršie ako 7 dní)
find $BACKUP_DIR -type f -mtime +7 -delete
```

```bash
chmod +x /root/backup.sh
# Pridajte do crontab (denné backupy o 2:00)
crontab -e
# Pridajte: 0 2 * * * /root/backup.sh
```

---

## 7️⃣ Bezpečnosť

### Firewall (UFW)
```bash
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw enable
```

### Aktualizácie
```bash
# Automatické bezpečnostné aktualizácie
apt install -y unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades
```

### Fail2Ban (ochrana pred útokmi)
```bash
apt install -y fail2ban
systemctl enable fail2ban
systemctl start fail2ban
```

---

## 8️⃣ Troubleshooting

### Backend nebeží
```bash
pm2 status
pm2 logs eshop-backend
pm2 restart eshop-backend
```

### Nginx nefunguje
```bash
nginx -t
systemctl status nginx
tail -f /var/log/nginx/error.log
```

### MongoDB nefunguje
```bash
systemctl status mongod
mongosh
```

---

## 9️⃣ Odporúčania

### Pre začiatok:
- ✅ Použite **Railway + Vercel** (zdarma, jednoduché)
- ✅ MongoDB Atlas (Europe - Frankfurt)

### Pre produkciu:
- ✅ **WebSupport VPS** pre backend
- ✅ **WebSupport Webhosting** pre frontend
- ✅ MongoDB Atlas (Europe - Frankfurt)
- ✅ SSL certifikáty (Let's Encrypt)
- ✅ Automatické zálohy
- ✅ Monitoring (PM2, Nginx logy)

---

## ✅ Checklist

- [ ] VPS vytvorený a aktivovaný
- [ ] Node.js nainštalovaný
- [ ] PM2 nainštalovaný a konfigurovaný
- [ ] Nginx nainštalovaný a konfigurovaný
- [ ] SSL certifikát nastavený
- [ ] Backend deploynutý a beží
- [ ] Frontend nahraný na webhosting
- [ ] Environment variables nastavené
- [ ] Firewall konfigurovaný
- [ ] Zálohy nastavené
- [ ] Monitoring nastavený

---

## 🎉 Hotovo!

Váš e-shop je teraz na slovenských serveroch s najnižšou latenciou pre slovenských zákazníkov! 🇸🇰

**Očakávaný výkon:**
- ⚡ Latencia: 5-10ms (najlepšia možná)
- ⚡ Načítavanie stránky: < 500ms
- ⚡ API odpoveď: < 20ms

---

**Viac informácií:**
- **DEPLOYMENT-EUROPE.md** - Cloud riešenia (Railway, Vercel)
- **DEPLOYMENT-GUIDE.md** - Všeobecný návod

