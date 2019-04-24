import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {updatingUser} from '../store/user';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {isEditing: false, name: this.props.user.name, address: this.props.user.address};
	}

	toggleEdit = () => {
		this.setState({isEditing: !this.state.isEditing});
	};

	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	updateInfo = e => {
		e.preventDefault();
		this.props.updatingUser({
			name: this.state.name,
			address: this.state.address
		});
	};
	render() {
		return (
			<div>
				{this.state.isEditing ? (
					<form onSubmit={this.updateInfo}>
						<input
							onChange={this.onChange}
							type="text"
							name="name"
							defaultValue={this.props.user.name}
						/>
						<input
							onChange={this.onChange}
							type="text"
							name="address"
							defaultValue={this.props.user.address}
						/>
						<button type="submit">Update Info</button>
					</form>
				) : (
					<div>
						<div>name:{this.props.user.name}</div>
						<div>address:{this.props.user.address}</div>
						{/* <div>card number: {this.props.user.cardNumber}</div> */}
						<div>email: {this.props.user.email} </div>
						{/* <div> googleId: {this.props.user.googleId || 'N/A'} </div> */}
						{/* <div> isAdmin: {this.props.user.isAdmin ? 'yes' : 'no '}</div> */}
					</div>
				)}

				<button type="button" onClick={this.toggleEdit}>
					Edit
				</button>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user
});

const mapDispatchToProps = dispatch => ({
	updatingUser(userInfo) {
		return dispatch(updatingUser(userInfo));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
