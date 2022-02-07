import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setSortField } from '../../store/action';
import { TypeBtn } from '../../types/types';
import { getSortingField, getStringParam } from '../../utils/url-utils';
import { getCategory, getEndRating, getEndYear, getSortType, getStartRating, getStartYear, getVoteOption } from '../../store/filter-reducer/filter-reducer-selectors';

import './tab.css';
import { SORT_CATEGORIES } from '../../const';


function SortTab({sort, checkedBtn} : {sort: TypeBtn, checkedBtn: string}) {

  const startYear = useSelector(getStartYear);
  const endYear = useSelector(getEndYear);
  const startRating = useSelector(getStartRating);
  const endRating = useSelector(getEndRating);
  const voteOption = useSelector(getVoteOption);
  const category = useSelector(getCategory);
  const sortType = useSelector(getSortType);

  const {name, value} = sort;

  const dispatch = useDispatch();

  const navigate = useNavigate();


  const handleTabClick = () => {
    dispatch(setSortField(value));
    navigate(getStringParam({startRating, endRating, startYear, endYear, voteOption, category, sortField: value, sortType}));
  };

  return (
    <li>

      <button
        className={checkedBtn === value ? 'orange-text grey darken-4' : 'grey'}
        onClick={handleTabClick}
        type='button' value={value}
      >{name}
      </button>
    </li>
  );
}


export default function Tabs () {

  const [searchParam] = useSearchParams();

  const checkedBtn = getSortingField(searchParam);

  const sortTabs = SORT_CATEGORIES.map((item) => <SortTab checkedBtn={checkedBtn} sort={item} key={item.value}/>);

  return (
    <div className="row grey darken-3 col s10">
      <div className="col s12 grey darken-3">
        <ul className="react-tabs grey darken-3">
          {sortTabs}
        </ul>
      </div>

    </div>
  );
}
