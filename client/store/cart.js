/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
import axios from 'axios';

/**
 * ACTION TYPES
 */
const SET_CART = 'SET_CART';
const SET_REMOVE_CART = 'SET_REMOVE_CART';
const SET_ADD_TO_CART = 'SET_ADD_TO_CART';
const SET_SUBTRACT_FROM_CART = 'SET_SUBTRACT_FROM_CART';
/**
 * INITIAL STATE
 */
const initialState = {
	cart: []
};

/**
 * ACTION CREATORS
 */
// const findOrCreateCart = cart => ({type: FIND_OR_CREATE_CART, cart});
const setAddToCart = product => ({type: SET_ADD_TO_CART, product});
const setCart = cart => ({type: SET_CART, cart});
const setRemoveCart = () => ({type: SET_REMOVE_CART});
const setSubtractFromCart = product => ({type: SET_SUBTRACT_FROM_CART, product});
/**
 * THUNK CREATORS
 */

export const findOrCreateCart = userId => async dispatch => {
	try {
		const res = await axios.get(`/cart:${userId}`); // waiting for routes
		dispatch(setCart(res.data || initialState));
	} catch (err) {
		console.error(err);
	}
};

export const emptyCart = () => async dispatch => {
	try {
		const res = await axios.delete(`/cart:${userId}`); // waiting for routes
		dispatch(setRemoveCart(res.data));
	} catch (error) {
		console.log(error);
	}
};

export const addingToCart = product => async dispatch => {
	try {
		const res = await axios.post(`/cart:${userId}`, product);
		dispatch(setAddToCart(res.data));
	} catch (error) {
		console.log(error);
	}
};

export const subtractFromCart = product => async dispatch => {
	try {
		const res = await axios.delete(`/cart:${userId}`, product);
		dispatch(setSubtractFromCart(res.data));
	} catch (error) {
		console.log(error);
	}
};

const reducer = (prevState = initialState, action) => {
	let stateCopy = {...prevState};
	switch (action.type) {
		case SET_CART:
			stateCopy.cart = action.cart;
			return stateCopy;
		case SET_REMOVE_CART:
			stateCopy.cart = [];
			return stateCopy;
		case SET_ADD_TO_CART:
			stateCopy.cart.push(product);
			return stateCopy;
		case SET_SUBTRACT_FROM_CART:
			stateCopy = stateCopy.cart.filter(
				product => product.id !== action.product.id
			);
			return stateCopy;
		default:
			return prevState;
	}
};

const store = createStore(reducer);

export default store;
