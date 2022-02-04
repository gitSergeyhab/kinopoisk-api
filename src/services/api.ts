import axios from 'axios';

const BASE_URL = 'https://the-one-api.dev/v2';
const BASE_URL_KP = 'https://api.kinopoisk.dev';


// export const createAPI = () => {
//   const api = axios.create({baseURL: BASE_URL, headers: {Authorization: 'Bearer g8FnLRGZX1pZ5FSuktpN'}});
//   return api;
// };

export const createAPI = () => {
  const api = axios.create({baseURL: BASE_URL_KP});
  return api;
};
