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
const setCart = cartItems => ({type: SET_CART, cartItems});
export const setAddToCart = product => ({type: SET_ADD_TO_CART, product});
const setRemoveCart = () => ({type: SET_REMOVE_CART});
const setSubtractFromCart = product => ({
	type: SET_SUBTRACT_FROM_CART,
	product
});
/**
 * THUNK CREATORS
 */
export const getCartThunk = userId => async dispatch => {
	try {
		const res = await axios.get(`/api/cartItems`); // waiting for routes
		dispatch(setCart(res.data || initialState));
	} catch (err) {
		console.error(err);
	}
};

// export const emptyCart = (userId) => async dispatch => {
// 	try {
// 		//TODO: update with the right route
// 		await axios.delete(`api/carts/${userId}/active`); // waiting for routes
// 		dispatch(setRemoveCart());
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

export const addingToCartThunk = product => async dispatch => {
	try {
		const productId = product.id;
		await axios.post(`/api/cartItems/${productId}`);
		dispatch(setAddToCart(product));
	} catch (error) {
		console.log(error);
	}
};

export const subtractFromCartThunk = product => async dispatch => {
	try {
		const productId = product.id;
		await axios.delete(`/api/cartItems/${productId}`);
		dispatch(setSubtractFromCart(product));
	} catch (error) {
		console.log(error);
	}
};

export default function(prevState = initialState, action) {
	let stateCopy = {...prevState};
	switch (action.type) {
		case SET_CART:
			stateCopy.cartItems = action.cartItems;
			return stateCopy;
		case SET_REMOVE_CART:
			stateCopy.cartItems = [];
			return stateCopy;
		case SET_ADD_TO_CART:
			stateCopy.cartItems = [...stateCopy.cartItems, action.product];
			return stateCopy;
		case SET_SUBTRACT_FROM_CART:
			stateCopy.cartItems = stateCopy.cartItems.filter(
				product => product.id !== action.product.id
			);
			return stateCopy;
		default:
			return prevState;
	}
}
