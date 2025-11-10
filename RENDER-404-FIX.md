# 🔧 Oprava 404 Not Found - Backend Routes

## ❌ Problém
```
POST https://eshop-backend-wkz2.onrender.com/users/register 404 (Not Found)
Cannot POST /users/register
```

**Príčina:** Backend route `/api/users/register` nie je dostupný alebo backend nebeží správne.

---

## ✅ Riešenie

### Krok 1: Skontrolujte Render Logs

1. **Choďte na:** https://dashboard.render.com
2. **Váš Web Service** → **Logs**
3. **Hľadajte:**
   - `Server beží na porte 5000` (alebo iný port)
   - `MongoDB pripojené`
   - `🌐 CORS nastavený pre origin: ...`
   - **Žiadne chyby** pri načítaní routes

**Ak vidíte chyby:**
- Pošlite mi screenshot z Render Logs
- Hľadajte chyby typu "Cannot find module" alebo "Route not found"

---

### Krok 2: Skontrolujte Render Root Directory

1. **Choďte na:** https://dashboard.render.com
2. **Váš Web Service** → **Settings**
3. **Skontrolujte "Root Directory":**
   - Mal by byť: `eshop/backend`
   - **Nie:** `/opt/render/project/src/eshop/backend`
   - **Nie:** `backend`

**Ak je nesprávne:**
1. Zmeňte na: `eshop/backend`
2. Uložte
3. Render automaticky redeployne

---

### Krok 3: Skontrolujte Build Command

1. **Choďte na:** https://dashboard.render.com
2. **Váš Web Service** → **Settings**
3. **Skontrolujte "Build Command":**
   - Mal by byť: `npm install` (alebo prázdne, ak sa nepoužíva)
   - **Nie:** `cd eshop/backend && npm install`

---

### Krok 4: Skontrolujte Start Command

1. **Choďte na:** https://dashboard.render.com
2. **Váš Web Service** → **Settings**
3. **Skontrolujte "Start Command":**
   - Mal by byť: `npm start`
   - **Nie:** `cd eshop/backend && npm start`

---

### Krok 5: Test Backend Health Check

1. **Otvorte v prehliadači:**
   ```
   https://eshop-backend-wkz2.onrender.com/api/health
   ```

2. **Očakávaný výsledok:**
   ```json
   {
     "status": "OK",
     "message": "Backend beží"
   }
   ```

**Ak vidíte 404:**
- Backend nebeží správne alebo Root Directory je nesprávny

**Ak vidíte správnu odpoveď:**
- Backend beží, ale routes nie sú správne nastavené

---

### Krok 6: Skontrolujte, či sú routes správne načítané

V Render Logs by ste mali vidieť:
```
Server beží na porte 5000
MongoDB pripojené
🌐 CORS nastavený pre origin: https://frappkove-maskrty.vercel.app
```

**Ak nevidíte tieto logy:**
- Backend sa nespustil správne
- Skontrolujte Root Directory a Start Command

---

## 🔍 Debugging

### Test 1: Health Check
```bash
curl https://eshop-backend-wkz2.onrender.com/api/health
```

**Očakávaný výsledok:**
```json
{"status":"OK","message":"Backend beží"}
```

### Test 2: Register Endpoint
```bash
curl -X POST https://eshop-backend-wkz2.onrender.com/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'
```

**Očakávaný výsledok:**
- Buď úspešná registrácia (201)
- Alebo chyba validácie (400)
- **Nie:** 404 Not Found

---

## 📋 Checklist

- [ ] Render: Root Directory = `eshop/backend`
- [ ] Render: Build Command = `npm install` (alebo prázdne)
- [ ] Render: Start Command = `npm start`
- [ ] Render Logs: Vidíte "Server beží na porte..."
- [ ] Render Logs: Vidíte "MongoDB pripojené"
- [ ] Health Check: `https://eshop-backend-wkz2.onrender.com/api/health` vracia JSON
- [ ] Register Endpoint: `https://eshop-backend-wkz2.onrender.com/api/users/register` nevrátil 404

---

## 🚀 Rýchle riešenie

Ak nič z vyššie uvedeného nepomôže:

1. **Skontrolujte Render Logs** - pošlite mi screenshot
2. **Skontrolujte Root Directory** - musí byť `eshop/backend`
3. **Reštartujte Render službu:**
   - Manual Deploy → Deploy latest commit

---

**Po týchto krokoch by 404 chyba mala zmiznúť!** ✅

