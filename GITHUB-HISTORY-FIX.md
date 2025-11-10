# 🔒 Oprava Git histórie - Odstránenie secrets z starých commitov

## ❌ Problém
GitHub stále detekuje secrets v **starých commitoch** (`a7e08cd` a `683ee63`), aj keď sme ich už opravili v nových súboroch.

## ✅ Riešenie: Prepísanie histórie

### Možnosť 1: Použiť GitHub link (najjednoduchšie)

GitHub ponúka linky na "unblock secret" - to znamená, že môžete povoliť push aj so secrets v histórii (len pre tento raz):

1. **Pre Stripe API Key:**
   - Kliknite na: https://github.com/D3Jwv/Frappkove-maskrty/security/secret-scanning/unblock-secret/35InKxEdJNfPbf6uItGjkAH1dQB
   - Potvrďte, že chcete povoliť push

2. **Pre Stripe Test API Secret Key:**
   - Kliknite na: https://github.com/D3Jwv/Frappkove-maskrty/security/secret-scanning/unblock-secret/35InKsVvCrXrdHT98WQNGJQiU0A
   - Potvrďte, že chcete povoliť push

3. **Potom pushnite znovu:**
   ```bash
   git push
   ```

**⚠️ POZOR:** Toto povolí push len pre tento raz. Secrets budú stále v histórii, ale GitHub ich už nebude blokovať.

---

### Možnosť 2: Odstrániť súbory a pridať ich späť (bezpečné)

1. **Odstráňte problematické súbory z Git:**
   ```bash
   git rm CORS-FIX.md PREPOJENIE-SLUZIEB.md STRIPE-LIVE-KEYS.md STRIPE-WEBHOOK-SECRET.md MONGODB-NASTAVENIE.md
   ```

2. **Commitnite odstránenie:**
   ```bash
   git commit -m "Remove files with secrets from history"
   ```

3. **Pridajte súbory späť (už bez secrets):**
   - Súbory už sú upravené bez secrets
   - Pridajte ich späť:
   ```bash
   git add CORS-FIX.md PREPOJENIE-SLUZIEB.md STRIPE-LIVE-KEYS.md STRIPE-WEBHOOK-SECRET.md MONGODB-NASTAVENIE.md
   git commit -m "Add documentation files without secrets"
   ```

4. **Pushnite:**
   ```bash
   git push
   ```

---

### Možnosť 3: Použiť git filter-branch (pokročilé)

**⚠️ POZOR:** Toto prepíše históriu! Použite len ak viete, čo robíte.

```bash
# Odstrániť secrets z histórie
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch CORS-FIX.md PREPOJENIE-SLUZIEB.md STRIPE-LIVE-KEYS.md STRIPE-WEBHOOK-SECRET.md MONGODB-NASTAVENIE.md" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (prepíše históriu na GitHub)
git push origin --force --all
```

**⚠️ DÔLEŽITÉ:** Force push prepíše históriu na GitHub. Ak máte spolupracovníkov, musia si znovu naklonovať repozitár.

---

## 🎯 Odporúčanie

**Najjednoduchšie riešenie:** Použite **Možnosť 1** (GitHub unblock linky).

Toto:
- ✅ Je najrýchlejšie
- ✅ Nevyžaduje zmeny v histórii
- ✅ Funguje okamžite
- ⚠️ Secrets budú stále v histórii, ale GitHub ich už nebude blokovať

**Ak chcete úplne odstrániť secrets z histórie:** Použite **Možnosť 3**, ale buďte opatrní s force push.

---

## 📋 Po oprave

Po úspešnom pushnutí:
1. ✅ Všetky nové súbory sú bez secrets
2. ✅ Dokumentácia obsahuje len placeholder texty
3. ✅ Skutočné keys sú len v `.env` súboroch a environment variables

---

**Hotovo!** Po použití jednej z možností by push mal fungovať! ✅

