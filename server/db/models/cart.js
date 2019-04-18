const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
	isActive: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: true
	}
});

module.exports = Cart;
