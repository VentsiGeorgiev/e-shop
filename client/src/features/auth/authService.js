import { request, createOptions } from '../../hooks/useFetch';
const API_URL = '/api/users';

// Register user
const register = async (userData) => {

    const result = await request(API_URL, createOptions('post', userData));

    if (result) {
        localStorage.setItem('user', JSON.stringify(result));
    }

    return result;

};

// Login
const login = async (userData) => {

    const result = await request(`${API_URL}/login`, createOptions('post', userData));

    if (result) {
        localStorage.setItem('user', JSON.stringify(result));
    }

    return result;
};


// Logout
const logout = () => localStorage.removeItem('user');

const authService = {
    register,
    logout,
    login
};

export default authService;