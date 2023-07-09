const {Router} = require('express')
const CategoryController = require('../controllers/category.controller')
const router = new Router()

router.post('/create', CategoryController.createCategory)
router.get('/get-all', CategoryController.getAllCategories)
router.get('/:category', CategoryController.getSpecificCategory)

module.exports = router
