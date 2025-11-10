# 🔍 Debug Login/Register - Krok za krokom

## ✅ Čo už vieme
- API URL je správne nastavená: `https://vas-backend.onrender.com/api`
- Frontend volá správnu URL

## 🔍 Čo teraz skontrolovať

### Krok 1: Skúste sa registrovať a pozrite sa do konzoly

1. **Otvorte Developer Tools** (F12) - už máte otvorené ✅
2. **Choďte do "Console" tab** - už ste tam ✅
3. **Skúste sa registrovať:**
   - Vyplňte formulár
   - Kliknite "Registrovať sa"
4. **Pozrite sa do konzoly:**
   - Mali by ste vidieť `API Error:` alebo iné chyby
   - Pošlite mi, čo vidíte

---

### Krok 2: Skontrolujte Network tab

1. **Choďte do "Network" tab** (v Developer Tools)
2. **Vymažte existujúce requesty** (ikona s X alebo Clear)
3. **Skúste sa registrovať:**
   - Vyplňte formulár
   - Kliknite "Registrovať sa"
4. **Pozrite sa na requesty:**
   - Mali by ste vidieť request `register` alebo `users/register`
   - **Kliknite na tento request**
   - **Pozrite sa na:**
     - **Status:** Aký je status code? (200, 400, 500, ERR_FAILED?)
     - **Request URL:** Mal by byť `https://vas-backend.onrender.com/api/users/register`
     - **Response:** Čo vracia backend?
5. **Pošlite mi screenshot** z Network tab

---

### Krok 3: Skontrolujte "11 Issues"

1. **Kliknite na "11 Issues"** (v hornej časti konzoly)
2. **Pozrite sa, aké sú to issues**
3. **Pošlite mi zoznam issues**

---

### Krok 4: Skontrolujte, či backend URL je správna

**V Render:**
- Vaša Render URL je: `https://eshop-backend-wkz2.onrender.com`
- Ale v konzole vidím: `https://vas-backend.onrender.com/api`

**Skontrolujte:**
1. **Choďte na:** https://vercel.com
2. **Váš projekt** → **Settings** → **Environment Variables**
3. **Skontrolujte `VITE_API_URL`:**
   - Mal by byť: `https://eshop-backend-wkz2.onrender.com/api` (vaša skutočná Render URL)
   - Nie: `https://vas-backend.onrender.com/api` (to je placeholder)

**Ak je nesprávna:**
1. Upravte `VITE_API_URL` na správnu Render URL
2. Uložte
3. Redeploynite (alebo počkajte na automatický redeploy)
4. Obnovte stránku (Ctrl + F5)

---

## 📋 Čo poslať

Po skúšaní registrácie pošlite:
1. **Screenshot z Console tab** (po kliknutí na "Registrovať")
2. **Screenshot z Network tab** (request `register` alebo `users/register`)
3. **Zoznam "11 Issues"** (ak sú tam dôležité chyby)
4. **Vašu skutočnú Render URL** (z Render dashboardu)

---

## 🎯 Očakávané správanie

**Ak všetko funguje:**
- V Network tab vidíte request `users/register` so statusom 200 alebo 400
- V Console vidíte `API Error:` len ak je chyba (napr. "Email už existuje")
- Tlačidlo zobrazí "Registrujem..." počas načítavania

**Ak niečo nefunguje:**
- V Network tab vidíte ERR_FAILED alebo CORS chybu
- V Console vidíte detailné chybové správy
- Tlačidlo zostane "Registrovať sa" (nič sa nedeje)

---

**Po týchto krokoch budeme vedieť, kde je problém!** ✅

