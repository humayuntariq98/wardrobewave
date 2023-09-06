const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ProductSchema = new Schema ({
name: {type: String, required: true},
images: {type: Array, required:true},
product_description: {type: String, required:true},
price: {type: Number, required: true},
categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }]
},{timestamps: true})

module.exports = {Product: mongoose.model("Product", ProductSchema),
ProductSchema
};

//many to many relationship bw products and categories as one category can have many products and one product can belong to many categories