// productController.js

const Product = require('../models/productModel');
const { validationResult } = require('express-validator');

exports.getProducts = async (req, res) => {
  try {

    // Pega parâmetros de consulta
    const page = parseInt(req.query.page) || 1; // Página atual
    const limit = parseInt(req.query.limit) || 2; // Número de produtos por página

    // Valida se os parâmetros são números positivos
    if (page < 1 || limit < 1) {
      return res.status(400).json({ message: 'Os parâmetros de página e limite devem ser números positivos' });
    }

    // Calcula o número de documentos a pular
    const skip = (page - 1) * limit;

    // Faz a consulta com paginação
    const products = await Product.find()
      .skip(skip)
      .limit(limit);

    // Conta o total de produtos para a paginação
    const totalProducts = await Product.countDocuments();

    res.json({
      products,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
      totalProducts
    });
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar produtos: " + err.message });
  }
};

// productController.js
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProduct = async (req, res) => {
  // Validar os dados de entrada
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const product = new Product(req.body);

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: "Erro ao criar produto: " + err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    // Encontrar e excluir o produto pelo ID
    const result = await Product.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    res.status(200).json({ message: "Produto excluído com sucesso" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao excluir produto: " + err.message });
  }
};
