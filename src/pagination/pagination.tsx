import { MouseEvent } from 'react';
import { getPages } from '../utils/pagination-utils';
import { getFilter } from '../store/filter-reducer/filter-reducer-selectors';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getStringParam } from '../utils/url-utils';


type PageType = {pageItem : {page: number, name: string}, currentPage: number}
type PaginationType = {currentPage: number, pages: number}


function Page({pageItem, currentPage} : PageType) {
  const {page, name} = pageItem;

  const filter = useSelector(getFilter);

  const navigate = useNavigate();


  const handlePageClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    const pageParam = `&page=${page}`;
    const filterParams = getStringParam(filter);
    navigate(`${filterParams}${pageParam}`);
  };

  const classes = currentPage === page ? 'black white-text' : 'white-text';
  return (
    <li className="waves-effect">
      <a
        onClick={handlePageClick}
        href="/" className={classes}
      >{name}
      </a>
    </li>
  );
}

const DISABLED_CLASS = 'disabled';

export default function Pagination({currentPage, pages} : PaginationType) {
  const namedPages = getPages(pages, currentPage);

  const filter = useSelector(getFilter);

  const navigate = useNavigate();

  const goToPage = (page: number) => {
    const pageParam = `&page=${page}`;
    const filterParams = getStringParam(filter);
    navigate(`${filterParams}${pageParam}`);
  };


  const handleBackClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    if (currentPage !== 1) {
      goToPage(currentPage - 1);
    }

  };

  const handleForwardClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    if (currentPage !== pages) {
      goToPage(currentPage + 1);
    }
  };

  const firstPageClass = currentPage === 1 ? DISABLED_CLASS : '';
  const lastPageClass = currentPage === pages ? DISABLED_CLASS : '';
  const iconClassBack = currentPage === 1 ? 'material-icons' : 'material-icons white-text';
  const iconClassForward = currentPage === pages ? 'material-icons' : 'material-icons white-text';


  const pagesList = namedPages.map((item) => <Page key={item.page} pageItem={item} currentPage={currentPage}/>);
  return(
    <div className="center-align col s12">
      <ul className="pagination">
        <li className={firstPageClass}>
          <a
            onClick={handleBackClick}
            href="#!"
          >
            <i className={iconClassBack}>chevron_left</i>
          </a>
        </li>
        {pagesList}

        <li className={lastPageClass}>
          <a
            onClick={handleForwardClick}

            href="#!"
          >
            <i className={iconClassForward}>chevron_right</i>
          </a>
        </li>
      </ul>
    </div>);
}
