const Sequelize = require('sequelize');
const db = require('../db');

const CartItems = db.define('cartItems', {
	quantity: {
		type: Sequelize.INTEGER,
		defaultValue: 1
	}
});

module.exports = CartItems;
