import axios from 'axios';
import history from '../history';
import {} from '../store'
import {STRIPE_CLIENT_KEY} from '../components/util/constants';


var stripe = Stripe(STRIPE_CLIENT_KEY);

const SET_CHECKOUT_SESSION = 'SET_CHECKOUT_SESSION';

const setCheckoutSession = sessionId => ({
  type: SET_CHECKOUT_SESSION,
  sessionId
});

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
    console.log(cartItems);
    const {data: session} = await axios.post('/api/checkout/session', cartItems);
    dispatch(setCheckoutSession(session.id));
    dispatch(redirectToCheckout(session.id));
  } catch (error) {
    console.error(error);
  }
}

const initialState = {
  sessionId: '',
}

export default function(prevState = initialState, action) {
  const stateCopy = {...prevState};
  switch(action.type) {
    case SET_CHECKOUT_SESSION:
      stateCopy.sessionId = action.sessionId;
      return stateCopy;
    default:
      return stateCopy;
  }
}
