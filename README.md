# E-shop - Full Stack Projekt

Full-stack e-shop aplikácia s React frontendom a Node.js/Express backendom.

## Štruktúra projektu

```
eshop/
│
├── backend/
│   ├── src/
│   │   ├── models/        ← databázové schémy
│   │   ├── routes/        ← API endpointy (products, orders, users)
│   │   ├── controllers/   ← logika
│   │   ├── middleware/    ← autentifikácia, autorizácia
│   │   └── index.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/    ← React komponenty
│   │   ├── pages/         ← React Router alebo Next.js pages
│   │   ├── styles/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

## Inštalácia

### Backend

```bash
cd backend
npm install
```

Vytvorte súbor `.env` na základe `.env.example` a nastavte potrebné premenné.

```bash
npm run dev
```

Backend beží na `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
```

```bash
npm run dev
```

Frontend beží na `http://localhost:3000`

## Technológie

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT pre autentifikáciu
- bcryptjs pre hashovanie hesiel

### Frontend
- React
- React Router
- Vite
- Axios pre API volania

## API Endpointy

### Products
- `GET /api/products` - Získať všetky produkty (podpora query parametrov: `category`, `search`)
- `GET /api/products/:id` - Získať produkt podľa ID
- `POST /api/products` - Vytvoriť produkt (admin)
- `PUT /api/products/:id` - Aktualizovať produkt (admin)
- `DELETE /api/products/:id` - Zmazať produkt (admin)

### Users
- `POST /api/users/register` - Registrácia nového užívateľa
- `POST /api/users/login` - Prihlásenie
- `GET /api/users/profile` - Získať profil užívateľa (chránené)
- `PUT /api/users/profile` - Aktualizovať profil (chránené)

### Orders
- `POST /api/orders` - Vytvoriť objednávku (chránené)
- `GET /api/orders/my-orders` - Získať objednávky užívateľa (chránené)
- `GET /api/orders/:id` - Získať objednávku podľa ID (chránené)
- `GET /api/orders` - Získať všetky objednávky (admin)
- `PUT /api/orders/:id/status` - Aktualizovať status objednávky (admin)

### Health Check
- `GET /api/health` - Health check

## Funkcie

### Backend
✅ **Modely:**
- Product (názov, popis, cena, obrázok, kategória, sklad)
- User (meno, email, heslo, role, adresa)
- Order (užívateľ, položky, celková suma, status, adresa doručenia)

✅ **Autentifikácia:**
- JWT token-based autentifikácia
- Hashovanie hesiel pomocou bcryptjs
- Middleware pre ochranu routes
- Admin role kontrola

✅ **API:**
- CRUD operácie pre produkty
- Správa objednávok
- Užívateľské účty a profily

### Frontend
✅ **Stránky:**
- Homepage s odporúčanými produktmi
- Zoznam produktov s filtrami (kategória, vyhľadávanie)
- Detail produktu
- Košík s možnosťou úpravy množstva
- Prihlásenie a registrácia
- Zobrazenie objednávok užívateľa

✅ **Komponenty:**
- Header s navigáciou a košíkom
- ProductCard pre zobrazenie produktov
- Responsive dizajn

✅ **State Management:**
- AuthContext pre správu užívateľských dát
- CartContext pre správu košíka (localStorage)

## Štruktúra súborov

### Backend
- `src/models/` - Mongoose schémy (Product, User, Order)
- `src/controllers/` - Business logika (productController, userController, orderController)
- `src/routes/` - API routes (productRoutes, userRoutes, orderRoutes)
- `src/middleware/` - Autentifikačné middleware (auth.js)

### Frontend
- `src/pages/` - React stránky (Home, Products, ProductDetail, Cart, Login, Register, Orders)
- `src/components/` - React komponenty (Header, ProductCard)
- `src/context/` - Context providers (AuthContext, CartContext)
- `src/services/` - API služby (api.js)

## Dokumentácia

- **PREPOJENIE-SLUZIEB.md** 🔗 ⭐ - Ako prepojiť všetky služby (Render, Vercel, MongoDB, Stripe)
- **PRODUKCIA-READY.md** 🎉 - Finálny checklist a testovanie produkcie
- **DEPLOYMENT-SLOVAKIA.md** 🇸🇰 - Nasadenie na slovenských hostingoch (WebSupport, Platon)
- **DEPLOYMENT-EUROPE.md** 🇪🇺 - Nasadenie pre Slovensko (evropské cloud servery)
- **DEPLOYMENT-GUIDE.md** - Kompletný návod na produkčné nasadenie
- **QUICK-DEPLOY.md** - Rýchly start (5 minút)
- **STRIPE.md** - Nastavenie a testovanie Stripe platieb
- **MONGODB.md** - Nastavenie MongoDB (Atlas alebo lokálna inštalácia)
- **SPUSTENIE.md** - Inštrukcie na spustenie projektu
- **PRODUKCNE-NASADENIE.md** - Príprava na produkčné nasadenie
- **SPRAVA-OBJEDNAVOK.md** - Správa objednávok v systéme
- **VYTVORENIE-ADMIN.md** - Vytvorenie administrátorského účtu
- **KONFIGURACIA-EMAIL.md** - Nastavenie email notifikácií

## Licencia

ISC

