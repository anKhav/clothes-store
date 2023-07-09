const {Size} = require('../db/models')
class SizeService {
    async createSize (size) {
        try {
            return await Size.create({size})
        } catch (e) {
            return e
        }
    }
    async getAllSizes () {
        try {
            return await Size.findAll()
        } catch (e) {
            return e
        }
    }
    async getSpecificSize (size) {
        try {
            const sizeQuery = size.split('').map(letter => letter.toUpperCase()).join('')
            return await Size.findOne({where:{size:sizeQuery}})
        } catch (e) {
            return e
        }
    }
}

module.exports = new SizeService()