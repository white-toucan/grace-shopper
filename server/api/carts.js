const router = require('express').Router();
const Cart = require('../db/models/cart');
const CartItems = require('../db/models/cartItems');

// Getting or creating new cart
router.get('/active', async (req, res, next) => {
	if (!req.user) {
		res.sendStatus(404);
	}
	else {
		try {
			const { id } = req.user;
			let newCart = await Cart.findOrCreate({where: { userId: id, isActive: true } });
			res.json(newCart);
		} catch (error) {
			next(error);
		}
	}
});

// Get all items in cart
router.get('/:cartId', async (req, res, next) => {
	console.log(req.user);
	const cartId = parseInt(req.params.cartId, 10);
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
	const cartId = parseInt(req.params.cartId, 10);
	const productId = parseInt(req.params.productId, 10);
	const quantity = req.body.quantity ? Number(req.body.quantity) : 1;
	try {
		await CartItems.create({cartId, productId, quantity});
		res.sendStatus(200);
	} catch (error) {
		next(error);
	}
});

// Update item quantity in cart
router.put('/:cartId/update/:productId', async (req, res, next) => {
	const cartId = parseInt(req.params.cartId, 10);
	const productId = parseInt(req.params.productId, 10);
	const quantity = parseInt(req.body.quantity, 10);
	try {
		const entry = await CartItems.findOne({
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
	const cartId = parseInt(req.params.cartId, 10);
	const productId = parseInt(req.params.productId, 10);
	try {
		await CartItems.destroy({ where: { cartId, productId } });
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
