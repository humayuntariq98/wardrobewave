// index.js
const {Product, ProductSchema} = require('./Product')

module.exports = {
    Product,
    ProductSchema,
    Category: require('./Category'),
    Cart: require('./Cart')
	 // module.exports returns an object containing references to each of our imported models
}
