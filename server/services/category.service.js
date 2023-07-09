const {Category} = require('../db/models')
class CategoryService {
    async createCategory (category) {
        try{
            return await Category.create({category})
        } catch (e) {
            return e
        }
    }
    async getAllCategories () {
        try{
            return await Category.findAll()
        } catch (e) {
            return e
        }
    }
    async getSpecificCategory (category) {
        try{
            const categoryQuery = category.split('').map((letter, i) => {
                if (i === 0) {
                    return letter.toUpperCase()
                }
                return letter
            }).join('')
            return await Category.findOne({where:{category:categoryQuery}})
        } catch (e) {
            return e
        }

    }
}

module.exports = new CategoryService()