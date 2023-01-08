import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { APIRoute } from '../const';
import { Film, FilmById,  PersonById, PersonsByName, ResultSearchType } from '../types/types';
import { convertFilmNameForServer, convertPersonNameForServer, convertSearchForServer, getUrlByRoutId } from '../utils/url-utils';


export const BASE_URL_KP = 'https://api.kinopoisk.dev';

export type FilmsRequestType = {
  page: number;
  pages: number;
  docs: Film[]
}

export type PersonsRequestType = {
  page: number;
  pages: number;
  docs: PersonsByName[]
}

export const adaptFilmToResult = (data: Film): ResultSearchType => ({
  id: data.id,
  name: data.name || data.alternativeName || data.enName,
  type: 'films',
  year: data.year,
  image: data.poster?.previewUrl || data.poster?.url,
});

export const adaptPersonToResult = (data: PersonsByName): ResultSearchType => ({
  id: data.id,
  name: data.name || data.enName,
  type: 'persons',
  year: data.age,
  image: data.photo,
});

const adaptRequestMoviesToResult = (data: FilmsRequestType): ResultSearchType[] => data.docs.map(adaptFilmToResult);
const adaptRequestPersonsToResult = (data: PersonsRequestType): ResultSearchType[] => data.docs.map(adaptPersonToResult);


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

    getFilmsByParams: build.query<FilmsRequestType, string>({
      query: (search: string) => convertSearchForServer(search),
    }),

    getFilmsByName: build.query<ResultSearchType[], string>({
      query: (search) => convertFilmNameForServer(search),
      transformResponse: adaptRequestMoviesToResult,
    }),
    getPersonsByName: build.query<ResultSearchType[], string>({
      query: (search) => convertPersonNameForServer(search),
      transformResponse: adaptRequestPersonsToResult,
    }),
  }),
});

export const {useGetOneFilmQuery, useGetOnePersonQuery, useGetFilmsByNameQuery, useGetFilmsByParamsQuery, useGetPersonsByNameQuery} = queryApi;

//ERVKSC2-VC14SN0-MMBQXZ9-Q29R7HV
