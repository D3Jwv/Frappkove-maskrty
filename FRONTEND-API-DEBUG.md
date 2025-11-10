# 🔧 Debug Frontend API - Login/Register nefunguje

## ❌ Problém
Po kliknutí na "Registrovať" alebo "Prihlásiť" sa nič nestane.

## 🔍 Možné príčiny

### 1. Frontend volá stále `localhost:5000` namiesto Render URL

**Kontrola:**
1. Otvorte Developer Tools (F12)
2. Choďte do **"Network"** tab
3. Skúste sa registrovať
4. **Skontrolujte:**
   - Kam smeruje request? (mal by byť Render URL, nie localhost)
   - Aký je status code? (mal by byť 200 alebo 400, nie ERR_FAILED)

**Riešenie:**
- Skontrolujte, či je `VITE_API_URL` nastavený v Vercel
- Skontrolujte, či Vercel redeployol po nastavení environment variable

---

### 2. Chyby nie sú zobrazované

**Kontrola:**
- Otvorte **Console** tab (F12)
- Skúste sa registrovať
- **Hľadajte:** Červené chyby v konzole

**Riešenie:**
- Pridajte lepšie error handling (už je v kóde, ale možno nie je viditeľný)

---

### 3. CORS problém

**Kontrola:**
- Otvorte **Console** tab (F12)
- **Hľadajte:** CORS chyby

**Riešenie:**
- Skontrolujte Render CORS nastavenia (už by mali byť správne)

---

## ✅ Riešenie

### Krok 1: Skontrolujte Vercel Environment Variables

1. **Choďte na:** https://vercel.com
2. **Váš projekt** → **Settings** → **Environment Variables**
3. **Skontrolujte:**
   - ✅ Existuje `VITE_API_URL`?
   - ✅ Je hodnota `https://eshop-backend-wkz2.onrender.com/api` (vaša Render URL)?
   - ✅ Je nastavené pre **Production** environment?

**Ak nie je nastavené:**
1. Kliknite **"Add New"**
2. Zadajte:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://eshop-backend-wkz2.onrender.com/api`
   - **Environment:** ✅ Production
3. Kliknite **"Save"**
4. **Redeploy:** Choďte do **"Deployments"** → **"Redeploy"**

---

### Krok 2: Skontrolujte Network Tab

1. Otvorte Developer Tools (F12)
2. Choďte do **"Network"** tab
3. Skúste sa registrovať
4. **Kliknite na request** `register` alebo `login`
5. **Skontrolujte:**
   - **Request URL:** Mal by byť Render URL (nie localhost)
   - **Status:** Mal by byť 200 (úspech) alebo 400/500 (chyba)
   - **Response:** Mal by obsahovať JSON s chybovou správou alebo tokenom

---

### Krok 3: Skontrolujte Console Tab

1. Otvorte Developer Tools (F12)
2. Choďte do **"Console"** tab
3. Skúste sa registrovať
4. **Hľadajte:**
   - Červené chyby
   - CORS chyby
   - Network chyby

---

### Krok 4: Skontrolujte Render Logs

1. **Choďte na:** https://dashboard.render.com
2. **Váš Web Service** → **Logs**
3. **Skúste sa registrovať** z frontendu
4. **Hľadajte:**
   - Requesty z frontendu
   - Chyby pri spracovaní requestov
   - CORS chyby

---

## 🔧 Dočasné riešenie: Pridať debug logging

Ak chcete vidieť, čo sa deje, môžeme pridať console.log do Login/Register komponentov.

---

## 📋 Checklist

- [ ] Vercel: `VITE_API_URL` nastavený a správny
- [ ] Vercel: Redeploynutý (počkajte 1-2 minúty)
- [ ] Network Tab: Frontend volá Render URL (nie localhost)
- [ ] Console Tab: Žiadne chyby
- [ ] Render Logs: Vidíte requesty z frontendu
- [ ] Browser cache vymazaná (Ctrl + Shift + Delete)

---

**Po týchto krokoch by login/register mal fungovať!** ✅

