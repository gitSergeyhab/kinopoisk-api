import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getFilter } from '../../store/filter-reducer/filter-reducer-selectors';
import { getStringParam } from '../../utils/url-utils';
import RatingsFilter from './rating-filter/rating-filter';
import YearsFilter from './years-filter/years-filter';
import VotesFilter from './votes-filter/votes-filter';
import CategoriesFilter from './categories-filter/categories-filter';

import './filter.css';
import { useEffect, useRef, useState } from 'react';
import { resetFilter } from '../../store/action';


export default function Filter() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (reset) {
      dispatch(resetFilter());
      setReset(false);
    }
  }, [reset, dispatch]);

  const filter = useSelector(getFilter);

  const formRef = useRef<null | HTMLFormElement>(null);


  const handleSearchClick = () =>
    navigate(getStringParam(filter));


  const handleResetClick = () => {
    navigate('');
    setReset(true);
  };

  return(
    <form className="col s3 react-filter grey darken-4 white-text react-filter" ref={formRef}>

      <YearsFilter reset={reset}/>
      <RatingsFilter reset={reset}/>
      <VotesFilter/>
      <CategoriesFilter reset={reset}/>

      <button
        onClick={handleSearchClick}
        className='btn black orange-text'
        type='button'
        style={{marginBottom: '20px'}}
      >Искать
      </button>
      <button
        onClick={handleResetClick}
        className='btn black red-text'
        type='button'
        style={{marginBottom: '20px'}}
      >Сбросить
      </button>


    </form>
  );
}

