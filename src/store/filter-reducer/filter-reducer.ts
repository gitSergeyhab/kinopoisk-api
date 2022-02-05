import { createReducer } from '@reduxjs/toolkit';
import { InitFilterParam, Options } from '../../const';
import { OptionType } from '../../types/types';
import { getStartRangeYears } from '../../utils/date-utils';
import { setEndRating, setEndYear, setStartRating, setStartYear, setVoteOption } from '../action';


type State = {
  startYear: number,
  endYear: number,

  startRating: number,
  endRating: number,

  voteOption: OptionType
}

const initState: State = {
  startYear: getStartRangeYears().startYear,
  endYear: getStartRangeYears().endYear,
  startRating: InitFilterParam.Rating.Start,
  endRating: InitFilterParam.Rating.End,
  voteOption: Options[0],
};

export const filterReducer = createReducer(initState, (builder) => {
  builder
    .addCase(setStartYear, (state, action) => {state.startYear = action.payload;})
    .addCase(setEndYear, (state, action) => {state.endYear = action.payload;})
    .addCase(setStartRating, (state, action) => {state.startRating = action.payload;})
    .addCase(setEndRating, (state, action) => {state.endRating = action.payload;})
    .addCase(setVoteOption, (state, action) => {state.voteOption = action.payload;});

});
