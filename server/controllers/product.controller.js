
const ProductService = require('../services/product.service')
class ProductController{
    async createProduct (req, res, next) {
        try{
            const {name, price, sizes, categories} = req.body
            const {imgs} = req.files
            const data = await ProductService.createProduct({name, price, imgs, sizes, categories})
            res.json(data)
        } catch (e) {
            next(new Error(e.message))
        }
    }
    async findAllProducts (req, res, next) {
        try{
            const data = await ProductService.findAllProducts()
            res.json(data)
        } catch (e) {
            next(new Error(e.message))
        }
    }
    async findProductsByQuery (req, res, next) {
        try{
            const query = req.query
            const entries = Object.entries(query)
            const data = await ProductService.findProductsByQuery(entries)
            res.json(data)
        } catch (e) {
            next(new Error(e.message))
        }
    }
    async findSpecificProduct (req, res, next) {
        try{
            const {id} = req.params
            console.log(id);
            const data = await ProductService.findSpecificProduct(id)
            res.json(data)
        } catch (e) {
            next(new Error(e.message))
        }
    }
}

module.exports = new ProductController()