import { FilmCard, FilmCardsData } from '../types/types';

const KP_FILM_CARD_KEY = 'KP_FILM_CARD_KEY';


export const getNextOrder = (filmCards: FilmCardsData) => {
  if (!filmCards || !Object.values(filmCards).length) {
    return 1;
  }

  const copyDataObj = {...filmCards};
  const copyData = Object.values(copyDataObj).sort((prev, next) => prev.order - next.order);
  const x = copyData[copyData.length - 1].order + 1;
  return x;
};

export const addFilmToDB = (star: number, filmCard: FilmCard, filmCards: FilmCardsData | null) => {

  if (!filmCards) {
    return {[filmCard.id.toString()]: {filmCard, star, order: 1}};
  }

  const isInBD = filmCards[filmCard.id.toString()];
  const order = isInBD ? isInBD.order : getNextOrder(filmCards);
  return {...filmCards, [filmCard.id.toString()]: {filmCard, star, order}};
};

export const getFilmsDataFromStorage = () => {
  const storageStr = localStorage.getItem(KP_FILM_CARD_KEY);
  return storageStr ? JSON.parse(storageStr) : null;
};

export const writeFilmDBtoStorage = (db: FilmCardsData | null) => {
  const newDataStr = JSON.stringify(db);
  localStorage.setItem(KP_FILM_CARD_KEY, newDataStr);
};


export const getFilmCardFromDBByID = (db: FilmCardsData | null, id: number | string) => {
  if (!db || !id) {
    return null;
  }
  return db[+id] || db[db.toString()];
};

export const getStarsFromDBByID = (db: FilmCardsData | null, id: number | string) => {
  const filmCard = getFilmCardFromDBByID(db, id);
  if (!filmCard) {
    return 0;
  }

  return filmCard.star;
};

export const getStarsFromStorageByID = (id: number | string) => {
  const db = getFilmsDataFromStorage();
  const filmCard = getFilmCardFromDBByID(db, id);
  if (!filmCard) {
    return 0;
  }
  return filmCard.star;
};


export const deleteRatingFromDBByID = (db: FilmCardsData | null, id: number | string) => {
  if (db && id) {
    const newDB = {...db};
    delete newDB[id];
    return newDB;
  }
  return db;
};

export const addFilmToStorage = (star: number, filmCard: FilmCard) => {
  const db = getFilmsDataFromStorage() || {};
  const newData = addFilmToDB(star, filmCard, db);
  writeFilmDBtoStorage(newData);
};

export const deleteRatingFromStorageByID = (id: number | string) => {
  const db = getFilmsDataFromStorage() || {};
  const newData = deleteRatingFromDBByID(db, id);
  writeFilmDBtoStorage(newData);
};


const getNewOrder = (now: number, start: number, drop: number) => {
  if (start === drop) {
    return now;
  }

  if (now === start) {
    return drop;
  }

  if (start < drop) {
    if (now < start || now > drop) {
      return now;
    }

    if (now <= drop) {
      return now - 1;
    }
  }

  if (start > drop) {
    if (now > start || now < drop) {
      return now;
    }

    if (now >= drop) {
      return now + 1;
    }
  }
  return now;
};

export const rebaseOrdersInDB = (startDB: FilmCardsData | null, start: number | null, drop: number | null) => {
  if (!startDB || !Object.values(startDB).length || start === null || drop === null) {
    return null;
  }

  if (start === drop) {
    return startDB;
  }

  const db = Object.values({...startDB});

  const newDBArray = db.map((item) => ({...item, order: getNewOrder(item.order, start, drop)}));

  const newDB = newDBArray.reduce((acc, item) => ({...acc, [item.filmCard.id]: item}), {});

  return newDB;
};
