const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/**
 * @openapi
 * /api/products:
 *   get:
 *     summary: Retorna uma lista de produtos com paginação
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Número da página para a paginação
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 2
 *         description: Número de produtos por página
 *     responses:
 *       200:
 *         description: Lista de produtos com informações de paginação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 totalProducts:
 *                   type: integer
 *                   example: 10
 *       400:
 *         description: Parâmetros de consulta inválidos
 *       500:
 *         description: Erro ao buscar produtos
 */
router.get('/products', productController.getProducts);

/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     summary: Retorna um produto pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 60d5f485f6d5d5f7d8f8f8f8
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro ao buscar o produto
 */
router.get('/products/:id', productController.getProductById);

/**
 * @openapi
 * /api/products:
 *   post:
 *     summary: Cria um novo produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Dados de entrada inválidos
 *       500:
 *         description: Erro ao criar o produto
 */
router.post('/products', productController.createProduct);

module.exports = router;
