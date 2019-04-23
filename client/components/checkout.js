import React from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

const Checkout = props => (
  <StripeProvider apiKey="pk_test_9ShC3y9dRZOvEdQkiEluXxp600pIVcObu4">
    <div className="example">
      <h1>React Stripe Elements Example</h1>
      <Elements>
        <CheckoutForm />
      </Elements>
    </div>
  </StripeProvider>
);

export default Checkout;
