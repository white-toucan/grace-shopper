/* global describe beforeEach it */

import {expect} from 'chai';
import React from 'react';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {SingleProduct} from '../../../client/components/singleProduct';

const adapter = new Adapter();
enzyme.configure({adapter});

describe('SingleProduct', () => {
	let singleProduct;

	beforeEach(() => {
		const product = {
			name: 'Floppy Disk',
			price: 599,
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
		console.log(singleProduct);
	});

	xit('renders to parent div with id #product', () => {
		expect(singleProduct.find('div#product')).to.equal(true);
	});

	xit('renders the product details in the component', () => {
		expect(singleProduct.find('h3.product-info-name').text()).to.equal('Floppy Disk');
		expect(singleProduct.find('p.product-price').text()).to.equal('$5.99');
		expect(singleProduct.find('p.product-desc').text()).to.equal('Save up to 1.44MB of data on this portable drive!');
	});

	xit('calls the addToCart function when the `Add to Cart` button is clicked', function() {
		//sinon stub and test
	});
});
