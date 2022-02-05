import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Field } from '../../const';
import { getEndRating, getEndYear, getStartRating, getStartYear } from '../../store/filter-reducer/filter-reducer-selectors';
import { getObjectParam, getStringParam } from '../../utils/url-utils';
import RatingsFilter from './rating-filter/rating-filter';
import YearsFilter from './years-filter/years-filter';


export default function Filter() {

  const navigate = useNavigate();

  const startYear = useSelector(getStartYear);
  const endYear = useSelector(getEndYear);
  const startRating = useSelector(getStartRating);
  const endRating = useSelector(getEndRating);


  // const [, setSearchParams] = useSearchParams();


  // useEffect()


  const handleSearchClick = () => navigate(getStringParam({startRating, endRating, startYear, endYear}));

  return(
    <div className="col s4" style={{padding: '20px 10px'}}>
      <YearsFilter/>
      <RatingsFilter/>

      <div>1</div>
      <div>2</div>
      <button
        onClick={handleSearchClick}
        className='btn' type='button'
      >Искать
      </button>


    </div>
  );
}

