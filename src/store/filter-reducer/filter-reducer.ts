import { createReducer } from '@reduxjs/toolkit';
import { InitFilterParam } from '../../const';
import { getStartRangeYears } from '../../utils/date-utils';
import { setEndRating, setEndYear, setStartRating, setStartYear } from '../action';


type State = {
  startYear: number,
  endYear: number,

  startRating: number,
  endRating: number,
}

const initState: State = {
  startYear: getStartRangeYears().startYear,
  endYear: getStartRangeYears().endYear,
  startRating: InitFilterParam.Rating.Start,
  endRating: InitFilterParam.Rating.End,
};

export const filterReducer = createReducer(initState, (builder) => {
  builder
    .addCase(setStartYear, (state, action) => {state.startYear = action.payload;})
    .addCase(setEndYear, (state, action) => {state.endYear = action.payload;})
    .addCase(setStartRating, (state, action) => {state.startRating = action.payload;})
    .addCase(setEndRating, (state, action) => {state.endRating = action.payload;});
});
