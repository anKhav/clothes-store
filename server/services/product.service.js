const {resolve} = require("path");
const {Product, Size, ProductSize, Category, ProductCategory, Rating} = require('../db/models')
const {Op} = require("sequelize");
const ProductDto = require('../dtos/productDto')

class ProductService{
    async createProduct (product) {
        const files = product.imgs.reduce((acc, item) => {
           acc.push(item.name)
           return acc
        },[])
        const fileNamesStr = files.join(',')

        const productData = await Product.create(
            {
                name:product.name,
                price:product.price,
                imgs: fileNamesStr
            },
            {
            include: [Size, Category],
        })

        const sizeData = await Size.findAll({where:{
                size:{
                    [Op.or]:product.sizes.split(',')
                }
            }})

        const categoryData = await Category.findAll({where:{
                category:{
                    [Op.or]:product.categories.split(',')
                }
            }})

        await productData.addSize(sizeData, {through: ProductSize})
        await productData.addCategory(categoryData, {through: ProductCategory})

        product.imgs.forEach(img => img.mv(resolve(__dirname,'..', 'static', img.name)))

        return new ProductDto({
            id: productData.dataValues.id,
            name: productData.dataValues.name,
            price: productData.dataValues.price,
            imgs: productData.dataValues.imgs.split(','),
            sizes: sizeData.reduce((acc, size) => {
                acc.push(size.size)
                return acc
            }, []),
            categories: categoryData.reduce((acc, category) => {
                acc.push(category.category)
                return acc
            }, [])
        })
    }
    async findAllProducts () {
        const products =  await Product.findAll({
            include:[Size, Category]
        })
        return products.map(product => new ProductDto({
            id: product.id,
            name: product.name,
            price: product.price,
            images: product.imgs.split(','),
            sizes: product.Sizes.reduce((acc, size) => {
                acc.push(size.size)
                return acc
            }, []),
            categories: product.Categories.reduce((acc, category) => {
                acc.push(category.category)
                return acc
            }, [])
        }))
    }
    async findProductsByQuery () {
        return await Product.findAll({
            include: [{
                model: Size,
                attributes: ['size'],
                through: {where: {size: 'xs'}}
            }]
        })
    }
    async findSpecificProduct (id) {
        try{
            const product = await Product.findOne({where:{id},
            include:[Size, Category, Rating]
            })
            return new ProductDto({
                id: product.id,
                name: product.name,
                price: product.price,
                images: product.imgs.split(','),
                rating:product.Ratings.reduce((acc, rating) => {
                    acc.push({
                        id:rating.id,
                        rating:rating.rating,
                        review:rating.review,
                        product_id:rating.product_id,
                        user_id:rating.user_id,
                    })
                    return acc
                }, []),
                sizes: product.Sizes.reduce((acc, size) => {
                    acc.push(size.size)
                    return acc
                }, []),
                categories: product.Categories.reduce((acc, category) => {
                    acc.push(category.category)
                    return acc
                }, [])
            })
        } catch (e){
            return e
        }
    }
}

module.exports = new ProductService()