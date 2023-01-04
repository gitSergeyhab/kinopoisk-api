import styled from 'styled-components';
import { TypeNumber } from '../../../const';
import { TypeBtn } from '../../../types/types';
import { FilterFieldset } from '../filter.style';


const CategoryUl = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const CategoryLi= styled.li`
  & [type="radio"]:checked+span:after, & [type="radio"].with-gap:checked+span:after {
    background-color: orange !important;
  }

  & [type="radio"]:checked+span:after, & [type="radio"].with-gap:checked+span:before, & [type="radio"].with-gap:checked+span:after {
    border: 2px solid orange !important;
  }

  & [type="radio"]:checked+span {
    color: orange
  }
`;


type CategoryBtnProps = {
  categoryObj: TypeBtn,
  checkedCategory: string | null,
  setCategory: React.Dispatch<React.SetStateAction<string | null>>
}

function CategoryBtn({categoryObj, checkedCategory, setCategory} : CategoryBtnProps ) {
  const {name, value} = categoryObj;

  const handleCategoryChange = () =>  setCategory(value);


  return (
    <CategoryLi>
      <label>
        <input
          onChange={handleCategoryChange}
          name="categories"
          type="radio"
          value={value}
          checked={checkedCategory === value}
        />
        <span>{name}</span>
      </label>
    </CategoryLi>
  );
}

type CategoriesFilterProps = {
  category: string | null,
  setCategory: React.Dispatch<React.SetStateAction<string | null>>
};

export default function CategoriesFilter ({category, setCategory} : CategoriesFilterProps) {

  const buttons = Object.values(TypeNumber).map((item) => <CategoryBtn categoryObj={item} key={item.value} checkedCategory={category || ''} setCategory={setCategory}/>);

  return (
    <FilterFieldset>
      <legend>Категория</legend>
      <CategoryUl>
        {buttons}
      </CategoryUl>


    </FilterFieldset>
  );
}
