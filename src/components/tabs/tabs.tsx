import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { TypeBtn } from '../../types/types';
import { getFieldFromSearch,  rewriteSearch } from '../../utils/url-utils';
import { Field, FieldType, SORT_CATEGORIES } from '../../const';


const TabList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 600px) {
    flex-direction: row;
  };
  @media (min-width: 900px) {
    flex-grow: 2;
    max-width: 90%;
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
  const navigate = useNavigate();

  const {name, value} = sort;
  const sortField = getFieldFromSearch(searchParams, FieldType.SortField) || Field.Votes.Kp;


  const handleTabClick = () => {
    const fields = [
      {field: FieldType.SortField, value},
      {field: FieldType.Page, value: '1'},
      {field: FieldType.SortType, value: '-1', noChange: true},
    ];

    const newSearch = rewriteSearch({searchParams, fields});

    navigate(newSearch);
  };

  return (
    <TabLi>
      <TabBtn current={sortField === value} onClick={handleTabClick}>
        {name}
      </TabBtn>
    </TabLi>
  );
}


export default function Tabs () {

  const sortTabs = SORT_CATEGORIES.map((item) => <SortTab  sort={item} key={item.value}/>);

  return (
    <TabList>
      {sortTabs}
    </TabList>
  );
}
