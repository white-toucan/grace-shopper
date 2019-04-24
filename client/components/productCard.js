import React, {Component} from 'react';
import {setSelectedProduct} from '../store';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {defaultImageUrl} from './util/constants';
import {Card, Icon, Image} from 'semantic-ui-react';

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
			<Link to={`/products/${id}`} className="column">
				<Card fluid className="ui segment">
					<span className="cd-case">
						<Image src={imageUrl || defaultImageUrl} />
					</span>
					<Card.Content>
						<Card.Header>{name}</Card.Header>
						{/* <Card.Meta>
							<span>Nevermind</span>
						</Card.Meta>
						<Card.Meta>
							<span className='date'>1993</span>
						</Card.Meta>
						<Card.Meta>
							<span>Grunge</span>
						</Card.Meta> */}
						{/* <Card.Description>1993 Grunge</Card.Description> */}
					</Card.Content>
					<Card.Content extra className="price">
						{`$${(price/100).toFixed(2)}`}
					</Card.Content>
				</Card>
			</Link>
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
