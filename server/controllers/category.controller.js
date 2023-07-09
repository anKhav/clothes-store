const CategoryService = require('../services/category.service')
class CategoryController{
    async createCategory (req, res, next){
        try{
            const {category} = req.body
            const data = await CategoryService.createCategory(category)
            res.json(data)
        } catch (e) {
            next(new Error(e.message))
        }
    }
    async getAllCategories (req, res, next){
        try{
            const data = await CategoryService.getAllCategories()
            res.json(data)
        } catch (e) {
            next(new Error(e.message))
        }
    }
    async getSpecificCategory (req, res, next){
        try{
            const {category} = req.params
            const data = await CategoryService.getSpecificCategory(category)
            res.json(data)
        } catch (e) {
            next(new Error(e.message))
        }
    }
}

module.exports = new CategoryController()