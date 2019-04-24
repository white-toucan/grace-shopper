import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logout, checkoutCart} from '../store';
import {Link} from 'react-router-dom'
import {Icon, Menu} from 'semantic-ui-react';

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeItem: {}
		};
	}

	handleSelectClick = (e, {name}) => {
		this.setState({activeItem: name});
		this.props.history.push(`/${name}`);
	};

	render() {
		const {activeItem} = this.state;
		return (
			<div>
				<h1>Grunge Cart</h1>
				<nav>
					{this.props.isLoggedIn ? (
						<div>
							{/* The navbar will show these links after you log in */}
							<Menu>
								<Menu.Item
									name="Products"
									active={activeItem === 'Products'}
									onClick={this.handleSelectClick}
								/>
								<Menu.Menu position="right">
								<Menu.Item>
										<Link
											to='/profile'
											
										>
											Profile
										</Link>
									</Menu.Item>
									<Menu.Item>
										<a
											href="#"
											onClick={() => {
												this.props.handleLoginClick();
											}}
										>
											Logout
										</a>
									</Menu.Item>
									<Menu.Item
										name="Cart"
										active={activeItem === 'Cart'}
										onClick={this.handleSelectClick}
									>
										<Icon name="cart" /> {this.props.cartItemsQuantity}
									</Menu.Item>
								</Menu.Menu>
							</Menu>
						</div>
					) : (
						<div>
							{/* The navbar will show these links before you log in */}
							<Menu>
								<Menu.Item
									name="Products"
									active={activeItem === 'Products'}
									onClick={this.handleSelectClick}
								/>
								<Menu.Menu position="right">
									<Menu.Item
										name="login"
										active={activeItem === 'login'}
										onClick={this.handleSelectClick}
									/>
									<Menu.Item
										name="signup"
										active={activeItem === 'signup'}
										onClick={this.handleSelectClick}
									/>
									<Menu.Item
										name="Cart"
										active={activeItem === 'Cart'}
										onClick={this.handleSelectClick}
									>
										<Icon name="cart" /> {this.props.cartItemsQuantity}
									</Menu.Item>
								</Menu.Menu>
							</Menu>
						</div>
					)}
				</nav>
			</div>
		);
	}
}

/**
 * CONTAINER
 */
const mapState = state => {
	return {
		isLoggedIn: !!state.user.id,
		cartItemsQuantity: state.cart.cartItems.reduce((agg, cartItem) => {
			agg = cartItem.quantity + agg;
			return agg;
		}, 0)
	};
};

const mapDispatch = dispatch => {
	return {
		handleLoginClick() {
			dispatch(logout());
			dispatch(checkoutCart());
		}
	};
};

export default connect(mapState, mapDispatch)(Navbar);
