import React, {Component} from 'react';
import {
	setSelectedProduct,
	addingToCart,
	subtractFromCart
} from '../store/index';
import {connect} from 'react-redux';

export class CartItem extends Component {
	constructor(props) {
		super(props);
		this.onClickMoveToProduct = this.onClickMoveToProduct.bind(this);
	}

	onClickMoveToProduct(product) {
		this.props.setSelectedProduct(product);
		// TODO: correct the front end route name
		this.props.history.push(`/products/${product.id}`);
	}

	onClickAddToCart(product) {
		this.props.addingToCart(product);
	}

	onClickSubtractFromCart(product) {
		this.props.subtractFromCart(product);
	}

	render() {
		let {product} = this.props;

		return (
			<div className="cartItem" key={product.id}>
				<img
					src={product.imageUrl}
					height="200"
					width="200"
					onClick={() => this.onClickMoveToProduct(product)}
				/>
				<h2>{product.name}</h2>
				<h3>{product.price}</h3>
				{/* <h3>{product.cartItems.quantity}</h3> */}
				<button
					onClick={() => this.onClickSubtractFromCart(product)}
					type="button"
				>
					{' '}
					X{' '}
				</button>
				<button onClick={() => this.onClickAddToCart(product)} type="button">
					{' '}
					Add{' '}
				</button>
			</div>
		);
	}
}

// const mapStateToProps = state => {
// return{
//     setSelectedProduct: state.product.setSelectedProduct
// }
// }

const mapDispatchToProps = dispatch => {
	return {
		setSelectedProduct: function(product) {
			dispatch(setSelectedProduct(product));
		},
		addingToCart: function(product) {
			dispatch(addingToCart(product));
		},
		subtractFromCart: function(product) {
			dispatch(subtractFromCart(product));
		}
	};
};

export default connect(null, mapDispatchToProps)(CartItem);
