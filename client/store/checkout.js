import axios from 'axios';
var stripe = Stripe(process.env.STRIPE_SECRET);
console.log(process.env.STRIPE_SECRET)

const SET_CHECKOUT_SESSION = 'SET_CHECKOUT_SESSION';

const setCheckoutSession = sessionId => ({
  type: SET_CHECKOUT_SESSION,
  sessionId
});

export const createCheckoutSession = (cartItems) => async dispatch => {
  try {
    const {data: session} = await axios.post('/api/me/checkout/', cartItems);
    dispatch(setCheckoutSession(session.id));
    dispatch(redirectToCheckout());
  } catch (error) {
    console.error(error);
  }
}

const redirectToCheckout = sessionId => async dispatch => {
  try {
    const redirect = stripe.redirectToCheckout({
      sessionId
    });
    history.push(redirect);
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
