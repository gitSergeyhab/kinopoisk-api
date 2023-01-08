import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import FocusLock from 'react-focus-lock';
import { RemoveScroll } from 'react-remove-scroll';

import { setPersonsPopup } from '../../../store/action';
import { Person } from '../../../types/types';
import { CloseBtn, NamePerson, PersonImg, PersonLi, PersonLink, PersonUl, Popup, PopupBody, PopupContent, PopupTab, PopupTabs, TabBtn } from './modal-movie-persons.style';


export const makeProfPersonObject = (persons: Person[]) => {
  const professions = [ ...new Set(persons.map((item) => item.enProfession).filter((item) => !!item))];
  const professionObject: {[key: string]: Person[]} = professions.reduce((acc, item) => ({...acc, [item || 'others']: []}) , {});

  persons.forEach((item) => {
    const profession = item.enProfession;
    if ( profession && professionObject[profession]) {
      professionObject[profession].push(item);
    }
  });
  return professionObject;
};

type ProfessionType = {profession: string, currentProf: string, onClickSetProf: () => void}


function ProfessionTab({profession, currentProf, onClickSetProf} : ProfessionType) {
  const active = currentProf === profession ? 1 : 0;

  return (
    <PopupTab>
      <TabBtn active={active} onClick={onClickSetProf}>
        {profession}
      </TabBtn>
    </PopupTab>
  );
}


function PersonByProf({person} : {person: Person}) {

  const {photo, name, id, enName} = person;
  const dispatch = useDispatch();
  const handleToPersonClick = () => dispatch(setPersonsPopup(false));

  return (
    <PersonLi>
      <PersonLink
        onClick={handleToPersonClick}
        to={`/persons/${id}`}
      >
        <PersonImg height={100} src={photo} alt={name}></PersonImg>
      </PersonLink>
      <NamePerson>
        {name || enName}
      </NamePerson>
      <PersonLink
        onClick={handleToPersonClick}
        to={`/persons/${id}`} className="secondary-content"
      >
        Перейти
      </PersonLink>
    </PersonLi>
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
      <ProfessionTab
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
    if (evt.target instanceof Element && !evt.target.closest('#popup') && !evt.target.closest('#modal-btn')) {
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
        <Popup>
          <PopupBody>
            <PopupContent id='popup'>
              <CloseBtn onClick={handleCloseBtnClick}>
                <i className="material-icons">close</i>
              </CloseBtn>
              <div className="popup__title">Съемочная группа</div>
              <PopupTabs>
                {professionList}
              </PopupTabs>

              <PersonUl>
                {personList ? personList : 'Никого нет'}
              </PersonUl>
            </PopupContent>
          </PopupBody>
        </Popup>
      </RemoveScroll>
    </FocusLock>
  );
}
