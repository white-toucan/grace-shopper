import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getProductByIdThunk, addingToCartThunk} from '../store';
import {defaultImageUrl} from './util/constants';

export class SingleProduct extends Component {
	constructor(props) {
		super(props);
		this.state = {
			quantity: 1
		};
	}

	componentDidMount() {
		this.props.getProduct(this.props.match.params.productId);
	}

	addingToCartThunk(product) {
		const modifiedProd = {...product, quantity: this.state.quantity};
		this.props.addingToCartThunk(modifiedProd);
	}

	onChangeQty(event) {
		this.setState({
			quantity: +event.target.value
		});
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
