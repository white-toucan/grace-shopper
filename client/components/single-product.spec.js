/* global describe beforeEach it */

import {expect} from 'chai';
import React from 'react';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {SingleProduct} from './single-product';

const adapter = new Adapter();
enzyme.configure({adapter});

describe('SingleProduct', () => {
	let singleProduct;

	beforeEach(() => {
		const product = {
			name: 'Floppy Disk',
			price: 5.99,
			description: 'Save up to 1.44MB of data on this portable drive!'
		};
		const match = {
			params: {productId: 1}
		};
		//sinon stub the getProduct call - check that it was called once
		singleProduct = shallow(
			<SingleProduct
				match={match}
				getProduct={() => {}}
				selectedProduct={product}
			/>
		);
	});

	it('renders to parent div with id #product', () => {
		expect(singleProduct.is('div#product')).to.equal(true);
	});

	it('renders the product name in h3', () => {
		expect(
			singleProduct.contains([
        <h3 className="product-info-name">Floppy Disk</h3>,
        <p className="product-price">"5.99"</p>,
        // <p className="product-desc">Save up to 1.44MB of data on this portable drive!</p>
			])
		).to.equal(true);
	});

	it('calls the addToCart function when the `Add to Cart` button is clicked', function() {
		//sinon stub and test
	});
});
