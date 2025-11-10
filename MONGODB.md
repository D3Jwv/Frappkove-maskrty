# MongoDB - Nastavenie a konfigurácia

## Možnosť 1: MongoDB Atlas (Cloud) - ⭐ ODORÚČANÉ

**Výhody:**
- ✅ Žiadna inštalácia
- ✅ Zadarmo tier (512 MB)
- ✅ Automatické zálohovanie
- ✅ Dostupné z ktoréhokoľvek zariadenia
- ✅ Bezpečnejšie (SSL)

### Krok za krokom:

1. **Vytvorte účet:**
   - Choďte na: https://www.mongodb.com/cloud/atlas/register
   - Vytvorte bezplatný účet

2. **Vytvorte cluster:**
   - Po prihlásení kliknite "Build a Database"
   - Vyberte "FREE" tier (M0)
   - Vyberte cloud provider a región
   - Dajte clusteru názov
   - Kliknite "Create"

3. **Vytvorte databázového užívateľa:**
   - V sekcii "Database Access" kliknite "Add New Database User"
   - Vyberte "Password" autentifikáciu
   - Zadajte username a password (uložte si ich!)
   - V "Database User Privileges" vyberte "Atlas admin"
   - Kliknite "Add User"

4. **Povolte prístup z IP adresy:**
   - V sekcii "Network Access" kliknite "Add IP Address"
   - Kliknite "Allow Access from Anywhere" (pre vývoj) alebo pridajte svoju IP
   - Kliknite "Confirm"

5. **Získajte connection string:**
   - V sekcii "Database" kliknite "Connect"
   - Vyberte "Connect your application"
   - Skopírujte connection string
   - Nahraďte `<password>` vaším heslom a `<dbname>` názvom databázy (napr. `eshop`)

6. **Nastavte v backend/.env:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/eshop?retryWrites=true&w=majority
   ```

## Možnosť 2: Lokálna inštalácia

### Windows inštalácia:

1. **Stiahnite MongoDB:**
   - Choďte na: https://www.mongodb.com/try/download/community
   - Vyberte Windows a stiahnite MSI inštalátor

2. **Inštalácia:**
   - Spustite inštalátor
   - Vyberte "Complete" inštaláciu
   - Zaškrtnite "Install MongoDB as a Service"
   - Vyberte "Run service as Network Service user"
   - Dokončite inštaláciu

3. **Spustenie služby:**
   - MongoDB sa spustí automaticky ako Windows služba
   - Skontrolujte v Services (services.msc) - "MongoDB Server"

4. **Nastavte v backend/.env:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/eshop
   ```

## MongoDB Compass (GUI nástroj)

### Inštalácia:

1. **Stiahnite MongoDB Compass:**
   - Choďte na: https://www.mongodb.com/try/download/compass
   - Stiahnite verziu pre Windows
   - Spustite inštaláciu

### Pripojenie:

**Pre lokálnu MongoDB:**
```
mongodb://localhost:27017
```

**Pre MongoDB Atlas:**
- Použite connection string z Atlas Dashboardu
- Formát: `mongodb+srv://username:password@cluster.mongodb.net/`

### Použitie:

- Prezerať databázy a kolekcie
- Editovať dokumenty
- Vykonávať query
- Analyzovať výkon
- Vytvárať indexy

## Riešenie problémov

### MongoDB služba nebeží:
```powershell
# Spustite službu
Start-Service MongoDB

# Alebo v Services (services.msc) nájdite "MongoDB Server" a spustite
```

### Chyba pripojenia:
- Skontrolujte, či MongoDB beží
- Skontrolujte connection string v .env
- Pre Atlas: Skontrolujte Network Access (IP whitelist)
- Pre Atlas: Skontrolujte Database User oprávnenia

### Port 27017 je obsadený:
```powershell
# Nájdite proces
netstat -ano | findstr :27017

# Zastavte proces (ak je potrebné)
```

---

**Viac informácií:** https://docs.mongodb.com/

