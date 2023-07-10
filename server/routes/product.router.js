const {Router} = require('express')
const ProductController = require('../controllers/product.controller')
const router = new Router()

router.post('/create', ProductController.createProduct)
router.get('/get-all', ProductController.findAllProducts)
router.get('/', ProductController.findProductsByQuery)
router.get('/:id', ProductController.findSpecificProduct)

module.exports = router
