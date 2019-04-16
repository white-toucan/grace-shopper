import React, {Component} from 'react';
import {getAllProductsThunk} from '../store/product';
import {connect} from 'react-redux';
import ProductCard from './productCard';

export class AllProducts extends Component {
	componentDidMount() {
		this.props.getAllProducts();
	}

	render() {
		const {allProductsList} = this.props;

		return (
			<div className="allProducts">
				<h1>All Products Container</h1>
				{allProductsList.map(product => (
					<ProductCard product={product} key={product.id} />
				))}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		allProductsList: state.product.allProductsList
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getAllProducts: function() {
			dispatch(getAllProductsThunk());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
