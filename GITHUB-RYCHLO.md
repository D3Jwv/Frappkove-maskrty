# ⚡ Rýchly návod - Upload na GitHub (5 minút)

## 🎯 Krok za krokom

### 1. Vytvorte repository na GitHub.com
1. Choďte na: **https://github.com/new**
2. Názov: `eshop` (alebo iný)
3. **NEDÁVAJTE** README, .gitignore, license
4. Kliknite **"Create repository"**

### 2. Otvorte GitHub Desktop
1. Spustite **GitHub Desktop**
2. Kliknite **"File" → "Add Local Repository"**
3. Kliknite **"Choose..."** a vyberte: `C:\Users\david\Desktop\Project\eshop`
4. Kliknite **"Add Repository"**

**Ak vám píše "This directory does not appear to be a Git repository":**
- ✅ Git repository už je inicializovaný (bolo to spravené automaticky)
- Skúste znova pridať repository

### 3. Skontrolujte zmeny
- ✅ Mali by ste vidieť všetky súbory
- ❌ **NEMALI** by ste vidieť `.env` súbory (musia byť ignorované)

### 4. Vytvorte commit
1. Napíšte: `Initial commit - E-shop aplikácia`
2. Kliknite **"Commit to main"**

### 5. Publikujte
1. Kliknite **"Publish repository"**
2. Vyberte názov repository
3. Kliknite **"Publish Repository"**

### 6. Hotovo! ✅
Choďte na: **https://github.com/vas-username/eshop**

---

## ⚠️ Dôležité!

**Pred uploadom skontrolujte:**
- ✅ `.env` súbory sú v `.gitignore` (už sú!)
- ✅ `node_modules/` sú ignorované (už sú!)

**Ak ste už commitli .env súbory:**
1. **Zmeňte API kľúče v Stripe!**
2. Odstráňte `.env` z Git histórie

---

**Detailný návod:** Pozrite si **GITHUB-UPLOAD.md**

