# Ako vytvoriť admin užívateľa

## ⚠️ Dôležité

Registrácia cez frontend **vždy vytvára užívateľa s rolou 'user'** - toto je z bezpečnostných dôvodov správne. Admin užívateľa musíte vytvoriť inak.

---

## Metóda 1: Použitie skriptu (Najjednoduchšie) ⭐

### Krok 1: Spustite skript

V termináli (v priečinku `eshop/backend`):

```powershell
cd C:\Users\david\Desktop\Project\eshop\backend
$env:Path += ";C:\Program Files\nodejs"
node src/scripts/createAdmin.js
```

### Krok 2: Overenie

Skript vytvorí admin užívateľa:
- **Email:** `admin@eshop.sk`
- **Heslo:** `admin123`
- **Role:** `admin`

### Krok 3: Prihlásenie

Choďte na: http://localhost:3000/login
- Email: `admin@eshop.sk`
- Heslo: `admin123`

---

## Metóda 2: Cez MongoDB Compass (Manuálne)

### Krok 1: Registrácia normálneho užívateľa

1. Choďte na: http://localhost:3000/register
2. Zaregistrujte sa s emailom, ktorý chcete použiť ako admin
3. Zapamätajte si email a heslo

### Krok 2: Zmena role v MongoDB Compass

1. **Otvorte MongoDB Compass**
2. **Pripojte sa** k `mongodb://localhost:27017`
3. **Kliknite na databázu** `eshop`
4. **Kliknite na kolekciu** `users`
5. **Nájdite vášho užívateľa** (podľa emailu)
6. **Dvojitý klik** na dokument
7. **Zmeňte** `"role": "user"` na `"role": "admin"`
8. **Kliknite "Update"** alebo "Save"

### Krok 3: Overenie

1. Odhláste sa z aplikácie (ak ste prihlásení)
2. Prihláste sa znova s tým istým emailom
3. Teraz by ste mali mať admin prístup

---

## Metóda 3: Cez API (Postman alebo podobný nástroj)

### Krok 1: Registrácia

1. **POST:** `http://localhost:5000/api/users/register`
2. **Body (JSON):**
```json
{
  "name": "Admin",
  "email": "admin@eshop.sk",
  "password": "admin123"
}
```

### Krok 2: Zmena role v Compass

Postupujte podľa **Metódy 2, Krok 2** - zmeňte role na admin v Compass.

---

## Metóda 4: Priamo v MongoDB Compass (Pre pokročilých)

**⚠️ Pozor:** Táto metóda vyžaduje manuálne hashovanie hesla.

1. **Otvorte MongoDB Compass**
2. **Kliknite na kolekciu** `users`
3. **Kliknite "ADD DATA" → "Insert Document"**
4. **Vložte:**
```json
{
  "name": "Admin",
  "email": "admin@eshop.sk",
  "password": "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
  "role": "admin"
}
```

**Poznámka:** Hash hesla `admin123` je: `$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy`

**Alebo:** Použite Metódu 1 (skript), ktorá to urobí automaticky.

---

## Overenie, že ste admin

### Cez Frontend:
1. Prihláste sa
2. V headeri by ste mali vidieť vaše meno
3. Mali by ste mať prístup k admin funkciám (ak sú implementované)

### Cez API:
1. Prihláste sa a získajte token
2. **GET:** `http://localhost:5000/api/users/profile`
3. **Headers:** `Authorization: Bearer <VÁŠ_TOKEN>`
4. V odpovedi by malo byť: `"role": "admin"`

### V MongoDB Compass:
1. Otvorte kolekciu `users`
2. Nájdite vášho užívateľa
3. Skontrolujte, či `"role": "admin"`

---

## Riešenie problémov

### Problém: "Užívateľ s týmto emailom už existuje"

**Riešenie:**
- Použite iný email
- Alebo zmeňte existujúceho užívateľa na admin v Compass

### Problém: "Neplatné prihlasovacie údaje"

**Riešenie:**
- Skontrolujte, či ste zadali správne email a heslo
- Skontrolujte, či užívateľ existuje v databáze

### Problém: Skript nefunguje

**Riešenie:**
- Skontrolujte, či beží MongoDB
- Skontrolujte, či ste v správnom priečinku
- Skontrolujte, či existuje `.env` súbor s `MONGODB_URI`

---

## Odporúčanie

**Použite Metódu 1 (skript)** - je to najjednoduchšie a najbezpečnejšie:
```powershell
cd eshop\backend
node src/scripts/createAdmin.js
```

Potom sa prihláste:
- Email: `admin@eshop.sk`
- Heslo: `admin123`

---

## Bezpečnostné poznámky

- ⚠️ V produkcii zmeňte predvolené heslo!
- ⚠️ Použite silné heslo
- ⚠️ Admin užívateľa vytvárajte len cez bezpečné metódy
- ⚠️ V produkcii použite environment variables pre admin údaje


