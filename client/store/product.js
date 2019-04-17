import axios from 'axios';

/**
 * ACTION TYPES
 */
const SET_SELECTED_PRODUCT = 'SET_SELECTED_PRODUCT';
const SET_ALL_PRODUCTS = 'SET_ALL_PRODUCTS';

/**
 * INITIAL STATE
 */
const initialState = {
	selectedProduct: {},
	allProductsList: []
};

/**
 * ACTION CREATORS
 */
export const setSelectedProduct = product => ({
	type: SET_SELECTED_PRODUCT,
	product
});

const setAllProducts = data => ({
	type: SET_ALL_PRODUCTS,
	data
});

/**
 * THUNK CREATORS
 */
export const getAllProductsThunk = () => {
	return async dispatch => {
		try {
			//could consider filtering product object and only using properties needed for allProducts page
			const {data} = await axios.get('/api/products');
			dispatch(setAllProducts(data));
		} catch (error) {
			console.error(error);
		}
	};
};

/**
 * REDUCER
 */
export default function(state = initialState, action) {
	let stateCopy = {...state};
	switch (action.type) {
		case SET_SELECTED_PRODUCT:
			//note we chose to store the full product vs just the id, when to we want to wait?
			stateCopy.selectedProduct = action.product;
			return stateCopy;
		case SET_ALL_PRODUCTS:
			stateCopy.allProductsList = action.data;
			return stateCopy;
		default:
			return state;
	}
}
