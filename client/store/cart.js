/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
import axios from 'axios';

/**
 * ACTION TYPES
 */
const SET_CART = 'SET_CART';
const SET_ADD_TO_CART = 'SET_ADD_TO_CART';
const SET_UPDATE_ITEM_QTY = 'SET_UPDATE_ITEM_QTY';
const SET_REMOVE_FROM_CART = 'SET_REMOVE_FROM_CART';
const CHECKOUT_CART = 'CHECKOUT_CART';

/**
 * INITIAL STATE
 */
const initialState = {
	cartItems: []
};

/**
 * ACTION CREATORS
 */
const setCart = cartItems => ({
	type: SET_CART,
	cartItems
});
export const setAddToCart = product => ({
	type: SET_ADD_TO_CART,
	product
});
const setUpdateItemQty = product => ({
	type: SET_UPDATE_ITEM_QTY,
	product
});
const setRemoveFromCart = product => ({
	type: SET_REMOVE_FROM_CART,
	product
});
export const checkoutCart = () => ({
	type: CHECKOUT_CART
});

/**
 * THUNK CREATORS
 */

export const getCartThunk = () => async dispatch => {
	try {
		const res = await axios.get(`/api/cartItems`); // waiting for routes
		dispatch(setCart(res.data));
	} catch (error) {
		console.error(error);
	}
};

export const checkoutCartThunk = () => async dispatch => {
	try {
		// API call to record purchasePrice for cartItems, archive current
		// active cart, and create new cart
		const res = await axios.put(`/api/me/cart`);
		dispatch(checkoutCart());
	} catch (error) {
		console.error(error);
	}
};

export const addingToCartThunk = product => async dispatch => {
	try {
		const productId = product.id;
		const res = await axios.post(`/api/cartItems/${productId}`, {
			quantity: product.quantity
		}); //returns cartId, productId, quantity

		product.quantity = res.data.quantity;
		dispatch(setAddToCart(product));
	} catch (error) {
		console.error(error);
	}
};

export const updateItemQtyThunk = product => async dispatch => {
	try {
		const res = await axios.put(`/api/cartItems/${product.id}`, {
			quantity: product.quantity
		});
		// response contains cartId, productId, quantity
		return dispatch(setUpdateItemQty(res.data));
	} catch (error) {
		console.error(error);
	}
};

export const deleteFromCartThunk = product => async dispatch => {
	try {
		const productId = product.id;
		await axios.delete(`/api/cartItems/${productId}`);
		dispatch(setRemoveFromCart(product));
	} catch (error) {
		console.error(error);
	}
};

export default function(prevState = initialState, action) {
	let stateCopy = {...prevState};
	switch (action.type) {
		case SET_CART:
			stateCopy.cartItems = action.cartItems;
			return stateCopy;
		case CHECKOUT_CART:
			stateCopy.cartItems = [];
			return stateCopy;
		case SET_ADD_TO_CART:
			// Check if there is already an item in cart with the same name
			let cartItemsNames = stateCopy.cartItems.map(item => item.name);

			// If an item does not exist, add it to the list
			if (!cartItemsNames.includes(action.product.name)) {
				stateCopy.cartItems = [...stateCopy.cartItems, action.product];
				// Otherwise, update the product details
			} else {
				stateCopy.cartItems = stateCopy.cartItems.map(
					product =>
						product.name === action.product.name ? action.product : product
				);
			}
			return stateCopy;
		case SET_REMOVE_FROM_CART:
			stateCopy.cartItems = stateCopy.cartItems.filter(
				product => product.id !== action.product.id
			);
			return stateCopy;
		case SET_UPDATE_ITEM_QTY:
			stateCopy.cartItems = stateCopy.cartItems.map(
				product =>
					product.id === action.product.productId
						? {...product, quantity: action.product.quantity}
						: product
			);
			return stateCopy;
		default:
			return prevState;
	}
}
