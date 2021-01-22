const mongoose = require('mongoose')
const {productModel } = require('../config')

const productSchema = mongoose.Schema(productModel)

module.exports = mongoose.model("Product", productSchema)