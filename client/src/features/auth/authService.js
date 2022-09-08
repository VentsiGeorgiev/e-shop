import { request, createOptions } from '../../hooks/useFetch';
import { getToken, setUserData } from '../../utils/user';
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

// Update user
const update = async (user) => {

    const token = getToken();

    const result = await fetch(`${API_URL}/profile`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
    });
    const response = await result.json();

    setUserData(response);

    return response;
};

const authService = {
    register,
    logout,
    login,
    update,
};

export default authService;