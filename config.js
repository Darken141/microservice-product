const mongoose = require('mongoose')

const productPropertiesArr= ['name', 'description', 'image', 'eshop', 'price', 'soldAmount', 'available']

const productModel = {
    name:{
        type:String
    },
    description:{
        type:String
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Image'
    },
    dateCreated:{
        type: Date,
        default: Date.now
    },
    eshop: {
        type: Boolean
    },
    price: {
        type: Number
    },
    soldAmount: {
        type: Number,
        default: 0
    },
    available: {
        type: Number,
        default: 0
    }
}

module.exports = {
    productModel,
    productPropertiesArr,
}