import { State } from '../../types/types';
import { ReducerNames } from '../store';
import { FilterState } from './filter-reducer';

const field = ReducerNames.Filter;

export const getStartYear = (state: State) => state[field].startYear;
export const getEndYear = (state: State) => state[field].endYear;

export const getStartRating = (state: State) => state[field].startRating;
export const getEndRating = (state: State) => state[field].endRating;

export const getVoteOption = (state: State) => state[field].voteOption;

export const getCategory = (state: State) => state[field].category;

export const getSortField = (state: State) => state[field].sortField;
export const getSortType = (state: State) => state[field].sortType;


export const getFilter = (state: State): FilterState => state[field];
