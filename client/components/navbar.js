import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout, checkoutCart} from '../store';
import {Icon, Label} from 'semantic-ui-react';

const Navbar = ({handleClick, isLoggedIn}) => (
	<div>
		<h1>BRAVE CART</h1>
		<nav>
			{isLoggedIn ? (
				<div>
					{/* The navbar will show these links after you log in */}
					<Link to="/home">Home</Link>
					<Link to="/cart">Cart</Link>
					<Link to="/orders">Order History</Link>
					<a href="#" onClick={handleClick}>
						Logout
					</a>
					<Label>
						<Icon name="cart" /> 23
						{/* todo: make this cart counter dynamic */}
					</Label>
				</div>
			) : (
				<div>
					{/* The navbar will show these links before you log in */}
					<Link to="/home">Home</Link>
					<Link to="/login">Login</Link>
					<Link to="/signup">Sign Up</Link>
					<Link to="/cart">Cart</Link>
					<Label>
						<Icon name="cart" /> 23
						{/* todo: make this cart counter dynamic */}
					</Label>
				</div>
			)}
		</nav>
		<hr />
	</div>
);

/**
 * CONTAINER
 */
const mapState = state => {
	return {
		isLoggedIn: !!state.user.id
	};
};

const mapDispatch = dispatch => {
	return {
		handleClick() {
			dispatch(logout());
			dispatch(checkoutCart());
		}
	};
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
	handleClick: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired
};
