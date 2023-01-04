import axios from 'axios';

const BASE_URL_KP = 'https://api.kinopoisk.dev';


export const createAPI = () => {
  const api = axios.create({baseURL: BASE_URL_KP});
  return api;
};
