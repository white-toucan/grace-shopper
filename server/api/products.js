const router = require('express').Router()
const { Products } = require('../db/models/product')

router.get('/products', async (req, res, next) => {
    try {
        const products = await Products.findAll()
        res.json(products)
    } catch (error) {
        next(error)
    }
})

router.get('/products/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10)
        const product = await Products.findById(id)
        if (!product) {
            res.status(404)
        } else {
            res.json(product)
        }
    } catch (error) {
        next(error)
    }

})

router.post('/products', async (req,res,next) => {
    try {
        const product = await Products.create(req.body)
        res.status(200).json({
            message: 'Added Product',
            product
        })
    } catch (error) {
        res.sendStatus(500)
    }
})

router.put('/products', async (re,res,next)=> {
    const id = req.params.id
    try {
        const product = await Products.findById(id)
        if(!product) return res.sendStatus(404)
        const updated = await product.update(req.body)
        res.json({
            product: updated,
            message: 'Product Updated'
        })
    } catch (error) {
     res.sendStatus(500)   
    }
})


router.delete('/products', async (req,res,next)=> { 
    try {
        const id = req.params.id
        const product = await Products.destroy({
            where: {
                id:id
            }
        })
        if (!product){
            return {message: 'Deleted Product'}
        }
    } catch (error) {
        res.staus
    }
})

module.exports = router