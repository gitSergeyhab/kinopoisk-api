import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ORDER_CATEGORIES } from '../../const';
import { setSortType } from '../../store/action';
import { TypeBtn } from '../../types/types';
import { getSortingType, getStringParam } from '../../utils/url-utils';
import { getFilter } from '../../store/filter-reducer/filter-reducer-selectors';

import './tab-order.css';

function SortTab({sort, checkedBtn} : {sort: TypeBtn, checkedBtn: string}) {

  const filter = useSelector(getFilter);

  const {name, value} = sort;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleTabClick = () => {
    dispatch(setSortType(value));
    const sortFilter = {...filter, sortType: value};
    navigate(getStringParam(sortFilter));
  };

  return (
    <li>

      <button
        className={checkedBtn === value ? 'orange-text grey darken-4' : 'grey'}
        onClick={handleTabClick}
        type='button' value={value}
      ><i className="material-icons" style={{fontSize: '1rem'}}>{name}</i>
      </button>
    </li>
  );
}


//
export default function TabsOrder () {

  const [searchParam] = useSearchParams();

  const checkedBtn = getSortingType(searchParam);

  const orderTabs = ORDER_CATEGORIES.map((item) => <SortTab checkedBtn={checkedBtn} sort={item} key={item.value}/>);

  return (
    <div className="row col s2 grey darken-3">
      <div className="col s12 grey darken-3">
        <ul className="react-tabs--order grey darken-3">
          {orderTabs}
        </ul>
      </div>
    </div>
  );
}
