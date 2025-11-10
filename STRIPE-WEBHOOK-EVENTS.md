# 📡 Stripe Webhook Events - Pre Live Stripe

## ✅ Odporúčané eventy pre e-shop

Pre váš e-shop odporúčame nasledujúce Stripe webhook eventy:

---

## 🔴 Povinné eventy (minimálne)

### 1. `payment_intent.succeeded`
**Kedy:** Keď je platba úspešne dokončená

**Čo robiť:**
- Aktualizovať objednávku na `paymentStatus: 'paid'`
- Odoslať potvrdzovací email zákazníkovi
- Aktualizovať zásoby produktov

**Už implementované:** ✅ Áno (v `stripeService.js`)

---

### 2. `payment_intent.payment_failed`
**Kedy:** Keď platba zlyhá

**Čo robiť:**
- Aktualizovať objednávku na `paymentStatus: 'failed'`
- Odoslať email zákazníkovi s informáciou o zlyhaní
- Umožniť zákazníkovi skúsiť znova

**Už implementované:** ✅ Áno (v `stripeService.js`)

---

## 🟡 Odporúčané eventy (pre lepšiu funkcionalitu)

### 3. `payment_intent.canceled`
**Kedy:** Keď je platba zrušená zákazníkom alebo automaticky

**Čo robiť:**
- Aktualizovať objednávku na `paymentStatus: 'canceled'`
- Vrátiť produkty do zásob (ak boli rezervované)

**Už implementované:** ❌ Nie (môžete pridať)

---

### 4. `charge.refunded`
**Kdy:** Keď je platba vrátená (refund)

**Čo robiť:**
- Aktualizovať objednávku na `paymentStatus: 'refunded'`
- Odoslať email zákazníkovi
- Aktualizovať zásoby (vrátiť produkty)

**Už implementované:** ❌ Nie (môžete pridať)

---

### 5. `charge.dispute.created`
**Kdy:** Keď zákazník spustí chargeback/dispute

**Čo robiť:**
- Označiť objednávku ako `disputed`
- Upozorniť administrátora
- Pripraviť dokumentáciu pre dispute

**Už implementované:** ❌ Nie (môžete pridať)

---

## 🟢 Voliteľné eventy (pre pokročilé funkcie)

### 6. `customer.created`
**Kedy:** Keď je vytvorený nový Stripe customer

**Čo robiť:**
- Uložiť Stripe customer ID do databázy
- Prepojiť s vaším užívateľským účtom

**Už implementované:** ❌ Nie

---

### 7. `customer.updated`
**Kedy:** Keď sú aktualizované údaje Stripe customera

**Čo robiť:**
- Synchronizovať zmeny s vašou databázou

**Už implementované:** ❌ Nie

---

## 📋 Zoznam eventov pre Stripe Dashboard

### Pre základnú funkcionalitu (odporúčané):
```
payment_intent.succeeded
payment_intent.payment_failed
payment_intent.canceled
```

### Pre kompletnú funkcionalitu:
```
payment_intent.succeeded
payment_intent.payment_failed
payment_intent.canceled
charge.refunded
charge.dispute.created
customer.created
customer.updated
```

---

## 🚀 Ako nastaviť v Stripe Dashboard

### Krok 1: Otvorte Stripe Dashboard
1. Choďte na: https://dashboard.stripe.com
2. **Prepnite na Live mode** (vpravo hore)
3. Choďte do **"Developers" → "Webhooks"**

### Krok 2: Vytvorte Webhook Endpoint
1. Kliknite **"Add endpoint"**
2. Zadajte **Endpoint URL:**
   ```
   https://vas-backend-url.com/api/payments/webhook
   ```
   (Nahraďte `vas-backend-url.com` vašou skutočnou backend URL - napr. `vas-backend.onrender.com`)

### Krok 3: Vyberte eventy
1. Kliknite **"Select events"**
2. Vyberte **"Select events to listen to"**
3. Zaškrtnite tieto eventy:

**Minimálne (povinné):**
- ✅ `payment_intent.succeeded`
- ✅ `payment_intent.payment_failed`

**Odporúčané:**
- ✅ `payment_intent.canceled`
- ✅ `charge.refunded`
- ✅ `charge.dispute.created`

4. Kliknite **"Add events"**

### Krok 4: Uložte a skopírujte Secret
1. Kliknite **"Add endpoint"**
2. Skopírujte **Signing secret** (`whsec_...`)
3. Pridajte ho do environment variables:
   - **Render/Railway:** `STRIPE_WEBHOOK_SECRET=whsec_...`
   - **Lokálne:** `backend/.env` → `STRIPE_WEBHOOK_SECRET=whsec_...`

---

## 🔧 Aktualizácia kódu (voliteľné)

Ak chcete pridať podporu pre ďalšie eventy, upravte `backend/src/services/stripeService.js`:

```javascript
// Webhook handler pre Stripe
exports.handleWebhook = (req, res) => {
  // ... existujúci kód pre verifikáciu ...

  // Spracovať event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Payment succeeded:', paymentIntent.id);
      // Aktualizovať objednávku v databáze
      // TODO: Implementovať aktualizáciu objednávky
      break;
      
    case 'payment_intent.payment_failed':
      console.log('Payment failed:', event.data.object.id);
      // TODO: Implementovať handling zlyhania
      break;
      
    case 'payment_intent.canceled':
      console.log('Payment canceled:', event.data.object.id);
      // TODO: Implementovať handling zrušenia
      break;
      
    case 'charge.refunded':
      console.log('Charge refunded:', event.data.object.id);
      // TODO: Implementovať handling refundu
      break;
      
    case 'charge.dispute.created':
      console.log('Dispute created:', event.data.object.id);
      // TODO: Implementovať handling dispute
      break;
      
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};
```

---

## ✅ Checklist pre Live Stripe

- [ ] Stripe Dashboard prepnutý na **Live mode**
- [ ] Webhook endpoint vytvorený s správnou URL
- [ ] Eventy vybrané:
  - [ ] `payment_intent.succeeded` ✅
  - [ ] `payment_intent.payment_failed` ✅
  - [ ] `payment_intent.canceled` (odporúčané)
  - [ ] `charge.refunded` (odporúčané)
- [ ] Webhook secret skopírovaný
- [ ] `STRIPE_WEBHOOK_SECRET` nastavený v environment variables
- [ ] Backend reštartovaný (ak lokálne)
- [ ] Testovanie webhooku (môžete poslať test event z Stripe Dashboard)

---

## 🧪 Testovanie webhooku

### V Stripe Dashboard:
1. Choďte do **"Developers" → "Webhooks"**
2. Kliknite na váš endpoint
3. Kliknite **"Send test webhook"**
4. Vyberte event (napr. `payment_intent.succeeded`)
5. Kliknite **"Send test webhook"**
6. Skontrolujte logy v Render/Railway

### Overenie:
- V backend logoch by ste mali vidieť: `Payment succeeded: pi_...`
- V Stripe Dashboard by ste mali vidieť úspešné volanie (zelený status)

---

## 📞 Ak webhook nefunguje

1. **Skontrolujte URL:**
   - Musí byť HTTPS (nie HTTP)
   - Musí byť správna cesta: `/api/payments/webhook`

2. **Skontrolujte webhook secret:**
   - Musí byť správne nastavený v environment variables
   - Musí byť z Live mode (nie Test mode)

3. **Skontrolujte logy:**
   - V Render/Railway logoch hľadajte chyby
   - V Stripe Dashboard → Webhooks → váš endpoint → "Recent deliveries"

4. **Skontrolujte Network Access:**
   - Stripe musí mať prístup k vášmu backendu
   - Skontrolujte firewall/CORS nastavenia

---

**Pre základnú funkcionalitu stačí:**
- ✅ `payment_intent.succeeded`
- ✅ `payment_intent.payment_failed`

**Pre kompletnú funkcionalitu pridajte:**
- ✅ `payment_intent.canceled`
- ✅ `charge.refunded`
- ✅ `charge.dispute.created`

---

**Hotovo! Vaše webhook eventy sú pripravené!** 🎉

