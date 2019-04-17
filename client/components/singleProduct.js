import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getProductByIdThunk} from '../store';

export class SingleProduct extends Component {
	componentDidMount() {
		this.props.getProduct(this.props.match.params.productId);
	}

	render() {
		const {name, price, description, imageUrl} = this.props.selectedProduct;
		return (
			<div id="product">
				<div className="product-img">
					<img src={imageUrl || ''} alt="" />
				</div>
				<div className="product-info">
					<h3 className="product-info-name">{name}</h3>
					<p className="product-price">{price}</p>
					<p className="product-desc">{description}</p>
					<button className="add-to-cart" type="button" onClick={() => {}}>
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
	getProduct: id => dispatch(getProductByIdThunk(id))
});

export default connect(mapState, mapDispatch)(SingleProduct);
