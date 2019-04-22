const router = require('express').Router();
const Cart = require('../db/models/cart');
const CartItem = require('../db/models/cartItem');

module.exports = router;

router.get('/cart', async(req, res, next) => {
  let cart;
  try {

    if (req.user) {
      const userId = req.user.id;
      // Update cart in session with information about latest active cart
      [cart] = await Cart.findOrCreate({where: { userId, isActive: true } });
    } else {
      const sessionId = req.sessionID;
      [cart] = await Cart.findOrCreate({where: { sessionId, isActive: true } });
    }
    req.session.cartId = cart.id;
    res.json(cart);
  } catch (error) {
    next(error);
  }
});

// Checkout cart
router.put('/cart', async (req, res, next) => {
	try {
		const userId = req.user.id;

		let paymentConfirmed = true;
		if (paymentConfirmed) {
			const cartId = req.session.cartId;
			let cart = await Cart.findByPk(cartId);
			let products = await cart.getProducts();

			// "Freeze" current prices for cartItems in cart
			Promise.all(products.map(product => {
				return CartItem.update({purchasePrice: product.price},
					{where: {productId: product.id, cartId }
				});
			}));

			// "Archive" current cart, effectively creating an order history entry
			await Cart.update({isActive: false}, {where: {id: cartId, isActive: true} });

			// Create new cart
			let newCart = await Cart.create({ userId });
			req.session.cartId = newCart.id; // Set new cartId on session
			res.json(newCart);
		}

	} catch (error) {
		next(error);
	}

});
