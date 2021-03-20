import { request } from './requestServices.js';

const databaseUrl = 'https://movies-e39f9-default-rtdb.firebaseio.com/';

export const getAllMovies = async (searchText) => {
    let response = await request(`${databaseUrl}movies.json`, 'GET');

    return Object.keys(response).map(key => ({key, ...response[key]})).filter(x => !searchText || searchText == x.title);
}