// index.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const { swaggerDocs, swaggerUi } = require('./swagger');
const app = express();

// Permitir requisições de http://localhost:3000
app.use(cors({
  origin: 'http://localhost:3000', // Substitua com a origem correta
}));

// Conectar ao MongoDB
connectDB();

// Middleware
app.use(express.json());

// Rotas
app.use('/api', productRoutes);

// Configuração do Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;