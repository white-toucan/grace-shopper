/* global describe beforeEach afterEach it */

import {expect} from 'chai';
import {
	getCartThunk,
	emptyCart,
	addingToCartThunk,
	deleteFromCartThunk,
	updateItemQtyThunk,
	setAddToCart
} from '../../../client/store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('RX Store - cart - thunk creators', () => {
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
			price: 2399
		};
		cartItem2 = {
			id: 2,
			imageUrl: 'http://www.test.com/url.jpg',
			name: 'Test Item2',
			price: 9999
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
			mockAxios.onGet(`/api/cartItems`).replyOnce(200, fakeCartItems);
			await store.dispatch(getCartThunk());
			const actions = store.getActions();
			expect(actions[0].type).to.be.equal('SET_CART');
			expect(actions[0].cartItems).to.be.deep.equal(fakeCartItems);
		});
	});

	// describe('emptyCart', () => {
	// 	it('eventually dispatches the SET_REMOVE_CART action', async () => {
	// 		mockAxios.onDelete(`/api/carts/${userId}/active`).replyOnce(204);
	// 		await store.dispatch(emptyCart());
	// 		const actions = store.getActions();
	// 		expect(actions[0].type).to.be.equal('SET_REMOVE_CART');
	// 		expect(actions[0].cartItems).to.be.deep.equal([]);
	// 	});
	// });

	describe('addingToCartThunk', () => {
		it('eventually dispatches the SET_ADD_TO_CART action', async () => {
			mockAxios
				.onPost(`/api/cartItems/${cartItem1.id}`)
				.replyOnce(201, cartItem1);
			await store.dispatch(addingToCartThunk(cartItem1));
			const actions = store.getActions();
			expect(actions[0].type).to.be.equal('SET_ADD_TO_CART');
			expect(actions[0].product).to.be.deep.equal(cartItem1);
		});
	});

	describe('deleteFromCartThunk', () => {
		it('eventually dispatches the SET_EMPTY_CART action', async () => {
			mockAxios
				.onDelete(`/api/cartItems/${cartItem2.id}`)
				.replyOnce(204, cartItem2);
			await store.dispatch(setAddToCart(cartItem2));
			await store.dispatch(deleteFromCartThunk(cartItem2));
			const actions = store.getActions();
			expect(actions[1].type).to.be.equal('SET_REMOVE_FROM_CART');
			expect(actions[0].product).to.be.deep.equal(cartItem2);
		});
	});

	describe('updateItemQtyThunk', () => {
		it('eventually dispatches the SET_UPDATE_ITEM_QTY action', async () => {
			const actionProduct = {
				productId: cartItem2.id,
				quantity: 3
			};
			mockAxios
				.onPut(`/api/cartItems/${cartItem2.id}`)
				.replyOnce(200, actionProduct);
			await store.dispatch(setAddToCart(cartItem2));
			await store.dispatch(updateItemQtyThunk({
				id: cartItem2.id,
				quantity: 3
			}));
			const actions = store.getActions();

			// Check dispatched action
			expect(actions[1].type).to.be.equal('SET_UPDATE_ITEM_QTY');
			expect(actions[1].product).to.be.deep.equal(actionProduct);
		});
	});
});
