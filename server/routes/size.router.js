const {Router} = require('express')
const SizeController = require('../controllers/size.controller')
const router = new Router()

router.post('/create', SizeController.createSize)
router.get('/get-all', SizeController.getAllSizes)
router.get('/:size', SizeController.getSpecificSize)

module.exports = router
