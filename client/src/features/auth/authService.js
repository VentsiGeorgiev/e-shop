import { request, createOptions } from '../../hooks/useFetch';
const API_URL = '/api/users';

// Register user
const register = async (userData) => {

    const result = await request(API_URL, createOptions('post', userData));

    return result;

};

const authService = {
    register,
};

export default authService;