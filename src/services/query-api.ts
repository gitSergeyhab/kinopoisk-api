import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { APIRoute } from '../const';
import { FilmById,  PersonById } from '../types/types';
import { convertFilmNameForServer, convertSearchForServer, getUrlByRoutId } from '../utils/url-utils';


export const BASE_URL_KP = 'https://api.kinopoisk.dev';


export const queryApi = createApi({
  reducerPath: 'queryReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL_KP,
  }),
  endpoints: (build) => ({
    getOneFilm: build.query<FilmById, string>({
      query: (id) => getUrlByRoutId(APIRoute.Films, id),
    }),

    getOnePerson: build.query<PersonById, string>({
      query: (id) => getUrlByRoutId(APIRoute.Persons, id),
    }),

    getFilmsByParams: build.query({
      query: (search: string) => convertSearchForServer(search),
    }),

    getFilmsByName: build.query({
      query: (search: string) => convertFilmNameForServer(search),
    }),
  }),
});

export const {useGetOneFilmQuery, useGetOnePersonQuery, useGetFilmsByNameQuery ,useGetFilmsByParamsQuery} = queryApi;

//ERVKSC2-VC14SN0-MMBQXZ9-Q29R7HV
