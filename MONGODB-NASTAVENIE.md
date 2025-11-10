# ✅ MongoDB Connection String - Nastavenie

## 🔗 Váš Connection String

Máte connection string:
```
mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/?appName=Frappkovemaskrty
```

## ⚠️ Čo treba upraviť:

1. **Pridať názov databázy** (`/eshop` pred `?`)
2. **Pridať správne parametre** (`retryWrites=true&w=majority`)

---

## ✅ Správny Connection String:

```
mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/eshop?retryWrites=true&w=majority
```

**Zmeny:**
- ✅ Pridané `/eshop` (názov databázy)
- ✅ Zmenené `?appName=Frappkovemaskrty` na `?retryWrites=true&w=majority`

---

## 📝 Ako nastaviť v backend/.env

### Krok 1: Otvorte súbor
Otvorte súbor: `eshop/backend/.env`

### Krok 2: Nastavte MONGODB_URI
Nájdite riadok s `MONGODB_URI` a zmeňte ho na:

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/eshop?retryWrites=true&w=majority
```

**Alebo ak neexistuje, pridajte ho:**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/eshop?retryWrites=true&w=majority
JWT_SECRET=moj-tajny-kluc-zmenit-v-produkcii
STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY_HERE
FRONTEND_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000
```

### Krok 3: Uložte súbor
Uložte súbor (Ctrl + S)

### Krok 4: Reštartujte backend
```powershell
# Zastavte backend (Ctrl + C)
# Spustite znova
cd eshop/backend
npm run dev
```

---

## ✅ Overenie

Po reštarte by ste mali vidieť v konzole:
```
MongoDB pripojené
```

**Ak vidíte chybu:**
- Skontrolujte, či je connection string správne skopírovaný
- Skontrolujte, či máte Network Access nastavené v MongoDB Atlas (0.0.0.0/0)

---

## 🔒 Bezpečnosť

**⚠️ Dôležité:**
- ✅ `.env` súbor je v `.gitignore` (nebude sa commitovať)
- ✅ Heslo je v connection stringu - **NIKDY** ho necommitnite!
- ✅ Pre produkciu použite iné heslo

---

## 🚀 Pre produkciu (Render/Railway)

Keď budete nasadzovať na Render/Railway, pridajte tento connection string do Environment Variables:

**V Render:**
1. Choďte do Settings → Environment
2. Pridajte:
   - Key: `MONGODB_URI`
   - Value: `mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/eshop?retryWrites=true&w=majority`

**V Railway:**
1. Choďte do Variables tab
2. Pridajte:
   - Key: `MONGODB_URI`
   - Value: `mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/eshop?retryWrites=true&w=majority`

---

## 📋 Kompletný .env súbor (príklad)

```env
# Server
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

---

**Hotovo! Teraz by MongoDB malo fungovať!** ✅

