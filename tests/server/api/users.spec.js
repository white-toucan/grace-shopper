/* global describe beforeEach it */

const {expect} = require('chai');
const request = require('supertest');
const db = require('../../../server/db');
const app = require('../../../server/index');
const User = db.model('user');

describe('User routes', () => {
	let authUser = request(app);
	let cookie;

	beforeEach(() => {
		return db.sync({force: true});
	});

	describe('/api/users/', () => {
		const codysEmail = 'cody@puppybook.com';

		beforeEach(async () => {
			let user = {email: codysEmail, password: '123', isAdmin: true};
			await User.create(user);

			let loggedIn = await authUser.post('/auth/login').send(user);

			cookie = loggedIn.headers['set-cookie'];
		});

		it('GET /api/users', async () => {
			const res = await request(app)
				.get('/api/users')
				.set('cookie', cookie)
				.expect(200);

			expect(res.body).to.be.an('array');
			expect(res.body[0].email).to.be.equal(codysEmail);
		});
		it('GET /api/users returns 401 for not logged in users', () => {
			return request(app)
				.get('/api/users')
				.expect(401);
		});
	}); // end describe('/api/users')
}); // end describe('User routes')
