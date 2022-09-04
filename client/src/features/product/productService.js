const API_URL = '/api/products';

const getProducts = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();

    console.log('DATA ---- DATA ---- DATA');
    console.log(data);
    return data;
};

const productService = {
    getProducts
};

export default productService;