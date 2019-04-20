const { expect } = require('chai');
const request = require('supertest');
const db = require('../../../server/db');
const app = require('../../../server');
const Cart = db.model('cart');
const CartItem = db.model('cartItem');
const User = db.model('user');
const Product = db.model('product');

describe('Cart routes', () => {
	let authUser = request(app);
	let cookie;

	before(async () => {
		await db.sync({force: true});

		let products = [
			{name: 'Thing 1', price: 111},
			{name: 'Thing 2', price: 222},
			{name: 'Thing 3', price: 333},
			{name: 'Thing 4', price: 444}
		];

		const user = {
			email: 'cody@email.com',
			password: '123456'
		}

		let [createdUser] = await Promise.all([
			User.create(user),
			Product.bulkCreate(products),
		]);
		let createdCart = await Cart.create({userId: createdUser.id});
		await CartItem.bulkCreate([
			{cartId: createdCart.id, productId: 1},
			{cartId: createdCart.id, productId: 2},
			{cartId: createdCart.id, productId: 3}
		]);

		let loggedIn = await authUser
      .post('/auth/login')
			.send(user)

		cookie = loggedIn.headers['set-cookie'];

		await authUser
			.get('/api/me/cart')
			.set('cookie', cookie)
	});

	// after(async () => {
	// 	await db.close();
	// });

	describe('GET /api/cartItems', () => {

		it('returns all products in cart', async () => {
			const res = await authUser
				.get('/api/cartItems')
				.set('cookie', cookie)
				.expect(200);
			expect(res.body).to.be.an('array');
			expect(res.body.length).to.equal(3);
		});
	});

	describe('POST api/cartItems/:productId', () => {

		it('successfully adds to cart', () => {
			return authUser
				.post('/api/cartItems/4')
				.set('cookie', cookie)
				.expect(200);
		});
	});

	describe('PUT api/cartItems/:productId', () => {

		it('successfully updates cart item quantity', async () => {
			const res = await authUser
				.put('/api/cartItems/2')
				.send({quantity: 2})
				.set('cookie', cookie)
				.expect(200);
			expect(res.body.quantity).to.equal(2);
		});
	});

	describe('DELETE api/cartItems/:productId', () => {

		it('successfully deletes item from cart', () => {
			return authUser
				.delete('/api/cartItems/2')
				.set('cookie', cookie)
				.expect(204);
		});
	});
});
