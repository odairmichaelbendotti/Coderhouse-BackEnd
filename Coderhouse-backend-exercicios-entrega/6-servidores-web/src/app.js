const express = require('express');
const ProductManager = require('./ProductManager');
const app = express();
const PORT = 3000;

const productManager = new ProductManager('./src/data/produtos.json');

app.get('/', (req, res) => {
    res.send("Você está na página inicial.");
});

app.get('/products', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const products = await productManager.getAllProducts();

        if (limit && !isNaN(limit)) {
            res.json(products.slice(0, limit));
        } else {
            res.json(products);
        }
    } catch (error) {
        console.error('Erro ao tentar recuperar os produtos:', error);
        res.status(500).send('Erro ao tentar recuperar os produtos.');
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        const product = await productManager.getProductById(req.params.pid);
        if (product) {
            res.json(product);
        } else {
            res.status(404).send('Produto não encontrado');
        }
    } catch (error) {
        console.error('Erro ao tentar recuperar o produto:', error);
        res.status(500).send('Erro ao tentar recuperar o produto.');
    }
});

app.use((req, res) => {
    res.status(404).send('Erro 404: Página não encontrada.');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
});
