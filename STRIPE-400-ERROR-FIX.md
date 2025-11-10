# 🔧 Oprava Stripe 400 Error - /v1/account

## ❌ Problém
```
POST /v1/account
Status: 400 ERR
```

**Príčina:** Stripe SDK automaticky volá account endpoint pri inicializácii, ale kľúč môže byť neplatný alebo nesprávny.

---

## ✅ Riešenie

### Krok 1: Skontrolujte Render Environment Variables

1. **Choďte na:** https://dashboard.render.com
2. **Váš Web Service** → **Environment**
3. **Skontrolujte `STRIPE_SECRET_KEY`:**
   - Mal by začínať s `sk_live_` (pre Live) alebo `sk_test_` (pre Test)
   - Mal by mať aspoň 50 znakov
   - **Nesmie** obsahovať medzery alebo nové riadky
   - **Nesmie** obsahovať `YOUR_SECRET_KEY_HERE` alebo podobné placeholdery

**Správny formát:**
```
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
```

### Krok 2: Skontrolujte Render Logs

1. **Choďte na:** https://dashboard.render.com
2. **Váš Web Service** → **Logs**
3. **Hľadajte:**
   - `⚠️ STRIPE_SECRET_KEY nie je nastavený alebo má neplatnú hodnotu!`
   - `Stripe error:`
   - Detailné chybové správy

**Ak vidíte warning:**
- Stripe kľúč nie je správne nastavený
- Skontrolujte environment variable v Render

### Krok 3: Overte Stripe kľúč v Stripe Dashboard

1. **Choďte na:** https://dashboard.stripe.com
2. **Developers** → **API keys**
3. **Skontrolujte:**
   - Máte správny kľúč (Live vs Test)?
   - Je kľúč aktívny?
   - Skopírujte kľúč znovu a porovnajte s tým v Render

### Krok 4: Aktualizujte Stripe kľúč v Render

1. **Choďte na:** https://dashboard.render.com
2. **Váš Web Service** → **Environment**
3. **Upravte `STRIPE_SECRET_KEY`:**
   - Skopírujte kľúč z Stripe Dashboard (celý, bez medzier)
   - Vložte do Render
   - **Uistite sa, že je na jednom riadku** (žiadne nové riadky)
4. **Uložte**
5. **Render automaticky reštartuje**

---

## 🔍 Možné príčiny

### 1. Neplatný Stripe kľúč
- Kľúč je neplatný alebo expirovaný
- Kľúč je pre iný Stripe účet

### 2. Nesprávny formát kľúča
- Kľúč má medzery alebo nové riadky
- Kľúč je skrátený alebo neúplný

### 3. Stripe účet nie je aktívny
- Stripe účet nie je plne aktivovaný
- Stripe účet má obmedzenia

### 4. API verzia
- Stripe SDK používa staršiu API verziu
- Stripe API vyžaduje novšiu verziu

---

## 📋 Checklist

- [ ] Render: `STRIPE_SECRET_KEY` je nastavený a správny
- [ ] Render: Kľúč začína s `sk_live_` alebo `sk_test_`
- [ ] Render: Kľúč je na jednom riadku (žiadne medzery/nové riadky)
- [ ] Render Logs: Žiadne warnings o Stripe kľúči
- [ ] Stripe Dashboard: Kľúč je aktívny a správny
- [ ] Render: Služba reštartovaná po zmene kľúča

---

## 🚀 Rýchle riešenie

1. **Skopírujte Stripe Secret Key znovu** z Stripe Dashboard
2. **Vložte do Render Environment Variables** (celý, bez medzier)
3. **Uložte a počkajte na reštart**
4. **Skontrolujte Render Logs** - mali by ste vidieť, že Stripe je inicializovaný

---

## 🔍 Overenie

Po oprave skontrolujte Render Logs:

**Očakávaný výstup:**
```
Server beží na porte 5000
MongoDB pripojené
🌐 CORS nastavený pre origin: https://frappkove-maskrty.vercel.app
```

**Ak vidíte warning:**
```
⚠️ STRIPE_SECRET_KEY nie je nastavený alebo má neplatnú hodnotu!
```
→ Stripe kľúč nie je správne nastavený

---

**Po týchto krokoch by Stripe error mala zmiznúť!** ✅

**Ak stále vidíte chybu, pošlite:**
- Screenshot z Render Logs (posledných 50 riadkov)
- Screenshot z Render Environment Variables (STRIPE_SECRET_KEY - prvých 30 znakov)

