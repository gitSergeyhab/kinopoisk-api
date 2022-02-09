import { createAction } from '@reduxjs/toolkit';
import { FilmCardsData, OptionType } from '../types/types';

export const enum ActionType {
  // SetOneFilm = 'film/SetOneFilm',
  // SetOneFilmError = 'film/SetOneFilmError',
  // SetOneFilmLoading = 'film/SetOneFilmError',

  SetStartYear = 'filter/SetStartYear',
  SetEndYear = 'filter/SetEndYear',
  SetStartRating = 'filter/SetStartRating',
  SetEndRating = 'filter/SetEndRating',
  SetVoteOption = 'filter/SetVoteOption',
  SetCategory = 'filter/SetCategory',
  SetSortField = 'filter/SetSortField',
  SetSortType = 'filter/SetSortType',
  ResetFilter = 'filter/ResetFilter',

  SetLocalDB = 'localDB/SetLocalDB',

}

export const setStartYear = createAction(ActionType.SetStartYear, (year: number) => ({payload: year}));
export const setEndYear = createAction(ActionType.SetEndYear, (year: number) => ({payload: year}));

export const setStartRating = createAction(ActionType.SetStartRating, (year: number) => ({payload: year}));
export const setEndRating = createAction(ActionType.SetEndRating, (year: number) => ({payload: year}));


export const setVoteOption = createAction(ActionType.SetVoteOption, (option: OptionType) => ({payload: option}));

export const setCategory = createAction(ActionType.SetCategory, (category: string) => ({payload: category}));

export const setSortField = createAction(ActionType.SetSortField, (category: string) => ({payload: category}));
export const setSortType = createAction(ActionType.SetSortType, (category: string) => ({payload: category}));


export const resetFilter = createAction(ActionType.ResetFilter);

export const setLocalDB = createAction(ActionType.SetLocalDB, (db: FilmCardsData | null) => ({payload: db}));

// export const setOneFilm = createAction(ActionType.SetOneFilm, (film: FilmById) => ({payload: film}));
// export const setOneFilmError = createAction(ActionType.SetOneFilmError, (status: boolean) => ({payload: status}));
// export const setOneFilmLoading = createAction(ActionType.SetOneFilmLoading, (status: boolean) => ({payload: status}));


