const fs = require('fs').promises;

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async getAllProducts() {
        try {
            console.log(`Lendo arquivo de produtos de: ${this.filePath}`);
            const data = await fs.readFile(this.filePath, 'utf-8');
            console.log('Dados lidos do arquivo:', data);
            return JSON.parse(data);
        } catch (error) {
            console.error('Erro ao ler o arquivo de produtos:', error);
            throw error;
        }
    }

    async getProductById(id) {
        try {
            console.log(`Procurando produto com ID: ${id}`);
            const products = await this.getAllProducts();
            const product = products.find(product => product.id === parseInt(id));
            console.log('Produto encontrado:', product);
            return product;
        } catch (error) {
            console.error('Erro ao obter o produto por ID:', error);
            throw error;
        }
    }
}

module.exports = ProductManager;
