import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setLocalDB } from '../../store/action';
import { getDb } from '../../store/local-db-reducer/local-db-reducer-selectors';
import { deleteRatingFromDBByID, getStarsFromDBByID, writeFilmDBtoStorage } from '../../utils/storage-utils';


const Button = styled.button.attrs({type: 'button'})<{active: boolean}>`
  width: 100%;
  cursor: ${({active}) => active ? 'pointer' : 'auto'};
  margin-bottom: 0.1rem;
  font-size: 10px;
  background-color: #000000;
  color: ${({active}) => active ? 'white' : '#000000'};

  border: 1px solid #000000;

  &:hover {
    border-color: ${({active}) => active ? 'orange' : '#000000'};
    color: ${({active}) => active ? 'orange' : '#000000'};
  }

`;

export default function BtnDeleteStars({id} : {id: string | number}) {

  const db = useSelector(getDb);
  const dispatch = useDispatch();

  const starsFromBD = getStarsFromDBByID(db, id);

  const handleDeleteClick = () => {
    if (starsFromBD) {
      const newData = deleteRatingFromDBByID(db, id);
      writeFilmDBtoStorage(newData);
      dispatch(setLocalDB(newData));
    }
  };

  return (
    <Button active={!!starsFromBD} disabled={!starsFromBD} onClick={handleDeleteClick}>
      удалить оценку
    </Button>
  );
}
