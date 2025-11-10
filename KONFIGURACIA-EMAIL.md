# Konfigurácia Email služby

## Nastavenie emailu pre e-shop

### 1. Gmail (pre vývoj/testovanie)

1. **Vytvorte App Password:**
   - Choďte na https://myaccount.google.com/apppasswords
   - Vytvorte nové App Password pre "Mail"
   - Skopírujte vygenerované heslo

2. **Pridajte do `.env`:**
```env
EMAIL_SERVICE=gmail
EMAIL_USER=vasa-email@gmail.com
EMAIL_PASS=app-password-z-google
EMAIL_FROM=vasa-email@gmail.com
FRONTEND_URL=http://localhost:3000
```

### 2. SendGrid (pre produkciu - odporúčané)

1. **Vytvorte účet na SendGrid:**
   - Choďte na https://sendgrid.com
   - Vytvorte účet a verifikujte email
   - Vytvorte API Key

2. **Pridajte do `.env`:**
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
EMAIL_FROM=noreply@vasadomena.sk
FRONTEND_URL=https://vasadomena.sk
```

### 3. Mailgun (alternatíva)

1. **Vytvorte účet na Mailgun**
2. **Pridajte do `.env`:**
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
EMAIL_USER=postmaster@vasadomena.mailgun.org
EMAIL_PASS=your-mailgun-password
EMAIL_FROM=noreply@vasadomena.sk
FRONTEND_URL=https://vasadomena.sk
```

### 4. Testovanie emailu

Vytvorte testovací skript `test-email.js`:

```javascript
const emailService = require('./src/services/emailService');
const User = require('./src/models/User');

(async () => {
  const testUser = {
    name: 'Test User',
    email: 'test@example.com'
  };
  
  const testOrder = {
    _id: { toString: () => '12345678' },
    totalAmount: 99.99,
    items: [{ product: { name: 'Test Product' }, quantity: 1, price: 99.99 }],
    createdAt: new Date()
  };

  try {
    await emailService.sendOrderConfirmation(testOrder, testUser);
    console.log('Email odoslaný úspešne!');
  } catch (error) {
    console.error('Chyba:', error);
  }
})();
```

Spustite: `node test-email.js`

---

## Poznámky

- **Gmail:** Má limit 500 emailov/deň
- **SendGrid:** 100 emailov/deň zdarma
- **Mailgun:** 5000 emailov/mesiac zdarma
- Pre produkciu odporúčam SendGrid alebo Mailgun

