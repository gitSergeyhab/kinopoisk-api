import { DragEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLocalDB } from '../../../store/action';
import { getDb } from '../../../store/local-db-reducer/local-db-reducer-selectors';
import { FilmCardData } from '../../../types/types';
import { rebaseOrdersInDB, writeFilmDBtoStorage } from '../../../utils/storage-utils';
import { FilmCard } from '../../film-card/film-card';
import { DnDSection, DragCardLi, DragCardList } from './watched-films.style';

import './watched-films.css';

const DragClass = {
  Start: 'react-card--start',
  Over: 'react-card--over',
};

type DragFilmCardType = {filmCardData: FilmCardData, start: number | null, setStart: () => void}

function DragFilmCard({filmCardData, start, setStart} : DragFilmCardType) {

  const db = useSelector(getDb);
  const dispatch = useDispatch();


  const handleDragStart = (evt: DragEvent<HTMLLIElement>) => {
    evt.currentTarget.classList.add(DragClass.Start);
    setStart();
  };

  const handleDragLeave = (evt: DragEvent<HTMLLIElement>) => {
    evt.currentTarget.classList.remove(DragClass.Over);
  };

  const handleDragEnd = (evt: DragEvent<HTMLLIElement>) => {
    evt.currentTarget.classList.remove(DragClass.Start);


  };
  const handleDragOver = (evt: DragEvent<HTMLLIElement>) => {
    evt.preventDefault();
    evt.currentTarget.classList.add(DragClass.Over);

  };

  const handleDrop = (evt: DragEvent<HTMLLIElement>) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove(DragClass.Over);

    const newDB = rebaseOrdersInDB(db, start, filmCardData.order);

    dispatch(setLocalDB(newDB));
    writeFilmDBtoStorage(newDB);
  };


  return (
    <DragCardLi
      draggable
      onDragStart={handleDragStart}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <FilmCard film={filmCardData.filmCard}/>
    </DragCardLi>
  );
}


export default function WatchedFilms () {

  const filmCardObjet = useSelector(getDb);

  const [start, setStart] = useState<null | number>(null);

  if (!filmCardObjet || !Object.values(filmCardObjet).length) {
    return (
      <DnDSection>
        <h2>У вас нет оцененных фильнов</h2>
      </DnDSection>
    );
  }

  const filmCards = Object.values(filmCardObjet) as FilmCardData[];

  const filmCardsList = filmCards
    .sort((prev, next) => prev.order - next.order)
    .map((item: FilmCardData) =>
      (
        <DragFilmCard
          start={start}
          setStart={() => setStart(item.order)}
          key={item.filmCard.id}
          filmCardData={item}
        />
      ));

  return(

    <DnDSection>

      <h1>Оцененныые фильмы</h1>
      <p>Можно менять положение карточек перетаскиванием</p>
      <p>
          (D-N-D реализован без использования доп библиотек,
          данные хранятся в localStorage - Kinopoisk-API нет возможности сохранять оценки на сервере)
      </p>
      <DragCardList>

        {filmCardsList}

      </DragCardList>
    </DnDSection>

  );
}
