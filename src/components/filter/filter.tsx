import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCategory, getEndRating, getEndYear, getSortField, getSortType, getStartRating, getStartYear, getVoteOption } from '../../store/filter-reducer/filter-reducer-selectors';
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

  const startYear = useSelector(getStartYear);
  const endYear = useSelector(getEndYear);
  const startRating = useSelector(getStartRating);
  const endRating = useSelector(getEndRating);
  const voteOption = useSelector(getVoteOption);
  const category = useSelector(getCategory);
  const sortField = useSelector(getSortField);
  const sortType = useSelector(getSortType);

  const formRef = useRef<null | HTMLFormElement>(null);


  const handleSearchClick = () => navigate(getStringParam({startRating, endRating, startYear, endYear, voteOption, category, sortField, sortType}));


  const handleResetClick = () => {
    navigate('');
    if (formRef) {
      formRef.current?.reset();
    }
    setReset(true);
  };

  return(
    <form className="col s3 react-filter grey darken-4 white-text react-filter" ref={formRef}>

      <YearsFilter reset={reset}/>
      <RatingsFilter reset={reset}/>
      <VotesFilter/>
      <CategoriesFilter/>

      <button
        onClick={handleSearchClick}
        className='btn black orange-text' type='button'
        style={{marginBottom: '20px'}}
      >Искать
      </button>
      <button
        onClick={handleResetClick}
        className='btn black red-text' type='button'
        style={{marginBottom: '20px'}}
      >Сбросить
      </button>


    </form>
  );
}

