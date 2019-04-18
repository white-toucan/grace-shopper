const router = require('express').Router();
const Cart = require('../db/models/cart');
const CartItem = require('../db/models/cartItem');

// Getting or creating new cart
router.get('/:userId/active', async (req, res, next) => {
	try {
		const userId = +req.params.userId;
		let [cart] = await Cart.findOrCreate({where: { userId, isActive: true } });
		res.json(cart);
	} catch (error) {
		next(error);
	}
});

// Get all items in cart
router.get('/:cartId', async (req, res, next) => {
	const cartId = +req.params.cartId;
	try {
		let products = await Cart.findByPk(cartId)
			.then(cart => cart.getProducts());

		if (products) res.json(products);
		else res.sendStatus(404);
	} catch (error) {
		next(error);
	}
});

// Add item to cart
router.post('/:cartId/add/:productId', async (req, res, next) => {
	const cartId = +req.params.cartId;
	const productId = +req.params.productId;
	const quantity = req.body.quantity ? +req.body.quantity : 1;
	try {
		await CartItem.create({cartId, productId, quantity});
		res.sendStatus(200);
	} catch (error) {
		next(error);
	}
});

// Update item quantity in cart
router.put('/:cartId/update/:productId', async (req, res, next) => {
	const cartId = +req.params.cartId;
	const productId = +req.params.productId;
	const quantity = +req.body.quantity;
	try {
		const entry = await CartItem.findOne({
			where: { cartId, productId }
		});
		if (entry) {
			const updated = await entry.update({ quantity });
			res.status(200).json(updated);
		}
		else res.sendStatus(404);
	} catch (error) {
		next(error);
	}
});

// Remove item from cart
router.delete('/:cartId/remove/:productId', async (req, res, next) => {
	const cartId = +req.params.cartId;
	const productId = +req.params.productId;
	try {
		await CartItem.destroy({ where: { cartId, productId } });
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
