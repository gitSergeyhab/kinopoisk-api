import { createReducer } from '@reduxjs/toolkit';
import { FilterRange, Options, SORT_CATEGORIES } from '../../const';
import { OptionType } from '../../types/types';
import { resetFilter, setCategory, setEndRating, setEndYear, setSortField, setSortType, setStartRating, setStartYear, setVoteOption } from '../action';


export type FilterState = {
  startYear: number,
  endYear: number,

  startRating: number,
  endRating: number,

  voteOption: OptionType,

  category: string,

  sortField: string,
  sortType: string,
}

export const initFilterState: FilterState = {
  startYear: FilterRange.Year.Start,
  endYear: FilterRange.Year.End,
  startRating: FilterRange.Rating.Start,
  endRating: FilterRange.Rating.End,
  voteOption: Options[0],
  category: '',
  sortField: SORT_CATEGORIES[0].value ,
  sortType: '-1',
};


export const filterReducer = createReducer(initFilterState, (builder) => {
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
      state.startYear = initFilterState.startYear;
      state.endYear = initFilterState.endYear;
      state.startRating = initFilterState.startRating;
      state.endRating = initFilterState.endRating;
      state.voteOption = initFilterState.voteOption;
      state.category = initFilterState.category;
      state.sortField = initFilterState.sortField;
      state.sortType = initFilterState.sortType;
    });
});
