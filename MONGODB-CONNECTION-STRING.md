# 🔗 Ako získať MongoDB Connection String

## 📍 Kde nájsť Connection String v MongoDB Atlas

### Krok 1: Otvorte MongoDB Atlas Dashboard
1. Choďte na: https://cloud.mongodb.com
2. Prihláste sa do vášho účtu
3. Vyberte váš projekt

### Krok 2: Otvorte Connect dialog
1. V zozname clusterov kliknite na **"Connect"** tlačidlo pri vašom clusteri
2. Alebo kliknite na názov clusteru a potom **"Connect"**

### Krok 3: Vyberte "Connect your application"
1. V dialógu uvidíte niekoľko možností:
   - ✅ **Connect your application** ← Toto potrebujete!
   - Access your data through tools (Compass, Shell, atď.)

2. **Ak nevidíte "Connect your application":**
   - Skúste kliknúť na **"Drivers"** (v sekcii "Connect to your application")
   - Alebo počkajte, kým sa stránka načíta úplne
   - Skúste obnoviť stránku (F5)

### Krok 4: Získajte Connection String
1. Kliknite na **"Connect your application"** alebo **"Drivers"**
2. Vyberte:
   - **Driver:** Node.js
   - **Version:** 5.5 or later (alebo najnovšia)
3. Skopírujte **Connection String**, ktorý vyzerá takto:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Krok 5: Upravte Connection String
1. **Nahraďte `<username>`** vaším databázovým užívateľom
2. **Nahraďte `<password>`** vaším heslom
3. **Pridajte názov databázy** na koniec:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/eshop?retryWrites=true&w=majority
   ```

**Príklad finálneho Connection String:**
```
mongodb+srv://admin:mypassword123@cluster0.abc123.mongodb.net/eshop?retryWrites=true&w=majority
```

---

## 🔍 Alternatívne cesty k Connection Stringu

### Možnosť 1: Cez Database Access
1. Choďte do **"Database Access"** (v ľavom menu)
2. Kliknite na vašeho užívateľa
3. Kliknite **"Connect"** alebo **"Get connection string"**

### Možnosť 2: Cez Database sekciu
1. Choďte do **"Database"** (v ľavom menu)
2. Kliknite na **"Connect"** pri vašom clusteri
3. Vyberte **"Connect your application"**

### Možnosť 3: Priamo v clusteri
1. Kliknite na názov clusteru
2. V detailoch kliknite **"Connect"**
3. Vyberte **"Connect your application"**

---

## ⚠️ Časté problémy

### Problém: "Connect your application" nie je viditeľné

**Riešenie 1:** Skúste iný prehliadač
- Chrome, Firefox, Edge

**Riešenie 2:** Vymažte cache
- Ctrl + Shift + Delete
- Vymažte cache a cookies
- Obnovte stránku

**Riešenie 3:** Skúste iný spôsob
1. Choďte do **"Database"** → **"Connect"**
2. Alebo do **"Database Access"** → kliknite na užívateľa → **"Connect"**

**Riešenie 4:** Overte, či máte vytvorený database user
1. Choďte do **"Database Access"**
2. Ak nemáte užívateľa, vytvorte ho:
   - Kliknite **"Add New Database User"**
   - Vyberte **"Password"**
   - Zadajte username a password
   - Vyberte **"Atlas admin"** práva
   - Kliknite **"Add User"**

### Problém: Connection String nefunguje

**Skontrolujte:**
1. ✅ Je `<username>` nahradený skutočným užívateľom?
2. ✅ Je `<password>` nahradený skutočným heslom?
3. ✅ Je password správne (žiadne špeciálne znaky, ktoré treba URL-encode)?
4. ✅ Je Network Access nastavené (0.0.0.0/0 alebo vaša IP)?

**Ak máte špeciálne znaky v hesle:**
- Musíte ich URL-encode
- Napr. `@` → `%40`, `#` → `%23`, ` ` (medzera) → `%20`

---

## 📝 Krok za krokom - Kompletný postup

### 1. Vytvorte Database User (ak nemáte)
1. Choďte do **"Database Access"**
2. Kliknite **"Add New Database User"**
3. Vyberte **"Password"**
4. Zadajte:
   - **Username:** `admin` (alebo iný)
   - **Password:** Vytvorte silné heslo (uložte si ho!)
5. V **"Database User Privileges"** vyberte **"Atlas admin"**
6. Kliknite **"Add User"**

### 2. Nastavte Network Access
1. Choďte do **"Network Access"**
2. Kliknite **"Add IP Address"**
3. Pre vývoj: Kliknite **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Pre produkciu: Pridajte len IP adresy vašich serverov
5. Kliknite **"Confirm"**

### 3. Získajte Connection String
1. Choďte do **"Database"**
2. Kliknite **"Connect"** pri vašom clusteri
3. Vyberte **"Connect your application"** (alebo **"Drivers"**)
4. Vyberte **Node.js** driver
5. Skopírujte Connection String

### 4. Upravte Connection String
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**Zmeňte na:**
```
mongodb+srv://admin:vasheslo123@cluster0.xxxxx.mongodb.net/eshop?retryWrites=true&w=majority
```

---

## ✅ Overenie Connection Stringu

### Test v Node.js:
```javascript
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/eshop?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Pripojené k MongoDB!'))
  .catch(err => console.error('❌ Chyba:', err));
```

### Test v MongoDB Compass:
1. Otvorte MongoDB Compass
2. Vložte Connection String
3. Kliknite **"Connect"**
4. Mala by sa zobraziť databáza

---

## 🎯 Rýchly postup (ak máte problém)

1. **Choďte na:** https://cloud.mongodb.com
2. **Vyberte váš projekt**
3. **Kliknite na názov clusteru** (nie Connect tlačidlo)
4. **V detailoch kliknite "Connect"**
5. **Vyberte "Drivers"** (v sekcii "Connect to your application")
6. **Skopírujte Connection String**

---

## 📞 Ak stále nefunguje

1. **Skontrolujte, či máte vytvorený database user**
2. **Skontrolujte Network Access** (musí byť nastavené)
3. **Skúste iný prehliadač**
4. **Kontaktujte MongoDB Atlas support**

---

**Connection String by mal vyzerať takto:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/eshop?retryWrites=true&w=majority
```

**Použite ho v `backend/.env`:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/eshop?retryWrites=true&w=majority
```

