const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
    name: {
        type : Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    description: {
        type: Sequelize.TEXT,
        defaultValue: '' // always expect to parse it

    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    imageUrl: {
            type: Sequelize.STRING
    }
})



module.exports = Product
