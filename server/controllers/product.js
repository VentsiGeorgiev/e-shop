const Product = require('../models/Product');
// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});

        res.json(products);

    } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: err });
    }
};

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);

        if (product) {
            res.json(product);
        } else {
            throw new Error('Product not found');
        }


    } catch (err) {
        console.error(err);
        res.status(404);
        res.json({ message: err.message });

    }

};

module.exports = {
    getProducts,
    getProduct
};