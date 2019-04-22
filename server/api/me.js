const router = require('express').Router();
const Cart = require('../db/models/cart');

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
