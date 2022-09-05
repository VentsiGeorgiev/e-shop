const API_URL = '/api/products';

const getProducts = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();

    return data;
};

const getProduct = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();

    return data;
};

const productService = {
    getProducts,
    getProduct
};

export default productService;