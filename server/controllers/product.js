const products = require('../data/products');

const getProducts = (req, res) => {
    res.json(products);
};

module.exports = {
    getProducts
};