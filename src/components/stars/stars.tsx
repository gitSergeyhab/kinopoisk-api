import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setLocalDB } from '../../store/action';
import { getDb } from '../../store/local-db-reducer/local-db-reducer-selectors';
import { FilmCard } from '../../types/types';
import { addFilmToDB, getStarsFromDBByID, writeFilmDBtoStorage } from '../../utils/storage-utils';


export const STAR_NUM = 10;

const StarInput = styled.input`
  position: fixed;
  transform: scale(0);
`;

const IconStar = styled.i.attrs({className: 'material-icons'})<{chosen: boolean, size?: number}>`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size:  ${({size}) => size ? `${size}rem` : '1rem'};
  cursor: pointer;
  color: ${({chosen}) => chosen ? 'orange' : ''};
`;

const StarsUL = styled.ul`
  list-style: none;
  margin: 0;
  margin-bottom: 0.2rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 6px 0;
  background-color: #424242;
  border: 1px solid #FFFFFF;
`;

type Void = () => void;
type StarType = {
  filmId: string,
  star: number,
  focused: number,
  checked: number,
  onChange: Void,
  onMouseEnter: Void,
  onMouseLeave: Void,
  size?: number
}

function Star({filmId, star, focused, checked, onChange, onMouseEnter, onMouseLeave, size} : StarType) {

  const chosen = (checked >= star && !focused) || focused >= star;
  const id=`star-${filmId}-${star}`;
  const name = `rate-${filmId}`;

  return (
    <li>
      <StarInput
        onChange={onChange}
        onFocus={onChange}
        className="visually-hidden" type="radio" id={id} name={name} value={star}
        tabIndex={-1}
      />
      <label htmlFor={id}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <IconStar size={size} chosen={chosen}>star</IconStar>
      </label>
    </li>
  );
}


export default function Stars({filmCard, size} : {filmCard : FilmCard, size?: number}) {

  const db = useSelector(getDb);
  const dispatch = useDispatch();
  const starsFromBD = getStarsFromDBByID(db, filmCard.id);

  const [focused, setFocused] = useState(0);

  const filmId = filmCard.id.toString();

  const handleStarChange = (star: number) => {
    const newDB = addFilmToDB(star, filmCard, db);
    dispatch(setLocalDB(newDB));
    writeFilmDBtoStorage(newDB);
  };


  const starList = new Array(STAR_NUM).fill(null).map((_, index) => index + 1).map((star) =>
    (
      <Star
        key={star} filmId={filmId} star={star} focused={focused} checked={starsFromBD}
        onChange={() => handleStarChange(star)}
        onMouseEnter={() => setFocused(star)}
        onMouseLeave={() => setFocused(0)}
        size={size}
      />
    ),
  );

  return <StarsUL>{starList}</StarsUL>;
}
