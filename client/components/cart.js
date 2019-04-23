import React, {Component, Fragment} from 'react';
import {getCartThunk, checkoutCartThunk, createCheckoutSession} from '../store/index';
import {StripeProvider} from 'react-stripe-elements';
import {connect} from 'react-redux';
import CartItem from './cartItem';
import {STRIPE_CLIENT_KEY} from './util/constants'

const formatCentsToDollars = (price) => `$${(price / 100).toFixed(2)}`;

const totaler = (listOfProducts) => {
	let price = listOfProducts.reduce((a, b) => {
		return a + (b.price * b.quantity);
	}, 0);
	return formatCentsToDollars(price);
};


export class Cart extends Component {
	componentDidMount() {
		this.props.getCartThunk();
	}

	render() {
		const {cart, checkout} = this.props;

		return (
			<div className="cart">
				{cart && cart.length > 0 ?
				<Fragment>
						<h1> CART </h1>
						{cart.map(product =>
							<CartItem
								product={product}
								history ={this.props.history}
								key={product.id} />
						)}
						<div className="cart-checkout">
							<h3 className="cart-total">Total: {totaler(cart)}</h3>
							<StripeProvider apiKey={STRIPE_CLIENT_KEY}>
								<button
									type="button"
									onClick={() => checkout(cart)}
									className="btn-cart-checkout">
									Submit Order
								</button>
							</StripeProvider>
						</div>
				</Fragment>
				:
				<Fragment>
					<h1>Cart is Empty :(</h1>
					<h3>Add some stuff to your cart!</h3>
				</Fragment>}
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
		},
		checkout: function(cart) {
			dispatch(createCheckoutSession(cart))
			// dispatch(checkoutCartThunk());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
