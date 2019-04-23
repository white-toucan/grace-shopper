
const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
module.exports = router;

router.post('/session', async(req, res, next) => {
  try {
    const lineItems = req.body.map(({price, name, description, quantity}) => ({
      amount: price,
      currency: 'usd',
      name,
      description,
      quantity
    }));

    const session = await stripe.checkout.sessions.create({
      success_url: `${BASE_URL}/checkout/confirmation`,
      cancel_url: `${BASE_URL}/cart`,
      payment_method_types: ['card'],
      line_items: lineItems
    });

    res.json(session);
  } catch (error) {
    next(error);
  }
});

router.get('/session/:id', async(req, res, next) => {
  try {
    const sessionId = req.params.id;
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);
    res.json(checkoutSession);
  } catch (error) {
    next(error);
  }
});

router.post('/webhook', async (req, res, next ) => {
  let sig = req.headers['stripe-signature'];

  try {
    const event = await stripe.webhooks.constructEvent(req.rawBody, sig, STRIPE_WEBHOOK_SECRET);

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      // Fulfill the purchase...

    }

    // Return a response to acknowledge receipt of the event
    res.json({received: true});
  }
  catch (err) {
    next(err);
  }
});
