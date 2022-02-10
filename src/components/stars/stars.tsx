import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLocalDB } from '../../store/action';
import { getDb } from '../../store/local-db-reducer/local-db-reducer-selectors';
import { FilmCard } from '../../types/types';
import { addFilmToDB, getStarsFromDBByID, writeFilmDBtoStorage } from '../../utils/storage-utils';
import './stars.css';

export const STAR_NUM = 10;

type Void = () => void;
type StarType = {
  filmId: string,
  star: number,
  focused: number,
  checked: number,
  onChange: Void,
  onMouseEnter: Void,
  onMouseLeave: Void
}

function Star({filmId, star, focused, checked, onChange, onMouseEnter, onMouseLeave} : StarType) {

  const activeClass = (checked >= star && !focused) || focused >= star? 'react-star--chosen' : '';

  const id=`star-${filmId}-${star}`;


  return (
    <>
      <input
        onChange={onChange}
        onFocus={onChange}
        className="visually-hidden" type="radio" id={id} name="rate" value={star}
      />
      <label htmlFor={id}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >

        <i
          className={`material-icons react-star ${activeClass}`}
        >star
        </i>
      </label>
    </>

  );
}


export default function Stars({filmCard} : {filmCard : FilmCard}) {


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
      />
    ),
  );
  return <div className="react-stars">{starList}</div>;

}
