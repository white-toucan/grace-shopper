import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Image, Select, Form, Button} from 'semantic-ui-react';
import {getProductByIdThunk, addingToCartThunk} from '../store';
import {defaultImageUrl} from './util/constants';

export class SingleProduct extends Component {
	constructor(props) {
		super(props);
		this.state = {
			quantity: 1
		};
		this.onChangeQty = this.onChangeQty.bind(this);
	}

	componentDidMount() {
		this.props.getProduct(this.props.match.params.productId);
	}

	addingToCartThunk(product) {
		const modifiedProd = {...product, quantity: this.state.quantity};
		this.props.addingToCartThunk(modifiedProd);
	}

	onChangeQty(event) {
		const selectedValue = +event.target.children[0].textContent;
		this.setState({
			quantity: selectedValue
		});
	}

	generateSelectOptions() {
		return new Array(Math.min(10, 20)).fill(1).map((_, i) => ({
			key: i,
			text: i + 1,
			value: i + 1
		}));
	}

	render() {
		const {name, price, description, imageUrl} = this.props.selectedProduct;
		return (
			<Container id="product">
				<span className="cd-case">
					<Image src={imageUrl || defaultImageUrl} size='large' />
				</span>
				<div className="product-info">
					<div>
						<h1 className="product-info-name">{name}</h1>
						<h2 className="product-price">{`$${(price/100).toFixed(2)}`}</h2>
						<p className="product-desc">{description}</p>
					</div>
					<div className="change-qty">
						<Form className="flex-end">
							<Form.Group inline>
								<Form.Field
									label='QTY'
									control={Select}
									options={this.generateSelectOptions()}
									value={this.state.quantity}
									onChange={this.onChangeQty}
								/>
								<Form.Field
									control={Button}
									content='Add to Cart'
									primary
									onClick={() => this.addingToCartThunk(this.props.selectedProduct)}
								/>
							</Form.Group>
						</Form>
					</div>
				</div>
			</Container>
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
