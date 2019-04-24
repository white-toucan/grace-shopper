import React, {Component, Fragment} from 'react';
import {getCartThunk, checkoutCartThunk} from '../store/index';
import {createCheckoutSession} from '../store/checkout';
import {StripeProvider} from 'react-stripe-elements';
import {connect} from 'react-redux';
import CartItem from './cartItem';
import {STRIPE_CLIENT_KEY} from './util/constants'
import {Container, Card, Item, Button} from 'semantic-ui-react';

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
			<Container className="cart">
				{cart && cart.length > 0 ?
				<Fragment>
					<h1> Cart </h1>
					<Card fluid className="cart-card">
						<Item.Group divided className="cart-items-container">
						{cart.map(product =>
							<CartItem
								product={product}
								history ={this.props.history}
								key={product.id} />
						)}
						<div className="cart-checkout">
							<h2 className="cart-total">Total: {totaler(cart)}</h2>
							<StripeProvider apiKey={STRIPE_CLIENT_KEY}>
								<Button
									primary
									type="button"
									onClick={() => checkout(cart)}
									className="btn-cart-checkout">
									Submit Order
								</Button>
							</StripeProvider>
						</div>
						</Item.Group>
					</Card>
				</Fragment>
				:
				<Fragment>
					<h1>Cart is Empty :(</h1>
					<h3>Add some stuff to your cart!</h3>
				</Fragment>}
			</Container>
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
