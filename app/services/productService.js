// productService.js
const Product = require('../models/productModel');

exports.findAllProducts = async () => {
  return await Product.find();
};

exports.createProduct = async (productData) => {
  const product = new Product(productData);
  return await product.save();
};