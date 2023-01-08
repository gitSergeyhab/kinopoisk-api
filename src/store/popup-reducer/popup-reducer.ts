import { createReducer } from '@reduxjs/toolkit';
import { setPopup } from '../action';

export type State = {
  isPersonsPopup: boolean;
}

const initState = {
  isPopup: false,
};

export const popupReducer = createReducer(initState, (builder) => {
  builder.addCase(setPopup, (state, action) => {state.isPopup = action.payload;});
});
