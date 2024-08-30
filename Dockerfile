# Use uma imagem base Node.js
FROM node:18

# Crie um diretório de trabalho
WORKDIR /app

# Copie o package.json e o package-lock.json (ou yarn.lock)
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Execute os testes
CMD ["npm", "start"]
