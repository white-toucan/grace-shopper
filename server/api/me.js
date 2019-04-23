const router = require('express').Router();
const Cart = require('../db/models/cart');
const CartItem = require('../db/models/cartItem');
const Product = require('../db/models/product');

module.exports = router;

router.get('/cart', async (req, res, next) => {
	let cart;
	try {
		if (req.user) {
			const userId = req.user.id;
			// Update cart in session with information about latest active cart
			[cart] = await Cart.findOrCreate({where: {userId, isActive: true}});
		} else {
			const sessionId = req.sessionID;
			[cart] = await Cart.findOrCreate({where: {sessionId, isActive: true}});
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
			let newCart = req.user
				? await Cart.create({userId: req.user.id})
				: await Cart.create({sessionId: req.sessionID});
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

			let cart = await Cart.findOne({
				include: [{model: Product}],
				where: {id: cartId}
			});

			let productsFlat = cart.products.map(product => {
				return {
					productId: product.id,
					productName: product.name,
					imageUrl: product.imageUrl,
					quantity: product.cartItem.quantity,
					purchasePrice: product.cartItem.purchasePrice
				};
			});

			let response = {
				id: cart.id,
				updatedAt: cart.updatedAt
			};

			response.products = productsFlat;

			res.json(response);
		} else {
			res.sendStatus(404);
		}
	} catch (error) {
		next(error);
	}
});
