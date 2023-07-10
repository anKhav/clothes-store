const RatingService = require('../services/rating.service')
class RatingController{
    async createRating (req,  res, next){
        try {
            const {rating, review, userId, productId} = req.body
            const data = await RatingService.createRating(userId, productId, rating, review)
            res.json(data)
        } catch (e) {
            next(new Error(e.message))
        }
    }
    async getAllRatings (req, res, next) {
        try{
            const data = await RatingService.getAllRatings()
            res.json(data)
        }catch (e) {
            next(new Error(e.message))
        }
    }
}

module.exports = new RatingController()