import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { TypeNumber } from '../../../const';
import { setCategory } from '../../../store/action';
import { TypeBtn } from '../../../types/types';
import { getCheckedBtn } from '../../../utils/url-utils';

import './categories-filter.css';


function CategoryBtn({category, checked} : {category: TypeBtn, checked: string} ) {
  const {name, value} = category;

  const dispatch = useDispatch();

  const handleCategoryChange = () => dispatch(setCategory(value));


  return (
    <p className='left-align'>
      <label>
        <input
          onChange={handleCategoryChange}
          name="categories" type="radio"
          value={value} defaultChecked={checked === value}
        />
        <span>{name}</span>
      </label>
    </p>
  );
}


export default function CategoriesFilter () {

  const [searchParams] = useSearchParams();

  const checkedBtn = getCheckedBtn(searchParams);

  const buttons = Object.values(TypeNumber).map((item) => <CategoryBtn category={item} key={item.value} checked={checkedBtn}/>);

  return (
    <fieldset className='grey darken-3'>
      <legend>Категория</legend>

      {buttons}

    </fieldset>

  );
}
