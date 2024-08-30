// productModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definindo o esquema para ProductCategory
const productCategorySchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  isActive: { type: Boolean, required: true }
});

// Definindo o esquema para ProductAttribute
const productAttributeSchema = new Schema({
  slug: { type: String, required: true },
  name: { type: String, required: true },
  value: { type: String, required: true },
  order: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  isMain: { type: Boolean, required: true }
});

// Definindo o esquema para Product
const productSchema = new Schema({
  id: { type: String, required: true },
  parentId: { type: String, required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  sku: { type: String, required: true },
  type: { type: String, required: true },
  fromPrice: { type: String, required: true },
  price: { type: String, required: true },
  isAvailable: { type: Boolean, required: true },
  categories: [productCategorySchema],
  attributes: [productAttributeSchema],
  mainAttributeOrder: { type: String, required: true },
  storeUser: { type: String, required: true }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;