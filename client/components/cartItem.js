import React, {Component} from 'react';
import {
	setSelectedProduct,
	updateItemQtyThunk,
	deleteFromCartThunk
} from '../store/index';
import {connect} from 'react-redux';
import {defaultImageUrl} from './util/constants';
import {Item, Button, Icon} from 'semantic-ui-react';

export class CartItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			quantity: this.props.product.quantity
		}
		this.onClickMoveToProduct = this.onClickMoveToProduct.bind(this);
	}

	onClickMoveToProduct(product) {
		this.props.setSelectedProduct(product);
		this.props.history.push(`/products/${product.id}`);
	}

	onClickDeleteFromCartThunk(product) {
		this.props.deleteFromCartThunk(product);
	}

	onChangeQty(event) {
		this.setState({
			quantity: +event.target.value
		});
	}

	onSubmitQtyChangeThunk(product) {
		event.preventDefault();
		const modifiedProd = {...product, quantity: this.state.quantity};
		this.props.updateItemQtyThunk(modifiedProd);
	}

	render() {
		let {product} = this.props;

		return (
			<Item className="cartItem">
				<div className="cd-case small">
					<img
						src={product.imageUrl || defaultImageUrl}
						className="ui image"
						onClick={() => this.onClickMoveToProduct(product)} />
				</div>

				<Item.Content>
					<Item.Header>{product.name}</Item.Header>
					<Item.Meta>
						<span className='price'>{`$${(product.price / 100).toFixed(2)}`}</span>
					</Item.Meta>
					<Item.Description>

						<form onSubmit={() => this.onSubmitQtyChangeThunk(product)}>
							<span className="change-qty">
								<label htmlFor="quantity" style={{display: 'inline'}}>Qty</label>
								<select
									name="quantity"
									value={this.state.quantity}
									onChange={(event) => this.onChangeQty(event)}>
									{
										new Array(Math.min(10, 20)).fill(1).map((_, i) =>
											<option key={i} value={i + 1}>{i + 1}</option>
										)
									}
								</select>
							</span>
							<Button type="submit" size="tiny">
								<Icon name='exchange' />Update
							</Button>
						</form>
						<span>
							<Button icon
								size="tiny"
								color="red"
								onClick={() => this.onClickDeleteFromCartThunk(product)}
								type="button">
								<Icon name='cancel' />
								Remove
							</Button>
						</span>
					</Item.Description>
				</Item.Content>
			</Item>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setSelectedProduct: function(product) {
			dispatch(setSelectedProduct(product));
		},
		deleteFromCartThunk: function(product) {
			dispatch(deleteFromCartThunk(product));
		},
		updateItemQtyThunk: function(product) {
			dispatch(updateItemQtyThunk(product));
		}
	};
};

export default connect(null, mapDispatchToProps)(CartItem);
