import { request, createOptions } from '../../hooks/useFetch';
const API_URL = '/api/orders';
// Order create
const orderCreate = async (userData) => {

    const result = await request(API_URL, createOptions('post', userData));

    return result;

};

const orderService = {
    orderCreate,
};

export default orderService;