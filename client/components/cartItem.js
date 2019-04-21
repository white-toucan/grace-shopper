import React, {Component} from 'react';
import {
	setSelectedProduct,
	updateItemQtyThunk,
	deleteFromCartThunk
} from '../store/index';
import {connect} from 'react-redux';

export class CartItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			quantity: this.props.product.quantity
		}
		this.onClickMoveToProduct = this.onClickMoveToProduct.bind(this);
	}

	onClickMoveToProduct(product) {
		this.props.setSelectedProduct(product);
		this.props.history.push(`/products/${product.id}`);
	}

	onClickDeleteFromCartThunk(product) {
		this.props.deleteFromCartThunk(product);
	}

	onChangeQty(event) {
		this.setState({
			quantity: +event.target.value
		});
	}

	onSubmitQtyChangeThunk(product) {
		event.preventDefault();
		const modifiedProd = {...product, quantity: this.state.quantity};
		this.props.updateItemQtyThunk(modifiedProd);
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
				<h3>{`$${(product.price / 100).toFixed(2)}`}</h3>
				<h3>{product.quantity}</h3>
				<form onSubmit={() => this.onSubmitQtyChangeThunk(product)}>
					<div className="change-qty">
						<label htmlFor="quantity">Qty</label>
						<select name="quantity" value={this.state.quantity} onChange={(event) => this.onChangeQty(event)} >
							{
								/* Will eventually replace 20 with product inventory */
								new Array(Math.min(10, 20)).fill(1).map((_, i) =>
									<option key={i} value={i + 1}>{i + 1}</option>
								)
							}
						</select>
					</div>
					<button type="submit">Update</button>
				</form>
				<button
					onClick={() => this.onClickDeleteFromCartThunk(product)}
					type="button"
				>
					Remove
				</button>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setSelectedProduct: function(product) {
			dispatch(setSelectedProduct(product));
		},
		deleteFromCartThunk: function(product) {
			dispatch(deleteFromCartThunk(product));
		},
		updateItemQtyThunk: function(product) {
			dispatch(updateItemQtyThunk(product));
		}
	};
};

export default connect(null, mapDispatchToProps)(CartItem);
