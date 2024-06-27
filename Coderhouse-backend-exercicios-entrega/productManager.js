const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.nextId = 1;
    this.loadProducts();
  }

  loadProducts() {
    if (fs.existsSync(this.path)) {
      const data = fs.readFileSync(this.path, 'utf-8');
      this.products = JSON.parse(data);
      this.nextId = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
    } else {
      this.saveProducts();
    }
  }

  saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
  }

  addProduct({ title, description, price, code, stock, thumbnail }) {
    if (!title || !description || !price || !code || !stock || !thumbnail) {
      console.log("Todos os campos são obrigatórios");
      return;
    }

    if (this.products.some(product => product.code === code)) {
      console.log("Código do produto já existe");
      return;
    }

    const product = {
      id: this.nextId++,
      title,
      description,
      price,
      code,
      stock,
      thumbnail
    };

    this.products.push(product);
    this.saveProducts();
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      console.log("Não encontrado");
      return null;
    }
    return product;
  }

  getProducts() {
    return this.products;
  }

  updateProduct(id, updatedProduct) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      console.log("Produto não encontrado");
      return;
    }

    this.products[productIndex] = { ...this.products[productIndex], ...updatedProduct, id };
    this.saveProducts();
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      console.log("Produto não encontrado");
      return;
    }

    this.products.splice(productIndex, 1);
    this.saveProducts();
  }
}

// Exemplo de uso
const productManager = new ProductManager('products.json');

productManager.addProduct({
  title: "Produto 1",
  description: "Descrição do Produto 1",
  price: 100,
  code: "ABC123",
  stock: 10,
  thumbnail: "url/to/thumbnail1.jpg"
});

productManager.addProduct({
  title: "Produto 2",
  description: "Descrição do Produto 2",
  price: 200,
  code: "DEF456",
  stock: 5,
  thumbnail: "url/to/thumbnail2.jpg"
});

console.log("Todos os produtos:", productManager.getProducts());

console.log("Produto com ID 1:", productManager.getProductById(1));

productManager.updateProduct(1, { price: 150 });
console.log("Produto com ID 1 após atualização:", productManager.getProductById(1));

productManager.deleteProduct(2);
console.log("Todos os produtos após deletar o produto com ID 2:", productManager.getProducts());
