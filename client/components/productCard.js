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
			<div className="product ui card">
				<img
					src={imageUrl || defaultImageUrl}
					// height="200"
					// width="200"
					className="ui image"
					onClick={() => this.moveToProduct(id)}
				/>
				<h2 className="ui header">
					{name}
					<div className="sub header">{`$${(price/100).toFixed(2)}`}</div>
				</h2>

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
