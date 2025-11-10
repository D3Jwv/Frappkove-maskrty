# 🔧 Oprava CORS - Trailing Slash problém

## ❌ Problém
```
Access-Control-Allow-Origin header has a value 'https://frappkove-maskrty.vercel.app/' 
that is not equal to the supplied origin 'https://frappkove-maskrty.vercel.app'
```

**Príčina:** V Render environment variables je `FRONTEND_URL` s trailing slash (`/`), ale origin prichádza bez trailing slash.

---

## ✅ Riešenie 1: Oprava v Render (najjednoduchšie)

### Krok 1: Skontrolujte Render Environment Variables

1. **Choďte na:** https://dashboard.render.com
2. **Váš Web Service** → **Environment**
3. **Skontrolujte:**
   - `FRONTEND_URL` = `https://frappkove-maskrty.vercel.app` (bez `/` na konci!)
   - `CORS_ORIGIN` = `https://frappkove-maskrty.vercel.app` (bez `/` na konci!)

**⚠️ DÔLEŽITÉ:** URL **NESMIE** končiť s `/`!

**Správne:**
```
FRONTEND_URL=https://frappkove-maskrty.vercel.app
```

**Nesprávne:**
```
FRONTEND_URL=https://frappkove-maskrty.vercel.app/
```

### Krok 2: Uložte a reštartujte

1. **Uložte zmeny**
2. **Render automaticky reštartuje** (počkajte 30-60 sekúnd)
3. **Skontrolujte Render Logs:**
   - Mali by ste vidieť: `🌐 CORS nastavený pre origin: https://frappkove-maskrty.vercel.app` (bez `/`)

---

## ✅ Riešenie 2: Oprava v kóde (už hotové)

Kód už má normalizáciu, ktorá odstraňuje trailing slash. Po commitnutí a pushnutí by to malo fungovať aj s trailing slash v environment variables.

---

## 📋 Checklist

- [ ] Render: `FRONTEND_URL` = `https://frappkove-maskrty.vercel.app` (bez `/`)
- [ ] Render: `CORS_ORIGIN` = `https://frappkove-maskrty.vercel.app` (bez `/`)
- [ ] Render: Environment variables uložené
- [ ] Render: Služba reštartovaná
- [ ] Render Logs: Vidíte správny origin (bez `/`)
- [ ] Browser: Cache vymazaná (Ctrl + Shift + Delete)
- [ ] Browser: Stránka obnovená (Ctrl + F5)
- [ ] Network Tab: Vidíte `Access-Control-Allow-Origin` header
- [ ] Console: Žiadne CORS chyby

---

## 🔍 Overenie

Po oprave skontrolujte:

1. **Render Logs:**
   ```
   🌐 CORS nastavený pre origin: https://frappkove-maskrty.vercel.app
   ```

2. **Network Tab:**
   - Request `products` → Headers → Response Headers
   - `Access-Control-Allow-Origin: https://frappkove-maskrty.vercel.app` (bez `/`)

3. **Console:**
   - Žiadne CORS chyby ✅

---

**Po týchto krokoch by CORS chyba mala zmiznúť!** ✅

