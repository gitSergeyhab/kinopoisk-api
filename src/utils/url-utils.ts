import { Field, TypeNumber } from '../const';
import { TOKEN } from '../secret-const';
import { FilmSearchParam } from '../types/types';

const URL_BY_ID = '/movie?search=389&field=id';


// api.get('/character?name=/ga/i').then((res) => console.log(res)).catch((e) => console.log('error!!!', e));

// api.get(`${URL_BY_ID}&token=${PUBLIC_TOKEN}`).then((res) => console.log(res)).catch((e) => console.log('error!!!', e));

export const getUrlByFilmID = (id: string) => `/movie?search=${id}&field=id&token=${TOKEN}`;

export const getUrlFilmsByParams = ({filter = Field.TypeNumber, sort = Field.Votes.Kp, filterParam = TypeNumber.Movie, sortType = -1} : FilmSearchParam) =>
  `/movie?field=${filter}&search=${filterParam}&sortField=${sort}&sortType=${sortType}&token=${TOKEN}`;
