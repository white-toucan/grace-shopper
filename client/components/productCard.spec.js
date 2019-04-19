/* global describe beforeEach it */

import {expect} from 'chai';
import React from 'react';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ProductCard} from './productCard';

const adapter = new Adapter();
enzyme.configure({adapter});

describe('Components - ProductCard', () => {
	let productCard;
	let fakeHistory = [];

	beforeEach(() => {
		fakeHistory = [];
		productCard = shallow(
			<ProductCard
				product={{
					id: 1,
					imageUrl: 'http://www.test.com/url.jpg',
					name: 'Test Item',
					price: 2399
				}}
				history={fakeHistory}
			/>
		);
	});

	it('renders the product name in an h2 tag', () => {
		expect(productCard.find('h2').text()).to.be.equal('Test Item');
	});

	it('pushes to history when the image is clicked', () => {
		productCard.find('img').simulate('click');
		expect(fakeHistory[0]).to.equal('/products/1');
	});
});
