import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';

const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_payment_Gateway_PK)
    return (
        <div>
            <Elements stripe={stripePromise}>
                    
                </Elements>
        </div>
    );
};

export default Payment;