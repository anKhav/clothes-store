const {Rating} = require('../db/models')
class RatingService{
    async createRating(user_id, product_id, rating, review){
        const data = await Rating.create({rating, review, product_id, user_id})
        console.log(data);
        return data
    }
    async getAllRatings(){
        return await Rating.findAll()
    }
}

module.exports = new RatingService()