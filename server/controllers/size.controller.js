const SizeService = require('../services/size.service')
class SizeController{
    async createSize (req, res, next){
        try{
            const {size} = req.body
            const data = await SizeService.createSize(size)
            res.json(data)
        } catch (e){
            next(new Error(e.message))
        }
    }
    async getAllSizes (req, res, next){
        try{
            const data = await SizeService.getAllSizes()
            res.json(data)
        } catch (e) {
            next(new Error(e.message))
        }
    }
    async getSpecificSize (req, res, next){
        try{
            const {size} = req.params
            const data = await SizeService.getSpecificSize(size)
            res.json(data)
        }catch (e) {
            next(new Error(e.message))
        }
    }
}

module.exports = new SizeController()