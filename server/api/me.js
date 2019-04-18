const router = require('express').Router();
const Cart = require('../db/models/cart');

module.exports = router;

router.get('/cart', async(req, res, next) => {
  try {
    if (req.user) {
      const userId = req.user.id;
      let [cart] = await Cart.findOrCreate({where: { userId, isActive: true } });
      // Update cart in session with information about latest active cart
      req.session.cartId = cart.id;
      res.json(cart);
    // TODO: guest path
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});
