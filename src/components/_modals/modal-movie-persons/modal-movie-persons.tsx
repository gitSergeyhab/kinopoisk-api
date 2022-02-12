import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FocusLock from 'react-focus-lock';
import { RemoveScroll } from 'react-remove-scroll';

import { setPersonsPopup } from '../../../store/action';
import { FilmById, Person, SimilarMovie } from '../../../types/types';

import './modal-movie-persons.css';


export const makeProfPersonObject = (persons: Person[]) => {
  const professions = [ ...new Set(persons.map((item) => item.enProfession).filter((item) => !!item))] as string[];
  const professionObject: {[key: string]: Person[]} = professions.reduce((acc, item) => ({...acc, [item]: []}) , {});

  persons.forEach((item) => {
    const x = item.enProfession as string;
    if (professionObject[x]) {
      professionObject[x].push(item);
    }
  });
  return professionObject;
};

type ProfessionType = {profession: string, currentProf: string, onClickSetProf: () => void}


function Profession({profession, currentProf, onClickSetProf} : ProfessionType) {
  const classes = currentProf === profession ? 'black orange-text' : 'grey white-text';

  const handleProfessionClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    onClickSetProf();
  };
  return (
    <li className='tab'>
      <a
        className={classes}
        onClick={handleProfessionClick}
        href='/'
      >
        {profession}
      </a>
    </li>
  );
}


function PersonByProf({person} : {person: Person}) {

  const {photo, name, description, id} = person;
  const dispatch = useDispatch();
  const handleToPersonClick = () => dispatch(setPersonsPopup(false));


  return (
    <li className="collection-item grey darken-3 react-person-movies__item">
      <Link
        onClick={handleToPersonClick}
        to={`/persons/${id}`}
      >
        <img width='70' src={photo || undefined} alt={name}></img>
      </Link>
      <p className="title react-person-movies__paragraph react-person-movies__paragraph--title">
        {name || 'Нет названия'}
      </p>
      <p className="react-person-movies__paragraph react-person-movies__paragraph--description">
        {description || 'Нет описания'}
      </p>

      <Link
        onClick={handleToPersonClick}
        to={`/persons/${id}`} className="secondary-content"
      >
        Перейти
      </Link>
    </li>
  );
}


export default function ModalMoviePersons({persons} : {persons: Person[]}) {

  const professions = [ ...new Set(persons.map((item) => item.enProfession).filter((item) => !!item))] as string[];
  const hasActor = professions.includes('actor');

  const dispatch = useDispatch();
  const [currentProf, setCurrentProf] = useState(hasActor ? 'actor' : professions[0].toString());


  const personByProfession = (professions && professions.length) ?
    makeProfPersonObject(persons) :
    null;

  const currentPersons = personByProfession ?
    personByProfession[currentProf] :
    null;

  const personList = currentPersons ?
    currentPersons.map((item) => <PersonByProf key={`${item.id}-${item.description || ''} `} person={item}/>) :
    persons.map((item) => <PersonByProf key={item.id} person={item}/>);

  const professionList = personByProfession ?
    professions.map((item) => (
      <Profession
        key={item}
        profession={item}
        currentProf={currentProf}
        onClickSetProf={() => setCurrentProf(item)}
      />),
    ) :
    null;

  const closePopup = () => dispatch(setPersonsPopup(false));

  const handleCloseBtnClick = () => closePopup();

  const handleEscapeKeyDown = (evt: KeyboardEvent) => {
    if (evt.code === 'Escape') {
      closePopup();
    }
  };

  const handleOutsideClick = (evt: MouseEvent) => {
    if (evt.target instanceof Element && !evt.target.closest('.popup__content') && !evt.target.closest('.modal-trigger')) {
      closePopup();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKeyDown);
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('keydown', handleEscapeKeyDown);
      document.removeEventListener('click', handleOutsideClick);
    };
  });


  return (
    <FocusLock>
      <RemoveScroll>
        <div className="popup" style={{zIndex: 3}}>
          <div className="popup__body">
            <div className="popup__content">
              <button
                onClick={handleCloseBtnClick}
                type='button' className="popup__close black"
              ><i className="material-icons orange-text">close</i>
              </button>
              <div className="popup__title">Съемочная группа</div>
              <ul className="tabs react-modal-tabs black">
                {professionList}
              </ul>

              <ul className="collection react-person-movies">
                {personList ? personList : 'Никого нет'}
              </ul>
            </div>
          </div>
        </div>
      </RemoveScroll>
    </FocusLock>
  );
}
