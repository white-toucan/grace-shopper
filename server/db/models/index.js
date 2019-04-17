const User = require('./user')
const Cart = require('./cart');
const CartItems = require('./cartItems');
const Product = require('./product');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.hasMany(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItems, foreignKey: 'cartId'});
Product.belongsToMany(Cart, {through: CartItems, foreignKey: 'productId'});
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Cart,
  CartItems,
  Product
}
