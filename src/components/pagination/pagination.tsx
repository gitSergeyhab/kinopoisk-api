import { getPages } from '../../utils/pagination-utils';
import { useSearchParams } from 'react-router-dom';
import { rewriteSearch } from '../../utils/url-utils';
import { Link } from 'react-router-dom';
import { Field, FieldType } from '../../const';
import styled from 'styled-components';
import { IconArrow } from '../common/common.style';

const enum PageState {
  Normal = '#FFFFFF',
  Current = 'orange',
  Disable = '#424242'
}


const PagesUl = styled.ul`
margin: 0;
padding: 0;
list-style: none;
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;


`;

const PagesWrapper = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 2rem;

  @media (min-width: 600px) {
    padding: 0 5%;
  };
  @media (min-width: 900px) {
    padding: 0 10%;
  };

  @media (min-width: 1200px) {
    padding: 0 20%;
  };
`;

const PageLi = styled.li``;

const PageLink = styled(Link)<{state: PageState}>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  color: ${({state}) => state};
  padding: 1px 4px;
  text-decoration: none;

  @media (min-width: 900px) {
    padding: 2px 6px;
  };

  @media (min-width: 1200px) {
    padding: 2px 8px;
  };

  cursor: ${({state}) => state === PageState.Normal ? 'pointer' : 'default' }; 

  &:hover {
    outline: 1px solid ${({state}) => state === PageState.Normal ? '#FFFFFF' : '#000000' }; 
  }
`;


type PageType = {pageItem : {page: number, name: string}, currentPage: number}
type PaginationType = {currentPage: number, pages: number}


function Page({pageItem, currentPage} : PageType) {
  const {page, name} = pageItem;

  const [searchParams] = useSearchParams();

  const fields = [
    {field: FieldType.Page, value: `${page}`},
    {field: FieldType.SortField, value: Field.Votes.Kp, noChange: true},
    {field: FieldType.SortType, value: '-1', noChange: true},
  ];


  const newSearch = rewriteSearch({searchParams, fields});


  const state = currentPage === page ? PageState.Current : PageState.Normal;


  return (
    <PageLi>
      <PageLink state={state} to={newSearch}>
        {name}
      </PageLink>
    </PageLi>
  );
}


export default function Pagination({currentPage, pages} : PaginationType) {

  const namedPages = getPages(pages, currentPage);
  const [searchParams] = useSearchParams();

  if (!namedPages) {
    return null;
  }

  const fieldsPrev = [{field: FieldType.Page, value: `${ currentPage !== 1 ? currentPage - 1 : 1 }`}];
  const fieldsNext = [{field: FieldType.Page, value: `${ currentPage !== pages ? currentPage + 1 : pages}`}];

  const newSearchPrev = rewriteSearch({searchParams, fields: fieldsPrev});
  const newSearchNext = rewriteSearch({searchParams, fields: fieldsNext});

  const prevState = currentPage === 1 ? PageState.Disable : PageState.Normal;
  const nextState = currentPage === pages ? PageState.Disable : PageState.Normal;

  const pagesList = namedPages.map((item) => <Page key={item.page} pageItem={item} currentPage={currentPage}/>);

  return(
    <PagesWrapper>
      <PagesUl>
        <PageLi>
          <PageLink to={newSearchPrev} state={prevState}>
            <IconArrow>chevron_left</IconArrow>
          </PageLink>
        </PageLi>

        {pagesList}

        <PageLi>
          <PageLink to={newSearchNext} state={nextState}>
            <IconArrow>chevron_right</IconArrow>
          </PageLink>
        </PageLi>
      </PagesUl>
    </PagesWrapper>
  );
}
