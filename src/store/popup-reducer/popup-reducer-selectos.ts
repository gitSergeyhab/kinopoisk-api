import { State } from '../../types/types';
import { ReducerNames } from '../store';

export const getPopupStatus = (state: State): boolean => state[ReducerNames.Popup].isPopup;

