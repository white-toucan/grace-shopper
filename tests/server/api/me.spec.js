const {expect} = require('chai');
const db = require('../../../server/db');
const Cart = db.model('cart');
const {authUser} = require('./setup');

describe('Me routes', () => {

	before(async () => {
    await Cart.sync({force: true});
    await authUser.login();
	});

	describe('GET /me/cart', () => {
		it('should return a cart for a logged in user', async () => {
			let myCart = await authUser.req
				.get('/api/me/cart')
				.set('cookie', authUser.cookie)
				.expect(200);
			expect(myCart.body.id).to.be.a('number');
		});

		it('should return 404 for unauthenticated users', () => {
			return authUser.req.get('/api/me/cart').expect(404);
		});
	});
});
