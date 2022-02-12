import { createReducer } from '@reduxjs/toolkit';
import { setPersonsPopup } from '../action';

export type State = {
  isPersonsPopup: boolean;
}

const initState = {
  isPersonsPopup: false,
};

export const popupReducer = createReducer(initState, (builder) => {
  builder.addCase(setPersonsPopup, (state, action) => {state.isPersonsPopup = action.payload;});
});
