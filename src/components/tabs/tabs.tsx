import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setSortField } from '../../store/action';
import { TypeBtn } from '../../types/types';
import { getSortingField, getStringParam } from '../../utils/url-utils';
import { getFilter } from '../../store/filter-reducer/filter-reducer-selectors';

import './tab.css';
import { SORT_CATEGORIES } from '../../const';


function SortTab({sort, checkedBtn} : {sort: TypeBtn, checkedBtn: string}) {

  const filter = useSelector(getFilter);

  const {name, value} = sort;

  const dispatch = useDispatch();

  const navigate = useNavigate();


  const handleTabClick = () => {
    dispatch(setSortField(value));
    const sortFilter = {...filter, sortField: value};
    navigate(getStringParam(sortFilter));
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
