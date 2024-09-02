const mongoose = require('mongoose');
const Product = require('./models/productModel'); // Ajuste o caminho conforme necessário

// Conectar ao MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado com sucesso');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err.message);
    process.exit(1);
  }
};

// Gerar produtos de exemplo
const generateProducts = (num) => {
  const products = [];
  for (let i = 1; i <= num; i++) {
    products.push({
      id: `100${i}`,
      parentId: `${Math.floor(Math.random() * 10)}`,
      name: `Produto Teste ${i}`,
      slug: `produto-teste-${i}`,
      sku: `sku-${i}`,
      type: 'd',
      fromPrice: `${Math.floor(Math.random() * 100) + 50}.00`,
      price: `${Math.floor(Math.random() * 50) + 10}.00`,
      isAvailable: true,
      categories: [{
        id: `${Math.floor(Math.random() * 10) + 1}`,
        name: `Categoria Teste ${i}`,
        slug: `categoria-teste-${i}`,
        isActive: true
      }],
      attributes: [{
        slug: `atributo-${i}`,
        name: `Atributo ${i}`,
        value: `${i}`,
        order: `${i}`,
        isActive: true,
        isMain: true
      }],
      mainAttributeOrder: `order-${i}`,
      storeUser: `${Math.floor(Math.random() * 10) + 1000}`
    });
  }
  return products;
};

// Executar o script
const seedProducts = async () => {
  await connectDB();

  const products = generateProducts(500000);

  try {
    await Product.insertMany(products);
    console.log('produtos adicionados com sucesso!');
    process.exit(0);
  } catch (err) {
    console.error('Erro ao adicionar produtos:', err.message);
    process.exit(1);
  }
};

seedProducts();
