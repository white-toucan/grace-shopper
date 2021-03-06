/* global describe beforeEach it */

const {expect} = require('chai');
const db = require('../../../server/db');
const Product = db.model('product');

describe('Product model', () => {
	beforeEach(() => {
		return Product.sync({force: true});
	});
	describe('create product', () => {
		it('creates a product with a name, description, price, and imageurl', async () => {
			const oneProduct = {
				name: 'FloppyDisk',
				price: 245,
				imageUrl: 'abc'
			};
			const createdProduct = await Product.create(oneProduct);
			expect(createdProduct).to.deep.include(oneProduct);
			expect(createdProduct.description).to.equal('');
		});
	});
}); // end describe('Product model')
