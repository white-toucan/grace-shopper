
const router = require('express').Router();
const Cart = require('../db/models/cart');
const CartItem = require('../db/models/cartItem');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
module.exports = router;

router.post('/session', async(req, res, next) => {
  const {cartId} = req.session
  try {
    const lineItems = req.body.map(({price, name, description, quantity}) => ({
      amount: price,
      currency: 'usd',
      name,
      description,
      quantity
    }));

    const checkoutSession = await stripe.checkout.sessions.create({
      success_url: `${BASE_URL}/checkout/confirmation`,
      cancel_url: `${BASE_URL}/cart`,
      payment_method_types: ['card'],
      line_items: lineItems
    });

    const cart = await Cart.findByPk(cartId)
    await cart.update({
      checkoutSessionId: checkoutSession.id
    });

    res.json(checkoutSession);
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
      const checkoutSessionId = session.id;

      const cart = await Cart.findOne({
        where: {checkoutSessionId}
      });
			let products = await cart.getProducts();

			// "Freeze" current prices for cartItems in cart
			Promise.all(
				products.map(product => {
					return CartItem.update(
						{purchasePrice: product.price},
						{
							where: {productId: product.id, cartId: cart.id}
						}
					);
				})
			);

			// "Archive" current cart, effectively creating an order history entry
			await Cart.update(
				{isActive: false},
				{where: {id: cart.id, isActive: true}}
			);

      // Commenting out. Relying on the page redirect to create our cart for us. Otherwise we might be creating too many duplicate carts
			// Create new cart
			// let newCart = cart.userId
			// 	? await Cart.create({userId: cart.userId})
			// 	: await Cart.create({sessionId: cart.sessionId});
			// req.session.cartId = newCart.id; // Set new cartId on session
			// res.json(newCart);
    }

    // Return a response to acknowledge receipt of the event
    res.json({received: true});
  }
  catch (err) {
    next(err);
  }
});
