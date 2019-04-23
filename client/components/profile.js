import React, {Component} from 'react';
import {connect} from 'react-redux';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {isEditing: false};
	}

	toggleEdit = () => {
		this.setState({isEditing: !this.state.isEditing});
	};

	render() {
		return (
			<div>
				{this.state.isEditing ? (
					<form>
						<input onChange='value' type="text" name="name" value={this.props.user.name} />
						<input type="text" name="address" value={this.props.user.address} />
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

export default connect(mapStateToProps, null)(Profile);
