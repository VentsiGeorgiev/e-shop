import { getToken } from "../utils/user";

export async function request(url, options) {

    try {
        const response = await fetch(url, options);

        if (response.ok === false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        try {
            const data = await response.json();
            return data;
        } catch (error) {
            return response;
        }

    } catch (err) {
        throw err;
    }

};

export function createOptions(method = 'get', data) {
    const options = {
        method,
        headers: {}
    };

    const token = getToken();
    if (token !== null) {
        options.headers.Authorization = `Bearer ${token}`;
    }


    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    return options;

};