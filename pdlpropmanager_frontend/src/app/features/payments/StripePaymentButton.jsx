import { useState } from 'react';
import axios from 'axios';

export default function StripePaymentButton({ tenantId, amount }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/v1/payments/checkout-session', {
        tenantId,
        amount,
      });
      window.location.href = res.data.url;
    } catch (error) {
      console.error('Stripe checkout failed:', error);
      alert('Unable to start checkout session.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="btn btn-primary"
      disabled={loading}
    >
      {loading ? 'Processing...' : `Pay $${amount}`}
    </button>
  );
}
