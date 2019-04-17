/* global describe beforeEach afterEach it */

import {expect} from 'chai';
import {getAllProductsThunk} from './product';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import history from '../history';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('RX Store - product - thunk creator', () => {
	let store;
	let mockAxios;
	let fakeAllProducts;

	const initialState = {
		selectedProduct: {},
		allProductsList: []
	};

	beforeEach(() => {
		mockAxios = new MockAdapter(axios);
		store = mockStore(initialState);

		const object1 = {
			id: 1,
			imageUrl: 'http://www.test.com/url.jpg',
			name: 'Test Item1',
			price: 23.99
		};
		const object2 = {
			id: 2,
			imageUrl: 'http://www.test.com/url.jpg',
			name: 'Test Item2',
			price: 99.99
		};
		fakeAllProducts = [object1, object2];
	});

	afterEach(() => {
		mockAxios.restore();
		store.clearActions();
	});

	describe('getAllProductsThunk', () => {
		it('eventually dispatches the SET_ALL_PRODUCTS action', async () => {
			mockAxios.onGet('/api/products').replyOnce(200, fakeAllProducts);
			await store.dispatch(getAllProductsThunk());
			const actions = store.getActions();
			expect(actions[0].type).to.be.equal('SET_ALL_PRODUCTS');
			expect(actions[0].data).to.be.deep.equal(fakeAllProducts);
		});
	});
});
