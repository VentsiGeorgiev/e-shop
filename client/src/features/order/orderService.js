import { request, createOptions } from '../../hooks/useFetch';
const API_URL = '/api/orders';

// Order create
const orderCreate = async (userData) => {

    const result = await request(API_URL, createOptions('post', userData));

    return result;

};

// Get order
const getOrderById = async (id) => {

    const result = await request(`${API_URL}/${id}`);

    return result;

};

const orderService = {
    orderCreate,
    getOrderById
};

export default orderService;