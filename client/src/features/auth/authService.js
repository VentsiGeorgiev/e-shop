import { request, createOptions } from '../../hooks/useFetch';
import { setUserData } from '../../utils/user';
const API_URL = '/api/users';

// Register user
const register = async (userData) => {

    const result = await request(API_URL, createOptions('post', userData));

    if (result) {
        setUserData(result);
    }

    return result;

};

// Login
const login = async (userData) => {

    const result = await request(`${API_URL}/login`, createOptions('post', userData));

    if (result) {
        setUserData(result);
    }

    return result;
};

// Update user
const update = async (user) => {

    const result = await request(`${API_URL}/profile`, createOptions('put', user));

    setUserData(result);

    return result;
};

const authService = {
    register,
    login,
    update,
};

export default authService;