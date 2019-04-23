import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { getOrdersThunk } from '../store/orders';

class OrderHistory extends Component {

	componentDidMount() {
		// this.props.getOrders();
	}

	render() {
		const orders = this.props.orders || null;
		return (
			<div className="order-history">
				<h2>Order History</h2>
				{
					orders ? orders.map(order => {
					})
					:
					<h4>Nothing here yet!</h4>
				}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		// orders: state.orders.allOrders
	};
};

const mapDispatchToProps = dispatch => {
	return {
		// getOrders: dispatch(getOrdersThunk)
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
