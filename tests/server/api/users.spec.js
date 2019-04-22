/* global describe beforeEach it */

const {expect} = require('chai');
const request = require('supertest');
const app = require('../../../server/index');
const {authAdmin} = require('./setup');

describe('User routes', () => {
	before(async () => {
		await authAdmin.login();
	})

	describe('/api/users/', () => {
		it('GET /api/users', async () => {
			const res = await authAdmin.req
				.get('/api/users')
				.set('cookie', authAdmin.cookie)
				.expect(200);

			expect(res.body).to.be.an('array');
			expect(res.body).to.deep.contain({email: authAdmin.email, id: authAdmin.id});
		});

		it('GET /api/users returns 401 for not logged in users', () => {
			return request(app)
				.get('/api/users')
				.expect(401);
		});
	}); // end describe('/api/users')
}); // end describe('User routes')
