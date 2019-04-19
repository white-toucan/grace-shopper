/* global describe beforeEach it */

import {expect} from 'chai';
import React from 'react';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {CartItem} from './cartItem';

const adapter = new Adapter();
enzyme.configure({adapter});

describe('Components - CartItem', () => {
	let cartItem;
	let fakeHistory = [];

	beforeEach(() => {
		fakeHistory = [];
		cartItem = shallow(
			<CartItem
				product={{
					id: 4,
					imageUrl: 'http://www.test.com/url.jpg',
					name: 'Test Item',
					price: 2399
				}}
				setSelectedProduct={() => {}}
				history={fakeHistory}
			/>
		);
	});

	it('renders the product name in an h2 tag', () => {
		expect(cartItem.find('h2').text()).to.be.equal('Test Item');
	});

	it('pushes to history when the image is clicked', () => {
		cartItem.find('img').simulate('click');
		expect(fakeHistory[0]).to.equal('/products/4');
	});

	// note testing on add and remove buttons could be added
});
