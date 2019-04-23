const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const BASE_URL = process.env.BASE_URL || 'http://localhost:8080'

module.exports = router;

router.post('/session', async(req, res, next) => {
  try {
    console.log(req.body);
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
