import React, {Component} from 'react';
import {
	setSelectedProduct,
	addingToCartThunk,
	subtractFromCartThunk
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
		this.props.addingToCartThunk(product);
	}

	onClicksubtractFromCartThunk(product) {
		this.props.subtractFromCartThunk(product);
	}

	render() {
		let {product} = this.props;

		return (
			<div className="cartItem">
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
					onClick={() => this.onClicksubtractFromCartThunk(product)}
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
		addingToCartThunk: function(product) {
			dispatch(addingToCartThunk(product));
		},
		subtractFromCartThunk: function(product) {
			dispatch(subtractFromCartThunk(product));
		}
	};
};

export default connect(null, mapDispatchToProps)(CartItem);
