const { expect } = require('chai');
const db = require('../../../server/db');
const Cart = db.model('cart');
const CartItem = db.model('cartItem');
const Product = db.model('product');
const {authUser} = require('./setup')

describe('Cart routes', () => {

	before(async () => {
		// Reset all relevant tables and log in;
		await Promise.all([
			Cart.sync({force: true}),
			Product.sync({force: true}),
			authUser.login()
		]);
		await CartItem.sync({force: true});

		// Seed products and cart
		let products = [
			{name: 'Thing 1', price: 111},
			{name: 'Thing 2', price: 222},
			{name: 'Thing 3', price: 333},
			{name: 'Thing 4', price: 444}
		];

		let [createdCart] = await Promise.all([
			Cart.create({userId: authUser.id}),
			Product.bulkCreate(products),
		]);

		await CartItem.bulkCreate([
			{cartId: createdCart.id, productId: 1},
			{cartId: createdCart.id, productId: 2},
			{cartId: createdCart.id, productId: 3}
		]);

		// Create user's cart
		await authUser.req
			.get('/api/me/cart')
			.set('cookie', authUser.cookie)
	});

	describe('GET /api/cartItems', () => {
		it('returns all products in cart', async () => {
			const res = await authUser.req
				.get('/api/cartItems')
				.set('cookie', authUser.cookie)
				.expect(200);
			expect(res.body).to.be.an('array');
			expect(res.body.length).to.equal(3);
		});
	});

	describe('POST api/cartItems/:productId', () => {
		it('successfully adds to cart', async () => {
			const res = await authUser.req
				.post('/api/cartItems/4')
				.set('cookie', authUser.cookie)
				.expect(200);

			expect(res.body.quantity).to.equal(1);
		});

		it ('successfully adds to cart twice', async () => {
			//uses item seeded into cart
			let res = await authUser.req
				.post('/api/cartItems/1')
				.send({quantity: 2})
				.set('cookie', authUser.cookie)
				.expect(200);

			expect(res.body.quantity).to.equal(3);
		})
	});

	describe('PUT api/cartItems/:productId', () => {
		it('successfully updates cart item quantity', async () => {
			const res = await authUser.req
				.put('/api/cartItems/2')
				.send({quantity: 2})
				.set('cookie', authUser.cookie)
				.expect(200);

			expect(res.body.quantity).to.equal(2);
		});
	});

	describe('DELETE api/cartItems/:productId', () => {
		it('successfully deletes item from cart', () => {
			return authUser.req
				.delete('/api/cartItems/2')
				.set('cookie', authUser.cookie)
				.expect(204);
		});
	});
});
