const {Router} = require('express')
const RatingController = require('../controllers/rating.controller')
const router = new Router()

router.post('/create', RatingController.createRating)
router.get('/get-all', RatingController.getAllRatings)


module.exports = router
