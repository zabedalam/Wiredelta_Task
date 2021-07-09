const Product = require('../models/product')


//Get all products=>/api/products
exports.getProducts=(req,res,next)=>{
    res.status(200).json({
        success: true,
        message:'This route will show all products in database'
    })
}
//Create a new product=>/api/product/new
exports.newProduct=async(req, res,nex)=>{
    const product =await Product.create(req.body)

    res.status(201).json({
        success:true,
        product
    })
}