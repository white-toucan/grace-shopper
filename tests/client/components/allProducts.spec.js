/* global describe beforeEach it */

import {expect} from 'chai';
import React from 'react';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {AllProducts} from '../../../client/components/allProducts';

const adapter = new Adapter();
enzyme.configure({adapter});

describe('Components - AllProducts', () => {
	let allProducts;
	const object1 = {
		id: 1,
		imageUrl: 'http://www.test.com/url.jpg',
		name: 'Test Item1',
		price: 2399
	};
	const object2 = {
		id: 2,
		imageUrl: 'http://www.test.com/url.jpg',
		name: 'Test Item2',
		price: 9999
	};
	let arr = [object1, object2];

	beforeEach(() => {
		allProducts = shallow(
			<AllProducts allProductsList={arr} getAllProducts={() => {}} />
		);
	});

	xit('renders a map of allProducts prop length plus one h2', () => {
		expect(allProducts.find('.allProducts').children()).to.have.lengthOf(
			1 + arr.length
		);
	});
});
