import axios from 'axios';

const SET_ORDER_DETAILS = 'GET_ORDER_DETAILS';

const setOrderDetails = details => ({
	type: SET_ORDER_DETAILS,
	details
});

const initialState = {
	ordersWithDetails: []
};

/**
 * THUNK CREATORS
 */
export const getOrdersThunk = () => {
	return async dispatch => {
		try {
			// Get ids of past orders
			let { data } = await axios.get('/api/me/orders');
			if (data.length > 0) {
				// Transform shape of returned data
				let ids = data.map(entry => entry.id);
				// Retrieve and dispatch order details for each id
				Promise.all(ids.map(id => {
					return axios.get(`/api/me/orders/${id}`);
				})).then(orders => {
					let orderDetails = orders.map(res => res.data);
					dispatch(setOrderDetails(orderDetails));
				});
			}
			else {
				dispatch(setOrderDetails([]));
			}
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
		case SET_ORDER_DETAILS:
			stateCopy = {...stateCopy, ordersWithDetails: action.details }
			return stateCopy;
		default:
			return state;
	}
}
