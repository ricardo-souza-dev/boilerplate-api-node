const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sua API',
      version: '1.0.0',
      description: 'Descrição da sua API',
    },
    components: {
      schemas: {
        Product: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'ID do produto', example: '60d5f485f6d5d5f7d8f8f8f8' },
            name: { type: 'string', description: 'Nome do produto', example: 'Produto Exemplo' },
            price: { type: 'number', format: 'float', description: 'Preço do produto', example: 29.99 },
            description: { type: 'string', description: 'Descrição do produto', example: 'Descrição do produto' }
          },
          required: ['name', 'price']
        }
      }
    }
  },
  apis: ['./routes/*.js'], // Certifique-se de que esse caminho está correto
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerDocs, swaggerUi };