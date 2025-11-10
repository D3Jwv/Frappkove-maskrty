# 📤 Upload projektu na GitHub - GitHub Desktop

Jednoduchý návod na nahranie vášho e-shop projektu na GitHub pomocou GitHub Desktop.

---

## ⚠️ Dôležité pred uploadom!

### 1. Skontrolujte .gitignore

Uistite sa, že `.gitignore` obsahuje:
- `.env` súbory (nechcete commitnúť API kľúče!)
- `node_modules/` (veľké priečinky)
- Log súbory

**Ak .env súbory už boli commitnuté:**
- Musíte ich odstrániť z Git histórie (pozrite nižšie)

---

## 🚀 Krok za krokom

### Krok 1: Otvorte GitHub Desktop

1. Spustite **GitHub Desktop**
2. Uistite sa, že ste prihlásení (File → Options → Accounts)

### Krok 2: Vytvorte nový repository na GitHub.com

1. Choďte na: https://github.com/new
2. Vyplňte:
   - **Repository name:** `eshop` (alebo iný názov)
   - **Description:** `E-shop aplikácia - React frontend + Node.js backend`
   - **Visibility:** 
     - ✅ **Public** (ak chcete zdieľať)
     - ✅ **Private** (ak chcete súkromné)
3. **NECHÁJTE prázdne:**
   - ❌ NEDÁVAJTE README
   - ❌ NEDÁVAJTE .gitignore
   - ❌ NEDÁVAJTE license
4. Kliknite **"Create repository"**

### Krok 3: Pridajte lokálny projekt do GitHub Desktop

**Možnosť A: Clone z GitHubu (ak ste už vytvorili repository)**

1. V GitHub Desktop kliknite **"File" → "Clone Repository"**
2. Vyberte **"GitHub.com"** tab
3. Nájdite váš nový repository (`eshop`)
4. Vyberte **"Local path"** (kde chcete uložiť)
5. Kliknite **"Clone"**
6. Skopírujte všetky súbory z `C:\Users\david\Desktop\Project\eshop` do nového priečinka

**Možnosť B: Pridajte existujúci projekt (odporúčané)**

1. V GitHub Desktop kliknite **"File" → "Add Local Repository"**
2. Kliknite **"Choose..."** a vyberte priečinok: `C:\Users\david\Desktop\Project\eshop`
3. Kliknite **"Add Repository"**

### Krok 4: Skontrolujte zmeny

V GitHub Desktop uvidíte zoznam súborov, ktoré sa pridajú:

**✅ Mali by ste vidieť:**
- Všetky `.js`, `.jsx`, `.json` súbory
- `README.md`
- Dokumentácia (`.md` súbory)

**❌ NEMALI by ste vidieť:**
- `.env` súbory (musia byť v .gitignore)
- `node_modules/` priečinky
- `.log` súbory

### Krok 5: Vytvorte prvý commit

1. V spodnej časti napíšte **commit message:**
   ```
   Initial commit - E-shop aplikácia
   ```
2. Kliknite **"Commit to main"** (alebo "Commit to master")

### Krok 6: Publikujte na GitHub

1. Kliknite **"Publish repository"** (alebo **"Push origin"** ak už existuje)
2. **Odporúčané:** Odznačte **"Keep this code private"** (ak chcete public)
3. Kliknite **"Publish Repository"**

### Krok 7: Overenie

1. Choďte na: https://github.com/vas-username/eshop
2. Mala by sa tam zobraziť vaša aplikácia!

---

## 🔒 Bezpečnosť - Skontrolujte .gitignore

### Otvorte `.gitignore` a uistite sa, že obsahuje:

```
# Environment variables
.env
.env.local
.env.production
.env.development
backend/.env
frontend/.env

# Dependencies
node_modules/
**/node_modules/

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build outputs
dist/
build/
*.cache

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Temporary files
*.tmp
.cache/
```

---

## ⚠️ Ak ste už commitli .env súbory

**Dôležité:** Ak ste už nahrali `.env` súbory s API kľúčmi, musíte ich odstrániť!

### Rýchle riešenie:

1. **Zmeňte API kľúče v Stripe!** (staré kľúče sú kompromitované)
2. V GitHub Desktop:
   - Odstráňte `.env` súbory z projektu
   - Pridajte ich do `.gitignore`
   - Commitnite zmenu
   - Pushnite

### Alebo použite Git:

```bash
cd C:\Users\david\Desktop\Project\eshop
git rm --cached backend/.env frontend/.env
git commit -m "Remove .env files from Git"
git push
```

**Potom zmeňte API kľúče v Stripe Dashboard!**

---

## 📝 Tipy

### 1. Commit Messages

Používajte popisné commit messages:
- ✅ `Add Stripe payment integration`
- ✅ `Fix cart quantity update bug`
- ✅ `Update deployment documentation`
- ❌ `update`
- ❌ `fix`

### 2. Pravidelné commity

Commitnite často:
- Po každej funkcionalite
- Po oprave bugu
- Po úprave dokumentácie

### 3. Branches (voliteľné)

Pre väčšie zmeny vytvorte branch:
1. Kliknite **"Current branch" → "New branch"**
2. Pomenujte branch (napr. `feature/stripe-integration`)
3. Robte zmeny
4. Commitnite
5. Kliknite **"Branch → Merge into main"**

---

## 🚀 Ďalšie kroky po uploadi

### 1. Nastavenie pre Railway/Render

Keď máte kód na GitHubu, môžete:
1. Pripojiť repository k Railway/Render
2. Automatický deploy pri každom pushnutí

### 2. Nastavenie pre Vercel

1. Pripojte GitHub repository k Vercel
2. Vercel automaticky deployne frontend

---

## ❓ Časté problémy

### Problém: "Repository not found"

**Riešenie:**
- Skontrolujte, či ste prihlásení v GitHub Desktop
- Skontrolujte, či repository existuje na GitHub.com

### Problém: "Nothing to commit"

**Riešenie:**
- Možno už je všetko commitnuté
- Skontrolujte, či sú súbory v správnom priečinku

### Problém: "Large files"

**Riešenie:**
- `node_modules/` by mali byť v `.gitignore`
- Skontrolujte `.gitignore`

---

## ✅ Checklist

- [ ] GitHub Desktop nainštalované a prihlásené
- [ ] Repository vytvorené na GitHub.com
- [ ] Lokálny projekt pridaný do GitHub Desktop
- [ ] `.gitignore` skontrolovaný (`.env` súbory ignorované)
- [ ] Prvý commit vytvorený
- [ ] Repository publikovaný na GitHub
- [ ] Overené na GitHub.com

---

**Hotovo! Váš projekt je teraz na GitHube! 🎉**

**Ďalšie kroky:**
- Pozrite si **DEPLOYMENT-GUIDE.md** pre nasadenie
- Pozrite si **DEPLOYMENT-EUROPE.md** pre evropské servery

