# 🔧 CORS Troubleshooting - Detailný postup

## ❌ Problém: Stále vidíte localhost aj po oprave

Ak ste už nastavili environment variables, ale stále vidíte chybu, postupujte podľa tohto návodu.

---

## 🔍 Krok 1: Overte Vercel Environment Variables

### 1.1 Skontrolujte, či sú nastavené
1. Choďte na: https://vercel.com
2. Kliknite na váš projekt (`frappkove-maskrty`)
3. Choďte do **"Settings" → "Environment Variables"**
4. **Skontrolujte:**
   - ✅ Existuje `VITE_API_URL`?
   - ✅ Je hodnota `https://vas-backend.onrender.com/api` (nie localhost)?
   - ✅ Je nastavené pre **Production** environment?

### 1.2 Ak nie je nastavené:
1. Kliknite **"Add New"**
2. Zadajte:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://vas-backend.onrender.com/api` (nahraďte vašou Render URL)
   - **Environment:** ✅ Production (a Development ak chcete)
3. Kliknite **"Save"**

### 1.3 Ak je nastavené, ale stále nefunguje:
**Možné príčiny:**
- Vercel ešte neredeployol
- Cache problém
- Starý build

**Riešenie:**
1. Choďte do **"Deployments"** tab
2. Kliknite na **"Redeploy"** pri najnovšom deploymente
3. Alebo vytvorte nový commit a pushnite do GitHubu

---

## 🔍 Krok 2: Overte Render Environment Variables

### 2.1 Skontrolujte CORS nastavenia
1. Choďte na: https://dashboard.render.com
2. Kliknite na váš Web Service
3. Choďte do **"Environment"** sekcie
4. **Skontrolujte:**
   - ✅ Existuje `FRONTEND_URL`?
   - ✅ Existuje `CORS_ORIGIN`?
   - ✅ Sú hodnoty `https://frappkove-maskrty.vercel.app` (nie localhost)?
   - ✅ Sú URL presne rovnaké (žiadne medzery, správne HTTPS)?

### 2.2 Ak nie sú nastavené:
1. Kliknite **"Add Environment Variable"**
2. Pridajte:
   - **Key:** `FRONTEND_URL`
   - **Value:** `https://frappkove-maskrty.vercel.app`
3. Pridajte:
   - **Key:** `CORS_ORIGIN`
   - **Value:** `https://frappkove-maskrty.vercel.app`
4. Kliknite **"Save Changes"**

### 2.3 Ak sú nastavené, ale stále nefunguje:
**Možné príčiny:**
- Render nereštartoval službu
- Chyba v kóde

**Riešenie:**
1. Skontrolujte Render **Logs** - či sú nejaké chyby
2. Manuálne reštartujte službu:
   - Choďte do **"Manual Deploy"** → **"Deploy latest commit"**
   - Alebo kliknite **"Restart"** (ak je dostupné)

---

## 🔍 Krok 3: Overte Build a Cache

### 3.1 Vercel Build Cache
**Problém:** Vercel môže používať starý build s cache.

**Riešenie:**
1. Choďte do Vercel → **"Deployments"**
2. Kliknite na **"..."** pri najnovšom deploymente
3. Vyberte **"Redeploy"**
4. Alebo vytvorte nový commit:
   ```bash
   # V GitHub Desktop alebo termináli
   git commit --allow-empty -m "Force redeploy"
   git push
   ```

### 3.2 Browser Cache
**Problém:** Prehliadač môže mať cache starého JavaScriptu.

**Riešenie:**
1. Otvorte Developer Tools (F12)
2. Kliknite pravým na tlačidlo obnovenia
3. Vyberte **"Empty Cache and Hard Reload"**
4. Alebo: Ctrl + Shift + Delete → Vymažte cache
5. Obnovte stránku (Ctrl + F5)

---

## 🔍 Krok 4: Overte v Network Tab

### 4.1 Skontrolujte, kam frontend volá
1. Otvorte Developer Tools (F12)
2. Choďte do **"Network"** tab
3. Skúste sa registrovať
4. **Skontrolujte:**
   - Kam smeruje request? (mal by byť Render URL, nie localhost)
   - Aký je status code? (mal by byť 200, nie ERR_FAILED)

### 4.2 Ak stále vidíte localhost:
**Problém:** Vercel build neobsahuje správne environment variables.

**Riešenie:**
1. Skontrolujte Vercel build logs:
   - Choďte do Vercel → **"Deployments"**
   - Kliknite na deployment
   - Pozrite sa na **"Build Logs"**
   - Hľadajte `VITE_API_URL` - mal by byť viditeľný

2. Skontrolujte, či je `VITE_API_URL` správne nastavený:
   - V Environment Variables musí byť pre **Production**
   - Hodnota musí byť Render URL + `/api`

---

## 🔍 Krok 5: Overte Render Logs

### 5.1 Skontrolujte CORS v logoch
1. Choďte do Render → **"Logs"**
2. Skúste sa registrovať z frontendu
3. **Hľadajte:**
   - CORS chyby
   - Requesty z frontendu
   - Chyby pri spracovaní requestov

### 5.2 Ak vidíte CORS chyby v logoch:
**Problém:** Backend stále používa staré CORS nastavenia.

**Riešenie:**
1. Skontrolujte, či sú environment variables správne nastavené
2. Reštartujte Render službu
3. Skontrolujte, či `process.env.CORS_ORIGIN` obsahuje správnu hodnotu

---

## 🔍 Krok 6: Manuálne overenie v kóde

### 6.1 Skontrolujte api.js
Otvorte `eshop/frontend/src/services/api.js` a skontrolujte:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

**Problém:** Ak `VITE_API_URL` nie je nastavený, použije sa fallback `localhost:5000`.

**Riešenie:**
- Uistite sa, že `VITE_API_URL` je nastavený v Vercel
- Vercel musí redeploynúť, aby sa zmena prejavila

### 6.2 Skontrolujte backend CORS
Otvorte `eshop/backend/src/index.js` a skontrolujte:

```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL || process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};
```

**Problém:** Ak environment variables nie sú nastavené, použije sa fallback `localhost:3000`.

**Riešenie:**
- Uistite sa, že `FRONTEND_URL` alebo `CORS_ORIGIN` sú nastavené v Render
- Render musí reštartovať službu

---

## 🚀 Kompletný postup opravy

### Krok 1: Vercel
1. ✅ Skontrolujte Environment Variables
2. ✅ Nastavte `VITE_API_URL` = `https://vas-backend.onrender.com/api`
3. ✅ Uložte
4. ✅ Redeploy (automaticky alebo manuálne)

### Krok 2: Render
1. ✅ Skontrolujte Environment Variables
2. ✅ Nastavte `FRONTEND_URL` = `https://frappkove-maskrty.vercel.app`
3. ✅ Nastavte `CORS_ORIGIN` = `https://frappkove-maskrty.vercel.app`
4. ✅ Uložte
5. ✅ Reštartujte službu (automaticky alebo manuálne)

### Krok 3: Cache
1. ✅ Vymažte browser cache
2. ✅ Obnovte stránku (Ctrl + F5)
3. ✅ Skontrolujte Network tab

### Krok 4: Overenie
1. ✅ Skontrolujte, či frontend volá Render URL (nie localhost)
2. ✅ Skontrolujte, či backend loguje requesty z Vercel URL
3. ✅ Skontrolujte, či nie sú CORS chyby

---

## 📋 Checklist

- [ ] Vercel: `VITE_API_URL` nastavený a správny
- [ ] Vercel: Redeploynutý (počkajte 1-2 minúty)
- [ ] Render: `FRONTEND_URL` nastavený a správny
- [ ] Render: `CORS_ORIGIN` nastavený a správny
- [ ] Render: Reštartovaný (počkajte 30 sekúnd)
- [ ] Browser cache vymazaná
- [ ] Stránka obnovená (Ctrl + F5)
- [ ] Network tab skontrolovaný (žiadne localhost requesty)
- [ ] Render logs skontrolované (žiadne CORS chyby)

---

## 🔧 Alternatívne riešenie: Dočasne povoliť všetky originy

**⚠️ POZOR: Len pre testovanie! Pre produkciu použite špecifický origin!**

### V Render Environment Variables:
```env
CORS_ORIGIN=*
```

Alebo upravte `backend/src/index.js`:
```javascript
const corsOptions = {
  origin: '*', // ⚠️ Len pre testovanie!
  credentials: true,
  optionsSuccessStatus: 200
};
```

**Toto NEPOUŽÍVAJTE v produkcii!** Je to bezpečnostné riziko.

---

## 📞 Ak stále nefunguje

1. **Skontrolujte Vercel build logs:**
   - Choďte do Deployments → Build Logs
   - Hľadajte `VITE_API_URL` - mal by byť viditeľný v build procese

2. **Skontrolujte Render logs:**
   - Choďte do Logs
   - Hľadajte CORS chyby alebo requesty

3. **Skontrolujte Network tab:**
   - Ktorá URL sa používa? (mal by byť Render, nie localhost)
   - Aký je status code?

4. **Skontrolujte Environment Variables:**
   - Sú presne správne? (žiadne medzery, správne HTTPS)
   - Sú pre správny environment? (Production)

---

**Po týchto krokoch by malo fungovať!** ✅

**Ak stále máte problémy, pošlite:**
- Screenshot z Vercel Environment Variables
- Screenshot z Render Environment Variables
- Screenshot z Network tab (F12)
- Render logs (posledných 50 riadkov)


