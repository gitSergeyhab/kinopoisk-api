import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { Field, FieldType, ORDER_CATEGORIES } from '../../const';
import { TypeBtn } from '../../types/types';
import { getFieldFromSearch, rewriteSearch } from '../../utils/url-utils';


const TabList = styled.ul`
width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 900px) {
    width: 9%;
    flex-grow: 1;
  };
`;

const TabLi = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 2;
  width: 100%;

  @media (min-width: 600px) {
    width: auto;
  };
`;

const TabBtn = styled.button.attrs({type: 'button'})<{current: boolean}>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  border: 2px #424242 solid;

  &:hover {
    color: orange;
  }

  background: ${({current}) => current ? '#000000' : '#FFFFFF'};
  color: ${({current}) => current ? '#FFFFFF' : '#000000'};

  &:active {
    border-color: orange ;
  }
`;

function SortTab({sort} : {sort: TypeBtn}) {

  const [searchParams] = useSearchParams();

  const order = getFieldFromSearch(searchParams, FieldType.SortType) || '-1';


  const {name, value} = sort;

  const navigate = useNavigate();

  const handleTabClick = () => {
    const fields = [
      {field: FieldType.SortType, value},
      {field: FieldType.Page, value: '1'},
      {field: FieldType.SortField, value: Field.Votes.Kp, noChange: true},
    ];
    const newSearch = rewriteSearch({ searchParams, fields });
    navigate(newSearch);
  };

  return (
    <TabLi>
      <TabBtn current={order === value} onClick={handleTabClick}>
        <i className="material-icons" style={{fontSize: '1rem'}}>{name}</i>
      </TabBtn>
    </TabLi>
  );
}


export default function TabsOrder () {

  const orderTabs = ORDER_CATEGORIES.map((item) => <SortTab  sort={item} key={item.value}/>);

  return (
    <TabList>
      {orderTabs}
    </TabList>
  );
}

