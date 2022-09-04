const products = require('../data/products');

const getProducts = (req, res) => {
    res.json(products);
};

const getProduct = (req, res) => {
    const product = products.find(p => p._id === req.params.id);
    res.json(product);
};

module.exports = {
    getProducts,
    getProduct
};