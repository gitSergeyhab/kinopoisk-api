import { FilmCardsData, State } from '../../types/types';
import { ReducerNames } from '../store';

export const getDb = (state: State): FilmCardsData | null => state[ReducerNames.LocalDb].db;
