/* global describe beforeEach afterEach it */

import {expect} from 'chai';
import {
	getCartThunk,
	emptyCart,
	addingToCart,
	subtractFromCart
} from './product';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('RX Store - product - thunk creators', () => {
	let store;
	let mockAxios;
	let fakeCartItems;
	let userId;
	let cartItem1;
	let cartItem2;

	const initialState = {
		cartItems: []
	};

	beforeEach(() => {
		mockAxios = new MockAdapter(axios);
		store = mockStore(initialState);

		cartItem1 = {
			id: 1,
			imageUrl: 'http://www.test.com/url.jpg',
			name: 'Test Item1',
			price: 23.99
		};
		cartItem2 = {
			id: 2,
			imageUrl: 'http://www.test.com/url.jpg',
			name: 'Test Item2',
			price: 99.99
		};
		fakeCartItems = [cartItem1, cartItem2];
		userId = 2;
	});

	afterEach(() => {
		mockAxios.restore();
		store.clearActions();
	});

	describe('getCartThunk', () => {
		it('eventually dispatches the SET_CART action', async () => {
			//TODO: mock axios call nees to be aligned with the real final route, (delete userId var if not needed)
			mockAxios
				.onGet(`/api/carts/${userId}/active`)
				.replyOnce(200, fakeCartItems);
			await store.dispatch(getCartThunk());
			const actions = store.getActions();
			expect(actions[0].type).to.be.equal('SET_CART');
			expect(actions[0].cartItems).to.be.deep.equal(fakeCartItems);
		});
	});

	describe('emptyCart', () => {
		it('eventually dispatches the SET_REMOVE_CART action', async () => {
			//TODO: mock axios call nees to be aligned with the real final route, (delete userId var if not needed)
			mockAxios.onDelete(`/api/carts/${userId}/active`).replyOnce(204);
			await store.dispatch(emptyCart());
			const actions = store.getActions();
			expect(actions[0].type).to.be.equal('SET_REMOVE_CART');
			expect(actions[0].cartItems).to.be.deep.equal([]);
		});
	});

	describe('addingToCart', () => {
		it('eventually dispatches the SET_ADD_TO_CART action', async () => {
			//TODO: mock axios call nees to be aligned with the real final route, (delete userId var if not needed)
			mockAxios
				.onPost(`/api/carts/${cartId}/add/:productId`)
				.replyOnce(201, cartItem1);
			await store.dispatch(addingToCart(cartItem1));
			const actions = store.getActions();
			expect(actions[0].type).to.be.equal('SET_ADD_TO_CART');
			expect(actions[0].cartItems).to.be.deep.equal([cartItem1]);
		});
	});

	describe('subtractFromCart', () => {
		it('eventually dispatches the SET_SUBTRACT_FROM_CART action', async () => {
			//TODO: mock axios call nees to be aligned with the real final route, (delete userId var if not needed)
			mockAxios.onDelete(`/carts/${userId}`).replyOnce(204, cartItem2);
			await store.dispatch(addingToCart(cartItem2));
			await store.dispatch(subtractFromCart(cartItem2));
			const actions = store.getActions();
			expect(actions[0].type).to.be.equal('SET_SUBTRACT_FROM_CART');
			expect(actions[0].cartItems).to.be.deep.equal([]);
		});
	});
});
