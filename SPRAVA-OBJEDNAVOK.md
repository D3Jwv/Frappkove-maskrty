# Správa objednávok - Admin Panel

## ✅ Čo som pridal:

1. **Admin panel stránka** (`AdminOrders.jsx`)
   - Zobrazuje všetky objednávky
   - Možnosť zmeniť status objednávky
   - Zobrazuje užívateľa, ktorý objednávku vytvoril

2. **API metódy** pre správu objednávok
   - `getAll()` - získať všetky objednávky (admin)
   - `updateStatus()` - zmeniť status objednávky (admin)

3. **Navigácia** v headeri
   - Pre admin užívateľov sa zobrazí link "Správa objednávok"

---

## 🎯 Ako používať:

### 1. Prihláste sa ako admin
- Email: `admin@eshop.sk`
- Heslo: `admin123`

### 2. Otvorte admin panel
- V headeri kliknite na **"Správa objednávok"**
- Alebo choďte priamo na: `http://localhost:3000/admin/orders`

### 3. Zmeňte status objednávky
- V admin paneli uvidíte všetky objednávky
- Pre každú objednávku je dropdown menu so statusmi
- Vyberte nový status a automaticky sa aktualizuje

---

## 📊 Statusy objednávok:

- **pending** - Čaká na spracovanie (žltá)
- **processing** - Spracováva sa (modrá)
- **shipped** - Odoslané (fialová)
- **delivered** - Doručené (zelená)
- **cancelled** - Zrušené (červená)

---

## 🔄 Workflow objednávky:

1. **pending** → Zákazník vytvorí objednávku
2. **processing** → Admin začne spracovávať objednávku
3. **shipped** → Objednávka bola odoslaná
4. **delivered** → Objednávka bola doručená
5. **cancelled** → Objednávka bola zrušená (môže byť kedykoľvek)

---

## 🛠️ Alternatívne metódy správy objednávok:

### Metóda 1: Cez MongoDB Compass

1. Otvorte MongoDB Compass
2. Kliknite na databázu `eshop`
3. Kliknite na kolekciu `orders`
4. Nájdite objednávku
5. Dvojitý klik na dokument
6. Zmeňte `"status": "pending"` na požadovaný status
7. Uložte zmeny

### Metóda 2: Cez API (Postman alebo podobný nástroj)

1. Prihláste sa ako admin a získajte token
2. **PUT:** `http://localhost:5000/api/orders/:id/status`
3. **Headers:** `Authorization: Bearer <VÁŠ_TOKEN>`
4. **Body (JSON):**
   ```json
   {
     "status": "processing"
   }
   ```

---

## 📝 Čo ďalej môžete pridať:

### Vylepšenia admin panelu:
- [ ] Filtrovanie objednávok podľa statusu
- [ ] Vyhľadávanie objednávok podľa užívateľa
- [ ] Zobrazenie detailov objednávky
- [ ] Export objednávok do CSV
- [ ] Štatistiky objednávok
- [ ] Email notifikácie pri zmene statusu

### Ďalšie admin funkcie:
- [ ] Správa produktov (pridávanie, editovanie, mazanie)
- [ ] Správa užívateľov
- [ ] Dashboard so štatistikami
- [ ] Správa kategórií

---

## 🚀 Rýchly štart:

1. **Prihláste sa ako admin:**
   - http://localhost:3000/login
   - Email: `admin@eshop.sk`
   - Heslo: `admin123`

2. **Otvorte admin panel:**
   - Kliknite na "Správa objednávok" v headeri
   - Alebo: http://localhost:3000/admin/orders

3. **Zmeňte status objednávky:**
   - Vyberte nový status z dropdown menu
   - Status sa automaticky aktualizuje

---

**Hotovo! Teraz môžete spravovať objednávky ako admin! 🎉**

