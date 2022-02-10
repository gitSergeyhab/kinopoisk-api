const RANGE = 5;

const getNamedPages = (pages: number[], firstHiddenPage: number | null, lastHiddenPage: number | null) =>
  pages.map((page) => page === firstHiddenPage || page === lastHiddenPage ? ({page, name: '...'}) : ({page, name: page.toString()}));


export const getPages = (pages: number, currentPage: number) => {

  let firstPage = currentPage - RANGE;
  firstPage = firstPage > 0 ? firstPage : 1;
  let lastPage = currentPage + RANGE;
  lastPage = lastPage <= pages ? lastPage : pages;
  const veryLastPage = lastPage === pages ? null : pages;
  const veryFirsPage = firstPage === 1 ? null : 1;
  const firstHiddenPage = currentPage - RANGE > 2 ? currentPage - RANGE - 1 : null;
  const lastHiddenPage = pages - RANGE - 2 > currentPage ? currentPage + RANGE + 1 : null;


  const pagesArray = new Array(lastPage - firstPage + 1).fill(null).map((_, index) => index + firstPage);

  const pageArrayWithVeryPages = [veryFirsPage, firstHiddenPage, ...pagesArray, lastHiddenPage, veryLastPage].filter((item) => item !== null);

  return getNamedPages(pageArrayWithVeryPages as number[], firstHiddenPage, lastHiddenPage);
};
