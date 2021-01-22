const express = require('express')
const router = express.Router()
const {serverError} = require('../utils/utils')
const { productPropertiesArr } = require('../config')
const Product = require('../model/product.model')

router.get('/', async (req, res) => {
    try {
        const products = await Product.find().populate('images')

        return res.json({
            message: "Products retrieved successfully",
            count: products.length,
            products: products
        })
    } catch (err) {
        serverError(res, err)
    }
})

router.get('/:id', getProduct, async (req, res) => {
    try {
        const product = await Product.find()
        return res.json({
            message: "Product retrieved successfully",
            product: product
        })
    } catch (err) {
        serverError(res, err)
    }
})



router.post('/', async (req, res) => {
    const checkifOk = (productToCheck) => {
        let isOk = false
        for (let prop of productPropertiesArr) {
            if(productToCheck[prop] === undefined) {
                isOk = false
                break
            } else {
                isOk = true
            }
        }
        return isOk
    }
    const product = req.body
    const canCreate = checkifOk({...product})

    try {
        if(canCreate) {
            const productToCreate = new Product({
                ...product
            })
            productToCreate.save()

            res.json({
                message: "Successfully created",
                product: productToCreate
            })
        } else {
            res.json({
                message: "Can't be created, something is missing",
                error: "format"
            })
        }

    } catch (err) {
        serverError(res, err)
    }
})

router.delete('/:id',getProduct,  async (req, res) => {
    try {
        if(res.product) {
            await res.product.delete()
            res.json({
                message: "Successfully deleted",
                product: res.product
            })
        } else {
            res.json({
                message: "No product to delete",
                error: "not found"
            })
        }
    } catch (err) {
        serverError(res, err)
    }
})

async function getProduct(req, res, next) {
    let product
    try {
        product = await Product.findById(req.params.id)
        if( product == null ) {
            return res.status(404).json({message: "Cannot find product reference"})
        }
    } catch (err) {
        serverError(res, err)
    }

    res.product = product
    next()
}

module.exports = router