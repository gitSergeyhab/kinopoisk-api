const getUnique = (value: number, index: number, self: number[]) => self.indexOf(value) === index;


const getNamedPages = (pages: number[], firstHiddenPage: number | null, lastHiddenPage: number | null) =>
  pages.map((page) => page === firstHiddenPage || page === lastHiddenPage ? ({page, name: '...'}) : ({page, name: page.toString()}));


export const getPages = (pages: number, currentPage: number) => {

  if (pages < 2) {
    return null;
  }

  const first = 1;
  const last = pages;

  const second = currentPage === 1 ? 2 : null;
  const secondFromEmd = currentPage === pages ? pages - 1 : null;

  const third = currentPage === 1 ? 3 : null;
  const thirdFromEmd = currentPage === pages ? pages - 2 : null;

  const right = currentPage < pages - 1 ? currentPage + 1 : null;
  const left = currentPage > 2 ? currentPage - 1 : null;

  const firstHiddenPage = currentPage > 3 ? Math.ceil(currentPage / 2) : null;
  const lastHiddenPage = currentPage < pages -2 ? Math.floor((currentPage + pages) / 2) : null;

  const notNullPages = [first, second, third, firstHiddenPage, left, currentPage, right, lastHiddenPage, thirdFromEmd, secondFromEmd, last].filter((item) => item);
  const uniquePages = (notNullPages as number[]).filter(getUnique).sort((one, two) => one - two);

  return getNamedPages(uniquePages, firstHiddenPage, lastHiddenPage);
};
