const API_URL = '/api/users';

// Register user
const register = async (userData) => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    const data = await res.json();

    if (data) {
        localStorage.setItem('user', JSON.stringify(data));
    }

    return data;

};

const authService = {
    register,
};

export default authService;