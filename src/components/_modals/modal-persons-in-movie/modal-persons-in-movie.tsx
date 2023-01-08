import { useState } from 'react';
import { useDispatch } from 'react-redux';

import CommonModal from '../common-modal/common-modal';
import { setPopup } from '../../../store/action';
import { Person } from '../../../types/types';
import { NamePerson, PersonImg, PersonLi, PersonLink } from './modal-persons-in-movie.style';
import { ProfessionTabs } from '../../profession-tab/profession-tab';


const makeProfPersonObject = (persons: Person[]) => {
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


function PersonByProf({person} : {person: Person}) {

  const {photo, name, id, enName} = person;
  const dispatch = useDispatch();
  const handleToPersonClick = () => dispatch(setPopup(false));

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


export default function ModalPersonsInMovie({persons} : {persons: Person[]}) {

  const professions = [ ...new Set(persons.map((item) => item.enProfession).filter((item) => !!item))] as string[];
  const hasActor = professions.includes('actor');

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

  const professionTabs = <ProfessionTabs currentProf={currentProf} professions={professions} setCurrentProf={setCurrentProf}/>;

  return <CommonModal elements={personList} professionTabs={professionTabs}/>;
}
