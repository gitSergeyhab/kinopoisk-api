import { useDispatch, useSelector } from 'react-redux';
import { setLocalDB } from '../../store/action';
import { getDb } from '../../store/local-db-reducer/local-db-reducer-selectors';
import { deleteRatingFromDBByID, deleteRatingFromStorageByID, getStarsFromDBByID, getStarsFromStorageByID, writeFilmDBtoStorage } from '../../utils/storage-utils';

import './btn-delete-stars.css';

export default function BtnDeleteStars({id} : {id: string | number}) {

  const db = useSelector(getDb);
  const dispatch = useDispatch();

  const starsFromBD = getStarsFromDBByID(db, id);

  const activeClass = starsFromBD ? 'react-btn-del-stars--active' : '';

  const title = starsFromBD ? 'удалить оценку' : '';


  const ID = id.toString();


  const handleDeleteClick = () => {
    if (starsFromBD) {
      // console.log(db);
      const newData = deleteRatingFromDBByID(db, id);
      // console.log(newData);
      writeFilmDBtoStorage(newData);
      dispatch(setLocalDB(newData));
    }
  };

  return (
    <div className='right-align'>
      <input
        className="visually-hidden" type="radio" id={ID} name="rate" value={ID}
        onChange={handleDeleteClick}
      />
      <label htmlFor={ID}>

        <i title={title}
          className={`material-icons react-btn-del-stars ${activeClass}`}
        >clear
        </i>
      </label>
    </div>

  );
}
