import { request, createOptions } from '../../hooks/useFetch';
const API_URL = '/api/products';

const getProducts = async () => {

    const data = await request(API_URL, createOptions());

    return data;
};

const getProduct = async (id) => {

    const data = await request(`${API_URL}/${id}`);

    return data;

};

const productService = {
    getProducts,
    getProduct
};

export default productService;