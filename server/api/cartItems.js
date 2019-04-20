const router = require('express').Router();
const Cart = require('../db/models/cart');
const CartItem = require('../db/models/cartItem');

// Get all items in cart
router.use('/*', (req, res, next) => {
	if (!req.user) return res.sendStatus(404);
	next();
})

router.get('/', async (req, res, next) => {
	const {cartId} = req.session;

	try {
		let products = await Cart.findByPk(cartId)
			.then(cart => cart.getProducts());

		let productsRes = products.map(({id, name, price, imageUrl, cartItem}) => ({
			id,
			name,
			price,
			imageUrl,
			quantity: cartItem.quantity
		}))
		res.json(productsRes || []);
	} catch (error) {
		next(error);
	}
});

// Add item to cart
router.post('/:productId', async (req, res, next) => {
	const {cartId} = req.session;
	const productId = +req.params.productId;
	const quantity = req.body.quantity ? +req.body.quantity : 1;
	try {
		let [cartItem, created] = await CartItem.findOrCreate({
			where: {
				cartId, productId
			},
			defaults: {cartId, productId, quantity}
		});

		if (!created) {
			cartItem.update({quantity: cartItem.quantity + quantity});
		}
		res.json(cartItem);
	} catch (error) {
		next(error);
	}
});

// Update item quantity in cart
router.put('/:productId', async (req, res, next) => {
	const {cartId} = req.session;
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
router.delete('/:productId', async (req, res, next) => {
	const {cartId} = req.session;
	const productId = +req.params.productId;
	try {
		await CartItem.destroy({ where: { cartId, productId } });
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
