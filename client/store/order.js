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
			const { data: ids } = await axios.get('/api/me/orders');
			const details = Promise.all(ids.map(id => {
				return axios.get(`/api/me/orders/${id}`);
			})).map(order => order.data);
			dispatch(setOrderDetails(details));
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
