# Stripe platby - Konfigurácia a testovanie

## 1. Nastavenie Stripe kľúčov

### Získanie kľúčov

1. Choďte na: **https://dashboard.stripe.com/test/apikeys**
2. Skopírujte **Publishable key** (začína s `pk_test_...`)
3. Skopírujte **Secret key** (začína s `sk_test_...`)

### Backend konfigurácia

**Pridajte do `backend/.env`:**
```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...  # Pre produkciu
```

### Frontend konfigurácia

**Vytvorte `frontend/.env`:**
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

**Dôležité:** Po pridaní kľúčov reštartujte backend server!

## 2. Testovacie karty

### ✅ Úspešná platba
```
Číslo karty: 4242 4242 4242 4242
Expiry: 12/25 (alebo akýkoľvek budúci dátum)
CVC: 123 (alebo akékoľvek 3 číslice)
ZIP: 12345 (alebo akýkoľvek)
```

### ❌ Zlyhaná platba
```
Číslo karty: 4000 0000 0000 0002
Expiry: 12/25
CVC: 123
ZIP: 12345
```

### 🔐 Vyžaduje 3D Secure
```
Číslo karty: 4000 0025 0000 3155
Expiry: 12/25
CVC: 123
ZIP: 12345
```

## 3. Postup testovania

1. Nastavte Stripe kľúče do .env súborov
2. Reštartujte backend server
3. Prihláste sa do e-shopu
4. Pridajte produkty do košíka
5. Prejdite na checkout a použite testovaciu kartu
6. Skontrolujte výsledok v Stripe Dashboard: https://dashboard.stripe.com/test/payments

## 4. Webhook setup (pre produkciu)

1. Choďte do Stripe Dashboard → Developers → Webhooks
2. Pridajte endpoint: `https://vas-backend-url.com/api/payments/webhook`
3. Vyberte eventy: `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Skopírujte webhook secret a pridajte do `backend/.env`

## 5. Riešenie problémov

### Problém: "Stripe nie je nakonfigurovaný"
- **Riešenie:** Skontrolujte, či je `STRIPE_SECRET_KEY` nastavený v `backend/.env`
- Reštartujte backend server

### Problém: "Invalid API Key"
- **Riešenie:** Skontrolujte, či sú kľúče správne skopírované
- Uistite sa, že používate **testovacie** kľúče (`pk_test_...` a `sk_test_...`)

### Problém: Frontend nevidí Stripe kľúč
- **Riešenie:** Skontrolujte, či existuje `frontend/.env` s `VITE_STRIPE_PUBLISHABLE_KEY`
- Reštartujte frontend server (Vite potrebuje reštart po zmene .env)

## 6. Produkčné nasadenie

**POZOR:** Pred produkčným nasadením:
1. Zmeňte testovacie kľúče na **live** kľúče
2. Nastavte webhook endpoint
3. Otestujte všetky scenáre
4. Skontrolujte bezpečnostné nastavenia

---

**Viac informácií:** https://stripe.com/docs/testing

