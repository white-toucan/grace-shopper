import React, {Component} from 'react';
import {getAllProductsThunk} from '../store';
import {connect} from 'react-redux';
import ProductCard from './productCard';
import { Container } from 'semantic-ui-react';

export class AllProducts extends Component {
	componentDidMount() {
		this.props.getAllProducts();
	}

	render() {
		const {allProductsList} = this.props;

		return (
			<section className="allProducts">
				<h1 className="text-center">All Discs</h1>
				<Container className="doubling stackable three column grid">
				{allProductsList && allProductsList.map(product => (
					<ProductCard history={this.props.history} product={product} key={product.id} />
				))}
				</Container>
			</section>
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
