import { State } from '../../types/types';
import { ReducerNames } from '../store';

export const getPersonsPopupStatus = (state: State): boolean => state[ReducerNames.Popup].isPersonsPopup;
