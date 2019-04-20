/* global describe beforeEach it */

import {expect} from 'chai';
import React from 'react';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Cart} from '../../../client/components/cart';

const adapter = new Adapter();
enzyme.configure({adapter});

describe('Components - Cart', () => {
	let cartItems;
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
		cartItems = shallow(<Cart cart={arr} getCartThunk={() => {}} />);
	});

	it('renders a map of all cart items  length plus one h1', () => {
		expect(cartItems.find('.cart').children()).to.have.lengthOf(1 + arr.length);
	});
});
