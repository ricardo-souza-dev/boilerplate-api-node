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
        name: 'Produto Teste',
        price: 100,
        category: 'Categoria Teste'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('name', 'Produto Teste');
  });
});