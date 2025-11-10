import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ordersAPI, paymentsAPI } from '../services/api';
import { toast } from 'react-toastify';
import './Checkout.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_...');

const CheckoutForm = ({ orderId, amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await paymentsAPI.createIntent({ orderId });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Chyba pri vytváraní platby';
        toast.error(errorMessage);
        console.error('Chyba pri vytváraní payment intentu:', error);
        console.error('Detail chyby:', error.response?.data);
        console.error('Status:', error.response?.status);
        console.error('Celá odpoveď:', JSON.stringify(error.response?.data, null, 2));
      }
    };

    if (orderId) {
      createPaymentIntent();
    }
  }, [orderId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      }
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
    } else if (paymentIntent.status === 'succeeded') {
      try {
        await paymentsAPI.confirm({ paymentIntentId: paymentIntent.id, orderId });
        toast.success('Platba bola úspešná!');
        onSuccess();
      } catch (error) {
        toast.error('Chyba pri potvrdení platby');
      }
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <div className="card-element-container">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
            },
          }}
        />
      </div>
      <button
        type="submit"
        disabled={!stripe || !clientSecret || loading}
        className="btn-pay"
      >
        {loading ? 'Spracovávam...' : `Zaplatiť ${amount.toFixed(2)} €`}
      </button>
    </form>
  );
};

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (cartItems.length === 0) {
      navigate('/cart');
      return;
    }
    createOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createOrder = async () => {
    try {
      setLoading(true);
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        })),
        shippingAddress: user.address || {},
        paymentMethod: 'card'
      };

      const response = await ordersAPI.create(orderData);
      setOrderId(response.data._id);
    } catch (error) {
      toast.error('Chyba pri vytváraní objednávky');
      console.error('Chyba:', error);
      navigate('/cart');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    clearCart();
    navigate('/orders');
  };

  if (loading || !orderId) {
    return <div className="loading">Pripravujem platbu...</div>;
  }

  return (
    <div className="checkout-page">
      <h1>Platba</h1>
      <div className="checkout-container">
        <div className="order-summary">
          <h2>Sumár objednávky</h2>
          <div className="order-items">
            {cartItems.map((item) => (
              <div key={item.productId} className="order-item">
                <span>{item.product.name}</span>
                <span>{item.quantity} × {item.product.price.toFixed(2)} €</span>
              </div>
            ))}
          </div>
          <div className="order-total">
            <strong>Celkom: {getTotalPrice().toFixed(2)} €</strong>
          </div>
        </div>

        <div className="payment-section">
          <h2>Platobné údaje</h2>
          <Elements stripe={stripePromise}>
            <CheckoutForm
              orderId={orderId}
              amount={getTotalPrice()}
              onSuccess={handlePaymentSuccess}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

