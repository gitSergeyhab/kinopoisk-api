import { State } from '../../types/types';
import { ReducerNames } from '../store';

const field = ReducerNames.Filter;

export const getStartYear = (state: State) => state[field].startYear;
export const getEndYear = (state: State) => state[field].endYear;

export const getStartRating = (state: State) => state[field].startRating;
export const getEndRating = (state: State) => state[field].endRating;

export const getVoteOption = (state: State) => state[field].voteOption;


