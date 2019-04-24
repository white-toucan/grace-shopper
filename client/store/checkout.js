import axios from 'axios';
import {STRIPE_CLIENT_KEY} from '../components/util/constants';

var stripe = Stripe(STRIPE_CLIENT_KEY);

const redirectToCheckout = sessionId => async dispatch => {
  try {
    const result = await stripe.redirectToCheckout({
      sessionId
    });
    if (result.error) {
      // const error = result.error.message;
      console.error(result.error.message);
    }
    else {
      dispatch()
    }
  } catch (error) {
    console.error(error);
  }
}

export const createCheckoutSession = cartItems => async dispatch => {
  try {
    const {data: session} = await axios.post('/api/checkout/session', cartItems);
    dispatch(redirectToCheckout(session.id));
  } catch (error) {
    console.error(error);
  }
}
