import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { FilmSearchParam } from '../types/types';
import { getUrlByFilmID, getUrlFilmsByParams } from '../utils/url-utils';


export const BASE_URL_KP = 'https://api.kinopoisk.dev';


export const queryApi = createApi({
  reducerPath: 'queryReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL_KP,
  }),
  endpoints: (build) => ({
    getOneFilm: build.query({
      query: (id) => getUrlByFilmID(id),
    }),


    getFilmsByParams: build.query({
      query: (params: FilmSearchParam) => getUrlFilmsByParams(params),
    }),
  }),
});

export const {useGetOneFilmQuery, useGetFilmsByParamsQuery} = queryApi;
