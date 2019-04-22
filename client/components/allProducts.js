import React, {Component} from 'react';
import {getAllProductsThunk} from '../store';
import {connect} from 'react-redux';
import ProductCard from './productCard';

export class AllProducts extends Component {
	componentDidMount() {
		this.props.getAllProducts();
	}

	render() {
		const {allProductsList} = this.props;

		return (
			<div id="home">
				<div id="home-banner">
					<h1>SOME PLACEHOLDER</h1>
				</div>
				<div className="allProducts">
					<div className="ui five cards">
						{allProductsList && allProductsList.map(product => (
							<ProductCard history={this.props.history} product={product} key={product.id} />
						))}
					</div>
				</div>
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
