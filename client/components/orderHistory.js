import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Accordion, Icon } from 'semantic-ui-react'
import OrderHistoryItem from './orderHistoryItem';
import { getOrdersThunk } from '../store/order';

class OrderHistory extends Component {
	constructor(props) {
		super(props);
		this.state = { active: 0 };
	}

	componentDidMount() {
		this.props.getOrders();
	}

	updateActive(index) {
		this.setState({ active: index });
	}

	generateOrderHistory(orders) {
		if (!orders) return [];

		return orders.map((order, i) =>
			<OrderHistoryItem
				key={order.id}
				isActive={this.state.active === i}
				index={i}
				handleClick={() => this.updateActive(i)}
				orderDetails={order} />
		);
	}

	render() {
		const orders = this.props.orders || null;
		return (
			<div className="order-history">
				<h2>Order History</h2>
				{
					orders ?
					<Accordion styled>
						{this.generateOrderHistory(orders)}
					</Accordion>
					:
					<h4>Nothing here yet!</h4>
				}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		orders: state.order.ordersWithDetails
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getOrders: function() {
			dispatch(getOrdersThunk());
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
