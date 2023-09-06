const mongoose = require("mongoose");
const Schema = mongoose.Schema
//./ indicaties index in model folder
const {ProductSchema} = require('./')

const OrderSchema = new Schema ({
    total: {type: Number, required: true},
    orderNumber: {type: String},
    item: ProductSchema
})

module.exports = mongoose.model("Order", OrderSchema);

//item property in orderSchema can be changed to an array like item : [ProductSchema], if i want to implement shopping cart and allow multiple items to be part of one orders