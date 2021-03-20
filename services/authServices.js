const apiKey = 'AIzaSyBLmQaI-s_TS1mqt2m3Z2LhrQ1_h9IgrMQ';
const registerUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;

import { request } from './requestServices.js';

export const register = async (email, password) => {
    let response = await request(registerUrl, 'POST', {
        email,
        password,
    });

    localStorage.setItem('auth', JSON.stringify(response));

    return response;
}