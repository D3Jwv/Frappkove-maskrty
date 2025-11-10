const nodemailer = require('nodemailer');

// Vytvorenie email transportu
const createTransporter = () => {
  // Pre vývoj - môžete použiť Gmail alebo iný SMTP server
  // Pre produkciu odporúčam SendGrid, Mailgun alebo AWS SES
  
  if (process.env.EMAIL_SERVICE === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // App password pre Gmail
      }
    });
  }

  // Všeobecný SMTP
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Email pri vytvorení objednávky
exports.sendOrderConfirmation = async (order, user) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: user.email,
      subject: `Potvrdenie objednávky #${order._id.toString().slice(-8)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">Ďakujeme za vašu objednávku!</h2>
          <p>Vážený/á ${user.name},</p>
          <p>Vaša objednávka bola úspešne vytvorená.</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Detaily objednávky:</h3>
            <p><strong>Číslo objednávky:</strong> #${order._id.toString().slice(-8)}</p>
            <p><strong>Dátum:</strong> ${new Date(order.createdAt).toLocaleDateString('sk-SK')}</p>
            <p><strong>Status:</strong> ${getStatusText(order.status)}</p>
            <p><strong>Celková suma:</strong> ${order.totalAmount.toFixed(2)} €</p>
          </div>

          <h3>Položky:</h3>
          <ul>
            ${order.items.map(item => `
              <li>${item.product?.name || 'Produkt'}: ${item.quantity} × ${item.price.toFixed(2)} €</li>
            `).join('')}
          </ul>

          <p>Sledovať stav objednávky môžete na: <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/orders">Moje objednávky</a></p>
          
          <p style="margin-top: 30px; color: #666;">S pozdravom,<br>E-shop tím</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Email odoslaný:', user.email);
  } catch (error) {
    console.error('Chyba pri odosielaní emailu:', error);
    // Nevyhadzuj chybu - email nie je kritický
  }
};

// Email pri zmene statusu objednávky
exports.sendOrderStatusUpdate = async (order, user, oldStatus) => {
  try {
    const transporter = createTransporter();
    
    const statusMessages = {
      processing: 'Vaša objednávka sa začala spracovávať.',
      shipped: 'Vaša objednávka bola odoslaná.',
      delivered: 'Vaša objednávka bola doručená. Ďakujeme za nákup!',
      cancelled: 'Vaša objednávka bola zrušená.'
    };

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: user.email,
      subject: `Aktualizácia objednávky #${order._id.toString().slice(-8)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">Aktualizácia objednávky</h2>
          <p>Vážený/á ${user.name},</p>
          <p>${statusMessages[order.status] || 'Status vašej objednávky bol zmenený.'}</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Číslo objednávky:</strong> #${order._id.toString().slice(-8)}</p>
            <p><strong>Nový status:</strong> ${getStatusText(order.status)}</p>
          </div>

          <p>Sledovať stav objednávky môžete na: <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/orders">Moje objednávky</a></p>
          
          <p style="margin-top: 30px; color: #666;">S pozdravom,<br>E-shop tím</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Status update email odoslaný:', user.email);
  } catch (error) {
    console.error('Chyba pri odosielaní emailu:', error);
  }
};

// Email pre reset hesla
exports.sendPasswordReset = async (user, resetToken) => {
  try {
    const transporter = createTransporter();
    
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: user.email,
      subject: 'Reset hesla - E-shop',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">Reset hesla</h2>
          <p>Vážený/á ${user.name},</p>
          <p>Dostali sme žiadosť o reset vášho hesla.</p>
          <p>Kliknite na tlačidlo nižšie pre reset hesla:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #3498db; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; display: inline-block;">
              Resetovať heslo
            </a>
          </div>

          <p>Alebo skopírujte tento link do prehliadača:</p>
          <p style="color: #666; word-break: break-all;">${resetUrl}</p>

          <p style="color: #e74c3c; margin-top: 20px;"><strong>Pozor:</strong> Tento link je platný len 1 hodinu.</p>
          <p style="color: #666; margin-top: 20px;">Ak ste nežiadali reset hesla, ignorujte tento email.</p>
          
          <p style="margin-top: 30px; color: #666;">S pozdravom,<br>E-shop tím</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Password reset email odoslaný:', user.email);
  } catch (error) {
    console.error('Chyba pri odosielaní emailu:', error);
    throw error; // Pre reset hesla je email kritický
  }
};

// Pomocná funkcia pre status text
const getStatusText = (status) => {
  const texts = {
    pending: 'Čaká na spracovanie',
    processing: 'Spracováva sa',
    shipped: 'Odoslané',
    delivered: 'Doručené',
    cancelled: 'Zrušené'
  };
  return texts[status] || status;
};

