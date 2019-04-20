const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Product = db.model('product');

describe('GET /products/', () => {
	beforeEach(() => {
		return db.sync({force: true});
	});

	describe('/api/products/', () => {
		const banana = 'banana';

		beforeEach(() => {
			return Product.create({
				name: banana,
				price: 33
			});
		});

		it('GET /api/products', async () => {
			const res = await request(app)
				.get('/api/products')
				.expect(200);

			expect(res.body).to.be.an('array');
			expect(res.body[0].name).to.be.equal(banana);
		});
	}); // end describe('/api/products')
}); // end describe('Product routes')

describe('GET /products/:id', () => {
	let oneProduct;

	beforeEach(async () => {
		// await db.sync({force: true});

		const creatingProducts = [
			{
				name: 'Boring product',
				description: 'This product is boring',
				price: 888
			},
			{
				name: 'Cool product',
				price: 367
			},
			{
				name: 'Riveting Product',
				description: 'This product is riveting',
				price: 13456745
			}
		].map(data => Product.create(data));

		const createdProducts = await Promise.all(creatingProducts);
		oneProduct = createdProducts[1];
	});

	it('returns the product based on the Id', async () => {
		const res = await request(app)
			.get('/api/products/' + oneProduct.id)
			.expect(200);

		if (typeof res.body === 'string') {
			res.body = JSON.parse(res.body);
		}
		expect(res.body.name).to.equal('Cool product');
	});

	/**
	 * Here we pass in a bad ID to the URL, we should get a 404 error
	 */
	it('returns a 404 error if the ID is not correct', () => {
		return request(app)
			.get('/api/products/76142896')
			.expect(404);
	});
});

describe('POST /products', () => {
	it('adds a new product', async () => {
		const res = await request(app)
			.post('/api/products')
			.send({
				name: 'Awesome POST-Created Product',
				description: 'Can you believe I did this in a test?',
				price: 3559
			})
			.expect(200);

		expect(res.body.id).to.not.be.an('undefined');
		expect(res.body.name).to.equal('Awesome POST-Created Product');
	});
});

describe('PUT /products/:id', () => {
	let product;

	beforeEach(async () => {
		product = await Product.create({
			name: 'Final Product',
			description: 'You can do it!',
			price: 232325
		});
	});

	it('updates a product', async () => {
		const res = await request(app)
			.put('/api/products/' + product.id)
			.send({
				name: 'Awesome PUT-Updated Product',
				price: 2329
			})
			.expect(200);

		expect(res.body.id).to.not.be.an('undefined');
		expect(res.body.name).to.equal('Awesome PUT-Updated Product');
		expect(res.body.description).to.equal('You can do it!');
	});

	it('saves updates to the DB', async () => {
		await request(app)
			.put('/api/products/' + product.id)
			.send({
				name: 'Awesome PUT-Updated Product',
				price: 22323
			});

		const foundProduct = await Product.findByPk(product.id);

		expect(foundProduct).to.exist; // eslint-disable-line no-unused-expressions
		expect(foundProduct.name).to.equal('Awesome PUT-Updated Product');
	});
});

describe('DELETE /products/:id', () => {
	let product;

	beforeEach(async () => {
		product = await Product.create({
			name: 'Deleted Product',
			description: 'Remove Product!',
			price: 13258
		});
	});
	it('deletes a product', () => {
		return request(app)
			.delete('/api/products/' + product.id)
			.expect(204);
	});
});
