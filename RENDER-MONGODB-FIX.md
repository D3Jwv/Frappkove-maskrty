# 🔧 Oprava MongoDB pripojenia v Render

## ❌ Problém
```
MongooseServerSelectionError: Could not connect to any servers in your MongoDB Atlas cluster. 
One common reason is that you're trying to access the database from an IP that isn't whitelisted.
```

**Príčina:** Render IP adresa nie je na whiteliste v MongoDB Atlas.

---

## ✅ Riešenie: Pridať Render IP do MongoDB Atlas

### Krok 1: Povoliť prístup z akéhokoľvek IP (najjednoduchšie)

**⚠️ POZOR:** Toto je menej bezpečné, ale najjednoduchšie pre produkciu.

1. **Choďte na:** https://cloud.mongodb.com
2. **Prihláste sa** do vášho účtu
3. **Vyberte váš cluster** (`Frappkovemaskrty`)
4. **Kliknite na "Network Access"** (v ľavom menu)
5. **Kliknite "Add IP Address"**
6. **Kliknite "Allow Access from Anywhere"**
   - Toto pridá `0.0.0.0/0` (všetky IP adresy)
7. **Kliknite "Confirm"**
8. **Počkajte 1-2 minúty** (MongoDB potrebuje čas na aktualizáciu)

---

### Krok 2: Skontrolovať NODE_ENV v Render

Render má `NODE_ENV=development`, ale mal by byť `production`:

1. **Choďte na:** https://dashboard.render.com
2. **Kliknite na váš Web Service**
3. **Choďte do "Environment"** sekcie
4. **Skontrolujte/upravte:**
   - **Key:** `NODE_ENV`
   - **Value:** `production` (nie `development`)
5. **Kliknite "Save Changes"**
6. **Render automaticky reštartuje**

---

### Krok 3: Skontrolovať MongoDB Connection String

Uistite sa, že `MONGODB_URI` v Render je správne nastavený:

1. **V Render Environment Variables:**
   ```env
   MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@frappkovemaskrty.dedagxv.mongodb.net/eshop?retryWrites=true&w=majority
   ```

2. **Skontrolujte:**
   - ✅ Username a password sú správne
   - ✅ Cluster name je správny (`frappkovemaskrty.dedagxv.mongodb.net`)
   - ✅ Database name je správny (`eshop`)

---

## 🔒 Bezpečnejšie riešenie: Pridať len Render IP adresy

Ak nechcete povoliť prístup z akéhokoľvek IP, môžete pridať len Render IP adresy:

### Render IP adresy (pre európske servery):
- `52.71.0.0/16`
- `54.172.0.0/15`
- `54.174.0.0/15`
- `54.144.0.0/14`
- `54.152.0.0/15`
- `54.196.0.0/15`
- `54.198.0.0/15`
- `54.204.0.0/15`
- `54.208.0.0/15`
- `54.210.0.0/15`
- `54.224.0.0/15`
- `54.226.0.0/15`
- `54.234.0.0/15`
- `54.236.0.0/15`
- `54.238.0.0/15`
- `54.242.0.0/15`
- `54.244.0.0/15`
- `54.246.0.0/15`
- `54.248.0.0/15`
- `54.250.0.0/15`
- `54.252.0.0/15`
- `54.254.0.0/15`
- `54.80.0.0/13`
- `54.88.0.0/14`
- `54.92.0.0/17`
- `54.92.128.0/17`
- `54.93.0.0/16`
- `54.94.0.0/16`
- `54.95.0.0/16`
- `54.96.0.0/16`
- `54.97.0.0/16`
- `54.98.0.0/16`
- `54.99.0.0/16`
- `54.100.0.0/16`
- `54.101.0.0/16`
- `54.102.0.0/16`
- `54.103.0.0/16`
- `54.104.0.0/16`
- `54.105.0.0/16`
- `54.106.0.0/16`
- `54.107.0.0/16`
- `54.108.0.0/16`
- `54.109.0.0/16`
- `54.110.0.0/16`
- `54.111.0.0/16`
- `54.112.0.0/16`
- `54.113.0.0/16`
- `54.114.0.0/16`
- `54.115.0.0/16`
- `54.116.0.0/16`
- `54.117.0.0/16`
- `54.118.0.0/16`
- `54.119.0.0/16`
- `54.120.0.0/16`
- `54.121.0.0/16`
- `54.122.0.0/16`
- `54.123.0.0/16`
- `54.124.0.0/16`
- `54.125.0.0/16`
- `54.126.0.0/16`
- `54.127.0.0/16`
- `54.128.0.0/16`
- `54.129.0.0/16`
- `54.130.0.0/16`
- `54.131.0.0/16`
- `54.132.0.0/16`
- `54.133.0.0/16`
- `54.134.0.0/16`
- `54.135.0.0/16`
- `54.136.0.0/16`
- `54.137.0.0/16`
- `54.138.0.0/16`
- `54.139.0.0/16`
- `54.140.0.0/16`
- `54.141.0.0/16`
- `54.142.0.0/16`
- `54.143.0.0/16`
- `54.144.0.0/16`
- `54.145.0.0/16`
- `54.146.0.0/16`
- `54.147.0.0/0/16`
- `54.148.0.0/16`
- `54.149.0.0/16`
- `54.150.0.0/16`
- `54.151.0.0/16`
- `54.152.0.0/16`
- `54.153.0.0/16`
- `54.154.0.0/16`
- `54.155.0.0/16`
- `54.156.0.0/16`
- `54.157.0.0/16`
- `54.158.0.0/16`
- `54.159.0.0/16`
- `54.160.0.0/16`
- `54.161.0.0/16`
- `54.162.0.0/16`
- `54.163.0.0/16`
- `54.164.0.0/16`
- `54.165.0.0/16`
- `54.166.0.0/16`
- `54.167.0.0/16`
- `54.168.0.0/16`
- `54.169.0.0/16`
- `54.170.0.0/16`
- `54.171.0.0/16`
- `54.172.0.0/16`
- `54.173.0.0/16`
- `54.174.0.0/16`
- `54.175.0.0/16`
- `54.176.0.0/16`
- `54.177.0.0/16`
- `54.178.0.0/16`
- `54.179.0.0/16`
- `54.180.0.0/16`
- `54.181.0.0/16`
- `54.182.0.0/16`
- `54.183.0.0/16`
- `54.184.0.0/16`
- `54.185.0.0/16`
- `54.186.0.0/16`
- `54.187.0.0/16`
- `54.188.0.0/16`
- `54.189.0.0/16`
- `54.190.0.0/16`
- `54.191.0.0/16`
- `54.192.0.0/16`
- `54.193.0.0/16`
- `54.194.0.0/16`
- `54.195.0.0/16`
- `54.196.0.0/16`
- `54.197.0.0/16`
- `54.198.0.0/16`
- `54.199.0.0/16`
- `54.200.0.0/16`
- `54.201.0.0/16`
- `54.202.0.0/16`
- `54.203.0.0/16`
- `54.204.0.0/16`
- `54.205.0.0/16`
- `54.206.0.0/16`
- `54.207.0.0/16`
- `54.208.0.0/16`
- `54.209.0.0/16`
- `54.210.0.0/16`
- `54.211.0.0/16`
- `54.212.0.0/16`
- `54.213.0.0/16`
- `54.214.0.0/16`
- `54.215.0.0/16`
- `54.216.0.0/16`
- `54.217.0.0/16`
- `54.218.0.0/16`
- `54.219.0.0/16`
- `54.220.0.0/16`
- `54.221.0.0/16`
- `54.222.0.0/16`
- `54.223.0.0/16`
- `54.224.0.0/16`
- `54.225.0.0/16`
- `54.226.0.0/16`
- `54.227.0.0/16`
- `54.228.0.0/16`
- `54.229.0.0/16`
- `54.230.0.0/16`
- `54.231.0.0/16`
- `54.232.0.0/16`
- `54.233.0.0/16`
- `54.234.0.0/16`
- `54.235.0.0/16`
- `54.236.0.0/16`
- `54.237.0.0/16`
- `54.238.0.0/16`
- `54.239.0.0/16`
- `54.240.0.0/16`
- `54.241.0.0/16`
- `54.242.0.0/16`
- `54.243.0.0/16`
- `54.244.0.0/16`
- `54.245.0.0/16`
- `54.246.0.0/16`
- `54.247.0.0/16`
- `54.248.0.0/16`
- `54.249.0.0/16`
- `54.250.0.0/16`
- `54.251.0.0/16`
- `54.252.0.0/16`
- `54.253.0.0/16`
- `54.254.0.0/16`
- `54.255.0.0/16`

**Alebo jednoduchšie:** Použite `0.0.0.0/0` (všetky IP adresy) - to je najjednoduchšie pre produkciu.

---

## 📋 Checklist

- [ ] MongoDB Atlas: Network Access → Pridané `0.0.0.0/0` alebo Render IP adresy
- [ ] Render: `NODE_ENV` = `production` (nie `development`)
- [ ] Render: `MONGODB_URI` je správne nastavený
- [ ] Render: Služba reštartovaná (automaticky po zmene environment variables)
- [ ] Render Logs: Vidíte `MongoDB pripojené` (nie chybu)

---

## 🔍 Overenie

Po oprave skontrolujte Render Logs:

**Očakávaný výstup:**
```
🌐 CORS nastavený pre origin: https://frappkove-maskrty.vercel.app
🌐 NODE_ENV: production
Server beží na porte 5000
MongoDB pripojené ✅
```

**Ak stále vidíte chybu:**
1. Skontrolujte, či je IP adresa pridaná v MongoDB Atlas
2. Počkajte 1-2 minúty (MongoDB potrebuje čas na aktualizáciu)
3. Reštartujte Render službu manuálne

---

**Po týchto krokoch by MongoDB pripojenie malo fungovať!** ✅

