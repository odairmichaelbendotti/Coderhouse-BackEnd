class ProductManager {
  constructor() {
    this.products = [];
    this.nextId = 1;
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
}

const productManager = new ProductManager();

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

console.log("Produto com ID 3:", productManager.getProductById(3));
