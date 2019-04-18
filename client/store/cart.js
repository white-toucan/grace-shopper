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
	cartItems: []
};

/**
 * ACTION CREATORS
 */
// const findOrCreateCart = cart => ({type: FIND_OR_CREATE_CART, cart});
const setCart = cart => ({type: SET_CART, cart});
const setAddToCart = product => ({type: SET_ADD_TO_CART, product});
const setRemoveCart = () => ({type: SET_REMOVE_CART});
const setSubtractFromCart = product => ({type: SET_SUBTRACT_FROM_CART, product});
/**
 * THUNK CREATORS
 */

export const findOrCreateCart = userId => async dispatch => {
	try {
		//TODO: update with the right route
		const res = await axios.get(`/api/carts/${userId}/active`); // waiting for routes
        console.log(res.data)
        dispatch(setCart(res.data || initialState)); 
	} catch (err) {
		console.error(err);
	}
};

export const emptyCart = (userId) => async dispatch => {
	try {
		//TODO: update with the right route
		await axios.delete(`api/carts/${userId}/active`); // waiting for routes
		dispatch(setRemoveCart());
	} catch (error) {
		console.log(error);
	}
};

export const addingToCart = product => async dispatch => {
	try {
		//TODO: update with the right route
		const res = await axios.post(`/api/carts/${cartId}/add/:productId`, product);
		dispatch(setAddToCart(res.data));
	} catch (error) {
		console.log(error);
	}
};

export const subtractFromCart = product => async dispatch => {
	try {
		//TODO: update with the right route
		const res = await axios.delete(`/carts/${userId}`, product);
		dispatch(setSubtractFromCart(res.data));
	} catch (error) {
		console.log(error);
	}
};

export default function(prevState = initialState, action) {
	let stateCopy = {...prevState};
	switch (action.type) {
		case SET_CART:
			stateCopy.cart = action.cart;
			return stateCopy;
		case SET_REMOVE_CART:
			stateCopy.cartItems = [];
			return stateCopy;
		case SET_ADD_TO_CART:
			stateCopy.cartItems.push(action.product);
			return stateCopy;
		case SET_SUBTRACT_FROM_CART:
			stateCopy = stateCopy.cartIems.filter(
				product => product.id !== action.product.id
			);
			return stateCopy;
		default:
			return prevState;
	}
};



