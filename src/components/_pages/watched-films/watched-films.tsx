import { DragEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLocalDB } from '../../../store/action';
import { getDb } from '../../../store/local-db-reducer/local-db-reducer-selectors';
import { FilmCardData } from '../../../types/types';
import { rebaseOrdersInDB, writeFilmDBtoStorage } from '../../../utils/storage-utils';
import { FilmCard } from '../../film-card/film-card';

import './watched-films.css';


const DragClass = {
  Start: 'react-card--start',
  Over: 'react-card--over',
};


type DragFilmCardType = {filmCardData: FilmCardData, start: number | null, setStart: () => void}

function DragFilmCard({filmCardData, start, setStart} : DragFilmCardType) {

  const db = useSelector(getDb);
  const dispatch = useDispatch();


  const handleDragStart = (evt: DragEvent<HTMLDivElement>) => {
    evt.currentTarget.classList.add(DragClass.Start);
    setStart();
  };

  const handleDragLeave = (evt: DragEvent<HTMLDivElement>) => {
    evt.currentTarget.classList.remove(DragClass.Over);
  };

  const handleDragEnd = (evt: DragEvent<HTMLDivElement>) => {
    evt.currentTarget.classList.remove(DragClass.Start);


  };
  const handleDragOver = (evt: DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
    evt.currentTarget.classList.add(DragClass.Over);

  };

  const handleDrop = (evt: DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove(DragClass.Over);

    const newDB = rebaseOrdersInDB(db, start, filmCardData.order);

    dispatch(setLocalDB(newDB));
    writeFilmDBtoStorage(newDB);
  };


  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="card col s6 m4 l3 gap1 react-card"
    >
      <FilmCard film={filmCardData.filmCard}/>
    </div>
  );
}


export default function WatchedFilms () {

  const filmCardObjet = useSelector(getDb);

  const [start, setStart] = useState<null | number>(null);


  if (!filmCardObjet || !Object.values(filmCardObjet).length) {
    return (
      <div className="row black">
        <div className="col s1">

        </div>
        <div className="col s10 brown darken-3 text-lighten-4">
          <h2 className="header center-align orange-text">У вас нет оцененных фильнов</h2>

        </div>
      </div>
    );
  }

  const filmCards = Object.values(filmCardObjet) as FilmCardData[];

  const filmCardsList = filmCards
    .sort((prev, next) => prev.order - next.order)
    .map((item: FilmCardData) =>
      (
        <DragFilmCard
          start={start} setStart={() => setStart(item.order)}
          key={item.filmCard.id} filmCardData={item}
        />
      ));


  // const handleTestClick = () => getTest();


  return(

    <div className="row black">

      <div className="col s1"></div>
      <div className="col s10 brown darken-3 text-lighten-4">
        <h2 className="header center-align orange-text">Оцененныые фильмы</h2>
        <p className='white-text center-align'>Можно менять положение карточек перетаскиванием</p>
        <p className='white-text center-align'>
          (D-N-D реализован без использования доп библиотек,
          данные хранятся в localStorage - Kinopoisk-API нет возможности сохранять оценки на сервере)
        </p>
        <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>

          {filmCardsList}


        </div>
      </div>
    </div>

  );
}
