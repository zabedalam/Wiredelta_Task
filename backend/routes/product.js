const express = require("express");
const router = express.Router();

const {newProduct,getProducts}=require("../controllers/productController")

router.route('/product/new').post(newProduct)
router.route('/products').get(getProducts)


module.exports=router