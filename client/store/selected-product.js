import axios from 'axios';

/**
 * ACTION TYPES
 */
const SET_PRODUCT = 'SET_PRODUCT';

/**
 * INITIAL STATE
 */
const defaultProduct = {};

/**
 * ACTION CREATORS
 */
const setProduct = product => ({type: SET_PRODUCT, product});

/**
 * THUNK CREATORS
 */
export const getProduct = id => async dispatch => {
	try {
		const product = await axios.get(`/api/products/${id}`);
		return dispatch(setProduct(product));
	} catch (error) {
		console.error(`Error fetching product ${id}: ${error}`);
	}
};

export default function(state = defaultProduct, action) {
	switch (action.type) {
		case SET_PRODUCT:
			return action.product;
		default:
			return state;
	}
}
