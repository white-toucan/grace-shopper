const router = require('express').Router();
const Product = require('../db/models/product');

router.get('/', async (req, res, next) => {
	try {
		const products = await Product.findAll();
		res.json(products);
	} catch (error) {
		next(error);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const id = parseInt(req.params.id, 10);
		const product = await Product.findByPk(id);
		if (!product) {
			res.sendStatus(404);
		} else {
			res.json(product);
		}
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const postProduct = {
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			imageUrl: req.body.imageUrl
		};
		const product = await Product.create(postProduct);

		res.status(200).json(product);
	} catch (error) {
		next(error);
	}
});

router.put('/:id', async (req, res, next) => {
	const id = parseInt(req.params.id, 10);
	try {
		const productKeys = ['name', 'description', 'price', 'imageUrl'];

		const productUpdate = {};
		for (let prop of productKeys) {
			if (req.body.hasOwnProperty(prop)) {
				productUpdate[prop] = req.body[prop];
			}
		}

		const product = await Product.findByPk(id);
		if (!product) return res.sendStatus(404);
		
		const updated = await product.update(productUpdate);
		res.json(updated);
	} catch (error) {
		next(error);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		const id = parseInt(req.params.id, 10);
		await Product.destroy({
			where: {
				id: id
			}
		});
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
