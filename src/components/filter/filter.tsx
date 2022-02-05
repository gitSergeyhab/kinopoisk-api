import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getEndRating, getEndYear, getStartRating, getStartYear, getVoteOption } from '../../store/filter-reducer/filter-reducer-selectors';
import { getStringParam } from '../../utils/url-utils';
import RatingsFilter from './rating-filter/rating-filter';
import YearsFilter from './years-filter/years-filter';

import './filter.css';
import VotesFilter from './votes-filter/votes-filter';


export default function Filter() {

  const navigate = useNavigate();

  const startYear = useSelector(getStartYear);
  const endYear = useSelector(getEndYear);
  const startRating = useSelector(getStartRating);
  const endRating = useSelector(getEndRating);
  const voteOption = useSelector(getVoteOption);

  const handleSearchClick = () => navigate(getStringParam({startRating, endRating, startYear, endYear, voteOption}));

  return(
    <form className="col s3 react-filter grey darken-4 white-text react-filter">
      <YearsFilter/>
      <RatingsFilter/>
      <VotesFilter/>

      <button
        onClick={handleSearchClick}
        className='btn black' type='button'
        style={{marginBottom: '20px'}}
      >Искать
      </button>


    </form>
  );
}

