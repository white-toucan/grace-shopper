const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Cart = db.model('cart');
const CartItem = db.model('cartItem');
const User = db.model('user');
const Product = db.model('product');

describe('Cart routes', () => {

	before(async () => {
		await db.sync({force: true});

		let products = [
			{name: 'Thing 1', price: 111},
			{name: 'Thing 2', price: 222},
			{name: 'Thing 3', price: 333},
			{name: 'Thing 4', price: 444}
		];

		Promise.all([
			User.create({
				email: 'cody@email.com',
				password: '123456'
			}),
			Product.bulkCreate(products),
			Cart.create({})
		]).then(() => {
				CartItem.bulkCreate([
					{cartId: 1, productId: 1},
					{cartId: 1, productId: 2},
					{cartId: 1, productId: 3}
				]);
		});
	});

	describe('GET /api/carts/:userId/active', () => {

		it('returns active cart from userId', async () => {
			const res = await request(app)
				.get('/api/carts/1/active')
				.expect(200);
			expect(res.body.id).to.be.a('number');
		});
	});

	describe('GET /api/carts/:cartId', () => {

		it('returns all products in cart', async () => {
			const res = await request(app)
				.get('/api/carts/1')
				.expect(200);
			expect(res.body).to.be.an('array');
			expect(res.body.length).to.equal(3);
		});
	});

	describe('POST api/carts/:cartId/add/:productId', () => {

		it('successfully adds to cart', async () => {
			const res = await request(app)
				.post('/api/carts/1/add/4')
				.expect(200);
		});
	});

	describe('PUT api/carts/:cartId/update/:productId', () => {

		it('successfully updates cart item quantity', async () => {
			const res = await request(app)
				.put('/api/carts/1/update/2')
				.send({quantity: 2})
				.expect(200);
			expect(res.body.quantity).to.equal(2);
		});
	});

	describe('DELETE api/carts/:cardId', () => {

		it('successfully deletes item from cart', () => {
			return request(app)
				.delete('/api/carts/1/remove/2')
				.expect(204);
		});
	});
});
