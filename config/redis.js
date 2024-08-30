const redis = require('redis');

// Crie um cliente Redis
const client = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379
});

// Tratamento de eventos de erro
client.on('error', (err) => {
  console.error('Erro ao conectar ao Redis:', err);
});

// Conectar ao Redis
client.connect().then(() => {
  console.log('Conectado ao Redis');
}).catch((err) => {
  console.error('Erro ao conectar ao Redis:', err);
});

// Exportar o cliente Redis
module.exports = client;