import { createAction } from '@reduxjs/toolkit';
import { FilmCardsData } from '../types/types';

export const enum ActionType {


  SetLocalDB = 'localDB/SetLocalDB',

  SetPopup = 'popup/SetPopup',

}


export const setLocalDB = createAction(ActionType.SetLocalDB, (db: FilmCardsData | null) => ({payload: db}));

export const setPopup = createAction(ActionType.SetPopup, (status: boolean) => ({payload: status}));


