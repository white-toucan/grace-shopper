import React, {Component} from 'react';
import {findOrCreateCart} from '../store/index';
import {connect} from 'react-redux';
import CartItem from './cartItem';

export class Cart extends Component {
	componentDidMount() {
		this.props.findOrCreateCart();
	}

	render() {
		const {cart} = this.props;

		return (
			<div className="cart">
				<h1> CART </h1>
				{cart &&
					cart.map(product => <CartItem product={product} key={product.id} />)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		cart: state.cart.cartItems
	};
};

const mapDispatchToProps = dispatch => {
	return {
		findOrCreateCart: function() {
			dispatch(findOrCreateCart());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
