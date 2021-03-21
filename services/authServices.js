const apiKey = 'AIzaSyBLmQaI-s_TS1mqt2m3Z2LhrQ1_h9IgrMQ';
const registerUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
const loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

import { Router } from 'https://unpkg.com/@vaadin/router';

import { request } from './requestServices.js';

export const register = async (email, password) => {
    let response = await request(registerUrl, 'POST', {
        email,
        password,
    });

    localStorage.setItem('auth', JSON.stringify(response));

    return response;
}

export const login = async (email, password) => {
    let response = await request(loginUrl, 'POST', {
        email,
        password,
    });

    localStorage.setItem('auth', JSON.stringify(response));

    return response;
}

export const logout = async () => {
    localStorage.setItem('auth', '');
    Router.go('/');
}

export const getUserData = () => {
    try {
        let data = JSON.parse(localStorage.getItem('auth'));

        return {
            isAuthenticated: Boolean(data.idToken),
            email: data.email,
        }
    } catch (error) {
        return {
            isAuthenticated: false,
            email: ''
        }
    }
}