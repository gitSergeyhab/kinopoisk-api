import { getPages } from '../utils/pagination-utils';
import { useSearchParams } from 'react-router-dom';
import { rewriteSearch } from '../utils/url-utils';
import { Link } from 'react-router-dom';
import { FieldType } from '../const';
import styled from 'styled-components';

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
`;

const PageLi = styled.li``;

const PageLink = styled(Link)<{current: number, disable: number}>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  color: ${({current}) => current ? 'orange' : '#FFFFFF'};
  padding: 1px 4px;

  &:hover {
    outline: 1px #FFFFFF solid;
  }
`;


type PageType = {pageItem : {page: number, name: string}, currentPage: number}
type PaginationType = {currentPage: number, pages: number}


function Page({pageItem, currentPage} : PageType) {
  const {page, name} = pageItem;

  const [searchParams] = useSearchParams();

  const fields = [{field: FieldType.Page, value: `${page}`}];

  const newSearch = rewriteSearch({searchParams, fields});


  const current = currentPage === page ? 1 : 0;


  return (
    <PageLi>
      <PageLink current={current} disable={0} to={newSearch}>
        {name}
      </PageLink>
    </PageLi>
  );
}

const DISABLED_CLASS = 'disabled';

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

  const firstPageClass = currentPage === 1 ? DISABLED_CLASS : '';
  const lastPageClass = currentPage === pages ? DISABLED_CLASS : '';
  const iconClassBack = currentPage === 1 ? 'material-icons' : 'material-icons white-text';
  const iconClassForward = currentPage === pages ? 'material-icons' : 'material-icons white-text';


  const pagesList = namedPages.map((item) => <Page key={item.page} pageItem={item} currentPage={currentPage}/>);
  return(
    <PagesWrapper>
      <PagesUl>
        <li className={firstPageClass}>
          <Link to={newSearchPrev}>
            <i className={iconClassBack}>chevron_left</i>
          </Link>
        </li>
        {pagesList}

        <li className={lastPageClass}>
          <Link to={newSearchNext}>
            <i className={iconClassForward}>chevron_right</i>
          </Link>
        </li>
      </PagesUl>
    </PagesWrapper>
  );
}
