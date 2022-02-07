import { createReducer } from '@reduxjs/toolkit';
import { FilterRange, Options, SORT_CATEGORIES } from '../../const';
import { OptionType } from '../../types/types';
import { resetFilter, setCategory, setEndRating, setEndYear, setSortField, setSortType, setStartRating, setStartYear, setVoteOption } from '../action';


type State = {
  startYear: number,
  endYear: number,

  startRating: number,
  endRating: number,

  voteOption: OptionType,

  category: string,

  sortField: string,
  sortType: string,
}

export const initState: State = {
  startYear: FilterRange.Year.Start,
  endYear: FilterRange.Year.End,
  startRating: FilterRange.Rating.Start,
  endRating: FilterRange.Rating.End,
  voteOption: Options[0],
  category: '',
  sortField: SORT_CATEGORIES[0].value ,
  sortType: '-1',
};


export const filterReducer = createReducer(initState, (builder) => {
  builder
    .addCase(setStartYear, (state, action) => {state.startYear = action.payload;})
    .addCase(setEndYear, (state, action) => {state.endYear = action.payload;})
    .addCase(setStartRating, (state, action) => {state.startRating = action.payload;})
    .addCase(setEndRating, (state, action) => {state.endRating = action.payload;})
    .addCase(setVoteOption, (state, action) => {state.voteOption = action.payload;})
    .addCase(setCategory, (state, action) => {state.category = action.payload;})
    .addCase(setSortField, (state, action) => {state.sortField = action.payload;})
    .addCase(setSortType, (state, action) => {state.sortType = action.payload;})


    .addCase(resetFilter, (state) => {
      state.startYear = initState.startYear;
      state.endYear = initState.endYear;
      state.startRating = initState.startRating;
      state.endRating = initState.endRating;
      state.voteOption = initState.voteOption;
      state.category = initState.category;
      state.sortField = initState.sortField;
      state.sortType = initState.sortType;
    });
});
