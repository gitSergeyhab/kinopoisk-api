import { Field, TypeNumber } from '../const';
import { TOKEN } from '../secret-const';
import { FilmSearchParam, State } from '../types/types';

const URL_BY_ID = '/movie?search=389&field=id';


// api.get('/character?name=/ga/i').then((res) => console.log(res)).catch((e) => console.log('error!!!', e));

// api.get(`${URL_BY_ID}&token=${PUBLIC_TOKEN}`).then((res) => console.log(res)).catch((e) => console.log('error!!!', e));

export const getUrlByFilmID = (id: string) => `/movie?search=${id}&field=id&token=${TOKEN}`;

export const getUrlFilmsByParams = ({filter = Field.TypeNumber, sort = Field.Votes.Kp, filterParam = TypeNumber.Movie, sortType = -1} : FilmSearchParam) =>
  `/movie?field=${filter}&search=${filterParam}&sortField=${sort}&sortType=${sortType}&token=${TOKEN}`;

type TypeParam = {startRating: number, endRating: number, startYear: number, endYear: number};


export const getObjectParam = ({startRating, endRating, startYear, endYear} : TypeParam) => ({
  [Field.Year]: `${startYear}-${endYear}`,
  [Field.Rating.Kp]: `${startRating}-${endRating}`,
});

export const getStringParam = ({startRating, endRating, startYear, endYear} : TypeParam) => {
  const param = getObjectParam({startRating, endRating, startYear, endYear});
  const year = param[Field.Year];
  const rating = param[Field.Rating.Kp];
  return `?field=${Field.Year}&search=${year}&field=${Field.Rating.Kp}&search=${rating}&sortField=${Field.Votes.Kp}&sortType=${-1}`;
};

export const convertSearchForServer = (search: string) => {
  if (!search) {
    return `/movie?field=year&search=1900-2022&sortField=${Field.Votes.Kp}&sortType=${-1}&limit=12&token=${TOKEN}`;
  }
  return `/movie${search}&limit=12&token=${TOKEN}`;
};


export const getParamsFromSearch = (searchParams: URLSearchParams, needField: string, defaultStart: number, defaultEnd: number) => {
  const fields = searchParams.getAll('field');
  const searches = searchParams.getAll('search');

  const index = fields.findIndex((field) => field === needField);

  if (index === -1) {
    return {
      start: defaultStart,
      end: defaultEnd,
    };
  }

  const ratings = searches[index];
  const interval = ratings.includes('-');

  if (interval) {
    const [start, end] = ratings.split('-').map((item) => +item);
    return {start, end};
  }
  return {start: +ratings, end: +ratings};
};
