import { request, createOptions } from '../../hooks/useFetch';
const API_URL = '/api/orders';

// Order create
const orderCreate = async (userData) => {

    const result = await request(API_URL, createOptions('post', userData));

    return result;

};

// Get order
const getOrderById = async (id) => {

    const result = await request(`${API_URL}/${id}`, createOptions());

    return result;

};

// Pay order
const payOrder = async (id) => {

    const result = await request(`${API_URL}/${id}/pay`, createOptions('put',));

    return result;

};

const orderService = {
    orderCreate,
    getOrderById,
    payOrder
};

export default orderService;