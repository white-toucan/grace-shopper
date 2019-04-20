import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getProductByIdThunk, addingToCartThunk} from '../store';
import {defaultImageUrl} from './util/constants';

export class SingleProduct extends Component {
	componentDidMount() {
		this.props.getProduct(this.props.match.params.productId);
	}

	addingToCartThunk(product) {
		this.props.addingToCartThunk(product);
	}

	render() {
		const {name, price, description, imageUrl} = this.props.selectedProduct;
		return (
			<div id="product">
				<div className="product-img">
					<img src={imageUrl || defaultImageUrl} alt="" />
				</div>
				<div className="product-info">
					<h3 className="product-info-name">{name}</h3>
					<p className="product-price">{`$${(price/100).toFixed(2)}`}</p>
					<p className="product-desc">{description}</p>
					<button
						className="add-to-cart"
						type="button"
						onClick={() => this.addingToCartThunk(this.props.selectedProduct)}
					>
						Add to Cart
					</button>
				</div>
			</div>
		);
	}
}

const mapState = state => ({
	selectedProduct: state.product.selectedProduct
});

const mapDispatch = dispatch => ({
	getProduct: id => dispatch(getProductByIdThunk(id)),
	addingToCartThunk: product => dispatch(addingToCartThunk(product))
});

export default connect(mapState, mapDispatch)(SingleProduct);
