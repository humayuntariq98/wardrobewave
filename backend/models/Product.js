const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ProductSchema = new Schema ({
name: {type: String, required: true},
image: {type: Array, required:true},
product_description : {type: String, required:true},
price: {type: Number, required: true}
})




module.exports = mongoose.model("Product", ProductSchema);