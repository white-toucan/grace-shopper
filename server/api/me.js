const router = require('express').Router();
const Cart = require('../db/models/cart');
const CartItem = require('../db/models/cartItem');
const Product = require('../db/models/product');

module.exports = router;

router.get('/cart', async (req, res, next) => {
	try {
		if (req.user) {
			const userId = req.user.id;
			let [cart] = await Cart.findOrCreate({where: {userId, isActive: true}});
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
			Promise.all(
				products.map(product => {
					return CartItem.update(
						{purchasePrice: product.price},
						{
							where: {productId: product.id, cartId}
						}
					);
				})
			);

			// "Archive" current cart, effectively creating an order history entry
			await Cart.update(
				{isActive: false},
				{where: {id: cartId, isActive: true}}
			);

			// Create new cart
			let newCart = await Cart.create({userId});
			req.session.cartId = newCart.id; // Set new cartId on session
			res.json(newCart);
		}
	} catch (error) {
		next(error);
	}
});

//get the historical cartIds for the current user (order history)
router.get('/orders', async (req, res, next) => {
	try {
		if (req.user) {
			const userId = req.user.id;
			let cartIdArray = await Cart.findAll({
				attributes: ['id'],
				where: {userId, isActive: false}
			});
			res.json(cartIdArray);
		} else {
			res.sendStatus(404);
		}
	} catch (error) {
		next(error);
	}
});

//get a specific non active cart's products and prices (order history)
router.get('/orders/:cartId', async (req, res, next) => {
	let cartId = +req.params.cartId;
	try {
		if (req.user) {
			const userId = req.user.id;

			let cartItems = await Cart.findAll({
				include: [{model: Product}],
				where: {id: cartId}
			});

			res.json({cartItems});
		} else {
			res.sendStatus(404);
		}
	} catch (error) {
		next(error);
	}
});
