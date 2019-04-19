const Sequelize = require('sequelize');
const db = require('../db');

const Category = db.define('category', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	description: {
		type: Sequelize.TEXT,
		defaultValue: '' // always expect to parse it
	},
	imageUrl: {
		type: Sequelize.STRING
	}
});

module.exports = Category;
