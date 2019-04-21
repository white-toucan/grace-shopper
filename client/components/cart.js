import React, {Component} from 'react';
import {getCartThunk} from '../store/index';
import {connect} from 'react-redux';
import CartItem from './cartItem';

export class Cart extends Component {
	componentDidMount() {
		this.props.getCartThunk();
	}

	render() {
		const {cart} = this.props;

		return (
			<div className="cart">
				<h1> CART </h1>
				{cart &&
					cart.map(product => <CartItem product={product} history ={this.props.history} key={product.id} />)}
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
		getCartThunk: function() {
			dispatch(getCartThunk());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
