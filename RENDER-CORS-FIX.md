# 🔧 Render CORS Fix - Detailný návod

## ❌ Problém
Frontend už volá správnu URL (`https://vas-backend.onrender.com`), ale backend nevracia CORS hlavičky:
```
Access to XMLHttpRequest at 'https://vas-backend.onrender.com/api/products' 
from origin 'https://frappkove-maskrty.vercel.app' 
has been blocked by CORS policy: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

---

## ✅ Riešenie

### Krok 1: Nastavte Environment Variables v Render

1. **Choďte na:** https://dashboard.render.com
2. **Kliknite na váš Web Service** (backend)
3. **Choďte do sekcie "Environment"**
4. **Pridajte/upravte tieto premenné:**

   ```
   Key: FRONTEND_URL
   Value: https://frappkove-maskrty.vercel.app
   ```

   ```
   Key: CORS_ORIGIN
   Value: https://frappkove-maskrty.vercel.app
   ```

   ⚠️ **Dôležité:**
   - URL musí byť **presne** rovnaká (žiadne medzery, správne HTTPS)
   - **Bez** `/api` na konci
   - **Bez** trailing slash (`/`)

5. **Kliknite "Save Changes"**

---

### Krok 2: Reštartujte Render službu

**Možnosť A: Automatický reštart**
- Render automaticky reštartuje po uložení environment variables
- Počkajte 30-60 sekúnd

**Možnosť B: Manuálny reštart**
1. Choďte do **"Manual Deploy"** sekcie
2. Kliknite **"Deploy latest commit"**
3. Alebo kliknite **"Restart"** (ak je dostupné)

---

### Krok 3: Skontrolujte Render Logs

1. Choďte do **"Logs"** sekcie
2. **Hľadajte:**
   ```
   🌐 CORS nastavený pre origin: https://frappkove-maskrty.vercel.app
   🌐 NODE_ENV: production
   Server beží na porte 10000
   MongoDB pripojené
   ```

3. **Ak vidíte:**
   ```
   🌐 CORS nastavený pre origin: http://localhost:3000
   ```
   → Environment variables nie sú správne nastavené!

---

### Krok 4: Overte v Network Tab

1. Otvorte Developer Tools (F12)
2. Choďte do **"Network"** tab
3. Skúste načítať produkty
4. **Kliknite na request** `api/products`
5. **Choďte do "Headers"** sekcie
6. **Hľadajte v "Response Headers":**
   ```
   Access-Control-Allow-Origin: https://frappkove-maskrty.vercel.app
   ```

7. **Ak tento header chýba:**
   → Render ešte nereštartoval alebo environment variables nie sú správne

---

## 🔍 Troubleshooting

### Problém 1: Stále vidím `localhost:3000` v logoch

**Riešenie:**
1. Skontrolujte, či sú environment variables **presne** správne
2. Skontrolujte, či nie sú medzery na začiatku/konci
3. Skontrolujte, či je HTTPS (nie HTTP)
4. Reštartujte Render službu manuálne

### Problém 2: Environment variables sú nastavené, ale stále nefunguje

**Riešenie:**
1. Skontrolujte Render logs - či sú nejaké chyby
2. Skontrolujte, či Render služba beží (nie je paused)
3. Skontrolujte, či je správny Root Directory nastavený (`eshop/backend`)

### Problém 3: CORS hlavička chýba v Response Headers

**Možné príčiny:**
- Helmet blokuje CORS hlavičky
- CORS middleware nie je správne nastavený
- Render ešte nereštartoval

**Riešenie:**
- Kód už má opravu pre Helmet
- Reštartujte Render službu
- Skontrolujte logs

---

## 📋 Checklist

- [ ] Render: `FRONTEND_URL` = `https://frappkove-maskrty.vercel.app`
- [ ] Render: `CORS_ORIGIN` = `https://frappkove-maskrty.vercel.app`
- [ ] Render: Environment variables uložené
- [ ] Render: Služba reštartovaná (počkajte 30-60 sekúnd)
- [ ] Render Logs: Vidíte správny origin (`https://frappkove-maskrty.vercel.app`)
- [ ] Network Tab: Vidíte `Access-Control-Allow-Origin` header
- [ ] Browser: Cache vymazaná (Ctrl + Shift + Delete)
- [ ] Browser: Stránka obnovená (Ctrl + F5)

---

## 🚀 Rýchly test

Po nastavení všetkého, skúste:

1. Otvorte: https://frappkove-maskrty.vercel.app
2. Otvorte Developer Tools (F12)
3. Choďte do Console tab
4. Skúste sa registrovať alebo načítať produkty
5. **Ak nie sú CORS chyby** → Funguje! ✅
6. **Ak sú stále CORS chyby** → Skontrolujte Render logs a environment variables

---

## 📞 Ak stále nefunguje

Pošlite:
1. **Screenshot z Render Environment Variables** (celá sekcia)
2. **Screenshot z Render Logs** (posledných 50 riadkov)
3. **Screenshot z Network Tab** (request `api/products` → Headers)
4. **Vašu Render URL** (napr. `https://vas-backend.onrender.com`)

---

**Po týchto krokoch by malo fungovať!** ✅

