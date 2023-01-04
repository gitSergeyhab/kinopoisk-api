import { createReducer } from '@reduxjs/toolkit';
import { FilmCardsData } from '../../types/types';
import { getFilmsDataFromStorage } from '../../utils/storage-utils';
import { setLocalDB } from '../action';

export type State = {
  db: FilmCardsData | null,
}

const initState: State = {
  db: getFilmsDataFromStorage(),
};

export const localDbReducer = createReducer(initState, (builder) => {
  builder.addCase(setLocalDB, (state, action) => {state.db = action.payload;});
});
