import React, {Component} from 'react';
import {setSelectedProduct} from '../store';
import {connect} from 'react-redux';
import {defaultImageUrl} from './util/constants';

export class ProductCard extends Component {
	constructor(props) {
		super(props);
		this.moveToProduct = this.moveToProduct.bind(this);
	}

	moveToProduct(id) {
		this.props.history.push(`/products/${id}`);
	}

	render() {
		let {imageUrl, name, price, id} = this.props.product;
		return (
			<div className="product">
				<img
					src={imageUrl || defaultImageUrl}
					height="200"
					width="200"
					onClick={() => this.moveToProduct(id)}
				/>
				<h2>{name}</h2>
				<h3>{`$${(price/100).toFixed(2)}`}</h3>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		selectedProduct: state.product.selectedProduct
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setSelectedProduct: function(product) {
			dispatch(setSelectedProduct(product));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
