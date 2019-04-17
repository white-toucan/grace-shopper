const Sequelize = require('sequelize');
const db = require('../db');

const CartItems = db.define('cartItems', {
	quantity: {
		type: Sequelize.INTEGER,
		default: 1
	}
});

module.exports = CartItems;
