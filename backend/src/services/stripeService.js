// Validácia Stripe klúča
const stripeKey = process.env.STRIPE_SECRET_KEY || '';

// Kontrola, či je kľúč nastavený a platný
const isValidKey = stripeKey && 
                   stripeKey.trim().length > 20 &&
                   !stripeKey.includes('YOUR_SECRET_KEY_HERE') &&
                   (stripeKey.startsWith('sk_test_') || stripeKey.startsWith('sk_live_'));

if (!isValidKey) {
  console.warn('⚠️  STRIPE_SECRET_KEY nie je nastavený alebo má neplatnú hodnotu!');
  if (stripeKey) {
    console.warn('   Aktuálna hodnota:', stripeKey.substring(0, Math.min(30, stripeKey.length)) + (stripeKey.length > 30 ? '...' : ''));
  } else {
    console.warn('   Hodnota: nie je nastavený');
  }
  console.warn('   Nastavte STRIPE_SECRET_KEY v backend/.env súbore');
}

// Inicializovať Stripe len ak má platný kľúč
let stripe = null;
if (isValidKey) {
  try {
    stripe = require('stripe')(stripeKey.trim());
    console.log('✅ Stripe inicializovaný úspešne');
  } catch (error) {
    console.error('❌ Chyba pri inicializácii Stripe:', error.message);
    stripe = null;
  }
}

// Vytvoriť payment intent
exports.createPaymentIntent = async (amount, currency = 'eur', metadata = {}) => {
  if (!stripe) {
    throw new Error('Stripe nie je nakonfigurovaný. Nastavte STRIPE_SECRET_KEY v .env súbore.');
  }

  try {
    if (!amount || amount <= 0) {
      throw new Error('Neplatná suma platby');
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe používa centy
      currency: currency.toLowerCase(),
      metadata: metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    };
  } catch (error) {
    console.error('Stripe error:', error);
    // Vrátiť detailnejšiu chybovú správu
    if (error.type === 'StripeInvalidRequestError') {
      throw new Error(`Stripe chyba: ${error.message}`);
    }
    throw new Error(`Chyba pri vytváraní platobného intentu: ${error.message}`);
  }
};

// Potvrdiť platbu
exports.confirmPayment = async (paymentIntentId) => {
  if (!stripe) {
    throw new Error('Stripe nie je nakonfigurovaný. Nastavte STRIPE_SECRET_KEY v .env súbore.');
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return {
      status: paymentIntent.status,
      paid: paymentIntent.status === 'succeeded'
    };
  } catch (error) {
    console.error('Stripe error:', error);
    throw new Error(`Chyba pri overovaní platby: ${error.message}`);
  }
};

// Webhook handler pre Stripe
exports.handleWebhook = (req, res) => {
  if (!stripe) {
    console.error('Stripe nie je nakonfigurovaný pre webhook');
    return res.status(500).send('Stripe nie je nakonfigurovaný');
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Spracovať event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Payment succeeded:', paymentIntent.id);
      // Tu môžete aktualizovať objednávku v databáze
      break;
    case 'payment_intent.payment_failed':
      console.log('Payment failed:', event.data.object.id);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

