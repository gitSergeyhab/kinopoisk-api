import { createAction } from '@reduxjs/toolkit';
import { FilmById } from '../types/types';

export const enum ActionType {
  SetOneFilm = 'film/SetOneFilm',
  SetOneFilmError = 'film/SetOneFilmError',
  SetOneFilmLoading = 'film/SetOneFilmError',
}


export const setOneFilm = createAction(ActionType.SetOneFilm, (film: FilmById) => ({payload: film}));
export const setOneFilmError = createAction(ActionType.SetOneFilmError, (status: boolean) => ({payload: status}));
export const setOneFilmLoading = createAction(ActionType.SetOneFilmLoading, (status: boolean) => ({payload: status}));


