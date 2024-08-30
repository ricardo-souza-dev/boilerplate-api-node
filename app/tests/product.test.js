// product.test.js
const request = require('supertest');
const app = require('../index');

describe('GET /api/products', () => {
  it('deve retornar todos os produtos', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});

describe('POST /api/products', () => {
  it('deve criar um novo produto', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({
        id: '1001',
        parentId: '2',
        name: 'Produto Teste',
        slug: 'produto-teste',
        sku: '56a4s65d4a65s',
        type: 'd',
        fromPrice: '120.00',
        price: '100.00',
        isAvailable: true,
        categories: [{
          id: '30',
          name: 'Categoria Teste',
          slug: 'categoria-teste',
          isActive: true
        }],
        attributes: [{
          slug: 'cor-preta',
          name: 'Cor Preta',
          value: '37',
          order: '0',
          isActive: true,
          isMain: true
        }],
        mainAttributeOrder: 'asda',
        storeUser: '1020'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('name', 'Produto Teste');
  });
});