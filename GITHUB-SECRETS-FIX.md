# 🔒 Oprava GitHub Secrets - Návod

## ❌ Problém
GitHub zablokoval push, pretože detekoval secrets (Stripe API keys) v commitovaných súboroch.

**Chyba:**
```
remote: error: GH013: Repository rule violations found
remote: - Push cannot contain secrets
```

---

## ✅ Riešenie

### Krok 1: Secrets už boli odstránené
Všetky skutočné Stripe keys boli nahradené placeholder textom:
- `sk_live_...` → `sk_live_YOUR_SECRET_KEY_HERE`
- `pk_live_...` → `pk_live_YOUR_PUBLISHABLE_KEY_HERE`
- `whsec_...` → `whsec_YOUR_WEBHOOK_SECRET_HERE`

### Krok 2: Commitnite zmeny
V GitHub Desktop:
1. **Všetky zmeny sú už pripravené** (secrets odstránené)
2. **Commitnite zmeny:**
   - Napíšte commit message: `Remove secrets from documentation files`
   - Kliknite **"Commit to master"**

### Krok 3: Pushnite zmeny
1. Kliknite **"Push origin"**
2. Teraz by to malo fungovať! ✅

---

## 🔒 Bezpečnostné poznámky

### ✅ Čo je teraz bezpečné:
- Dokumentačné súbory obsahujú len placeholder texty
- Skutočné keys sú len v `.env` súboroch (ktoré sú v `.gitignore`)
- Skutočné keys sú nastavené v Render/Vercel environment variables

### ❌ Čo NIKDY nerobte:
- ❌ Necommitnite `.env` súbory
- ❌ Necommitnite súbory so skutočnými API keys
- ❌ Nezdieľajte keys v verejných repozitároch

---

## 📋 Kde sú vaše skutočné keys?

### Lokálne:
- `eshop/backend/.env` - obsahuje skutočné keys (nie je v Git)
- `eshop/frontend/.env` - obsahuje skutočné keys (nie je v Git)

### Produkcia:
- **Render:** Environment Variables v dashboarde
- **Vercel:** Environment Variables v dashboarde
- **Stripe Dashboard:** Môžete si keys znovu vygenerovať ak potrebujete

---

## ✅ Checklist

- [x] Všetky Stripe keys odstránené z dokumentačných súborov
- [ ] Zmeny commitnuté v GitHub Desktop
- [ ] Push úspešný (bez GitHub secret protection chyby)
- [ ] Skutočné keys sú len v `.env` súboroch (lokálne)
- [ ] Skutočné keys sú nastavené v Render/Vercel (produkcia)

---

**Po týchto krokoch by push mal fungovať!** ✅

**Pamätajte:** Skutočné keys používajte len v `.env` súboroch a environment variables v hosting platformách, NIKDY v Git repozitári!

