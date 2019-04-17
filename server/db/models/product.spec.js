/* global describe beforeEach it */

const {expect} = require('chai');
const db = require('../index');
const Product = db.model('product');

describe('Product model', () => {
	beforeEach(() => {
		return db.sync({force: true});
	});
	describe('create product', () => {
		it('creates a product with a name, description, price, and imageurl', async () => {
			const oneProduct = {
				name: 'FloppyDisk',
				price: 2.45,
				imageUrl: 'abc'
			};
			const createdProduct = await Product.create(oneProduct);
			expect(createdProduct).to.deep.include(oneProduct);
			expect(createdProduct.description).to.equal('');
		});
	});
}); // end describe('Product model')
