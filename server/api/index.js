const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/products', require('./products'));
router.use('/cartItems', require('./cartItems'));
router.use('/me', require('./me'));

router.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});
