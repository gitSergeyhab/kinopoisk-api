import { createAction } from '@reduxjs/toolkit';
import { FilmById } from '../types/types';

export const enum ActionType {
  // SetOneFilm = 'film/SetOneFilm',
  // SetOneFilmError = 'film/SetOneFilmError',
  // SetOneFilmLoading = 'film/SetOneFilmError',

  SetStartYear = 'filter/SetStartYear',
  SetEndYear = 'filter/SetEndYear',
  SetStartRating = 'filter/SetStartRating',
  SetEndRating = 'filter/SetEndRating',


}

export const setStartYear = createAction(ActionType.SetStartYear, (year: number) => ({payload: year}));
export const setEndYear = createAction(ActionType.SetEndYear, (year: number) => ({payload: year}));

export const setStartRating = createAction(ActionType.SetStartRating, (year: number) => ({payload: year}));
export const setEndRating = createAction(ActionType.SetEndRating, (year: number) => ({payload: year}));


// export const setOneFilm = createAction(ActionType.SetOneFilm, (film: FilmById) => ({payload: film}));
// export const setOneFilmError = createAction(ActionType.SetOneFilmError, (status: boolean) => ({payload: status}));
// export const setOneFilmLoading = createAction(ActionType.SetOneFilmLoading, (status: boolean) => ({payload: status}));


