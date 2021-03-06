import { request } from './requestServices.js';
import { getUserData } from '../services/authServices.js';

const databaseUrl = 'https://movies-e39f9-default-rtdb.firebaseio.com/';

export const getAllMovies = async (searchText) => {
    let response = await request(`${databaseUrl}movies.json`, 'GET');

    if (response != undefined) {
        return Object.keys(response).map(key => ({ key, ...response[key] })).filter(x => !searchText || searchText == x.title);
    }

    return response;
}

export const getOneMovie = async (id) => {
    let response = await request(`${databaseUrl}movies/${id}.json`, 'GET');

    return response;
}

export const addMovie = async (title, description, imageUrl) => {
    let user = getUserData();

    let response = await request(`${databaseUrl}movies.json`, 'POST', {
        title,
        description,
        imageUrl,
        creator: user.email,
    });

    let key = response.name;

    let secondResponse = await request(`${databaseUrl}movies/${key}.json`, 'PATCH', {
        key,
    })
    return secondResponse;
}

export const likeMovie = async (id, creator) => {
    let response = await request(`${databaseUrl}movies/${id}/likes.json`, 'POST', { creator });

    return response;
}

export const deleteMovie = async (id) => {
    let response = await fetch(`${databaseUrl}movies/${id}.json`, { method: "DELETE" });

    return response;
}

export const editMovie = async (id, title, description, imageUrl) => {
   const body = {
       title,description,imageUrl
   }

    let response = await fetch(`${databaseUrl}movies/${id}.json`, { method: "PATCH", body: JSON.stringify(body) });

    return response;
}