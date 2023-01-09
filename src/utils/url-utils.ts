import { Field, FieldType, FilterRange, SORT_CATEGORIES, TOO_MANY_VOTES } from '../const';
import { OptionType, SimpleDict } from '../types/types';


const TOKEN =  process.env.REACT_APP_KP_TOKEN;


const createFilterField = (key: string, value: string) => `field=${key}&search=${value}`;


const getSearchFromDict = (dict: {[key: string] : string | null}) => {
  const array: string[] = [];

  const filterFields = [FieldType.Rating, FieldType.TypeNum, FieldType.Votes, FieldType.Year] as string[];

  for (const [key, value] of Object.entries(dict)){
    if (!value) {continue;}
    if (filterFields.includes(key)) {
      array.push(createFilterField(key, value));
    } else {
      array.push(`${key}=${value}`);
    }
  }

  return `?${array.join('&')}`;
};

export const getFullDict = (sp: URLSearchParams) => {
  const fields = sp.getAll('field');
  const search = sp.getAll('search');
  const searchFields = fields.map((item, i) => ([item, search[i]]));
  const searchDict = searchFields.reduce((acc, item) => ({...acc, [item[0]]: item[1]}), {});
  const sortField = sp.get(FieldType.SortField);
  const sortType = sp.get(FieldType.SortType);
  const page = sp.get(FieldType.Page);
  const fullDict = {...searchDict, [FieldType.SortType]: sortType, [FieldType.SortField]: sortField, [FieldType.Page]: page};

  return fullDict as SimpleDict;
};

type ChangeField = {field: string; value: string | null, noChange?: boolean}

type RewriteSearchArgs = {searchParams: URLSearchParams, fields: ChangeField[]}

export const rewriteSearch = ({searchParams, fields}: RewriteSearchArgs) => {

  const fullDict = getFullDict(searchParams);

  const dict: {[key: string] : string} = { ...fullDict };

  fields.forEach(({field, value, noChange}) => {
    if (!noChange || !dict[field]) {
      dict[field] = value ? value : '';
    }

  });

  return getSearchFromDict(dict);
};


export const getUrlByRoutId = (rout: string, id: string) => `${rout}?search=${id}&field=id&token=${TOKEN}`;


type TypeParam = {startRating: number, endRating: number, startYear: number, endYear: number, voteOption: OptionType, category: string, sortField: string, sortType: string};


export const getObjectParam = ({startRating, endRating, startYear, endYear, voteOption} : TypeParam) => ({
  [Field.Year]: `${startYear}-${endYear}`,
  [Field.Rating.Kp]: `${startRating}-${endRating}`,
  [Field.Votes.Kp]: `${voteOption.value}-${TOO_MANY_VOTES}`,
});


export const getStringParam = ({startRating, endRating, startYear, endYear, voteOption, category, sortField, sortType} : TypeParam) => {
  const param = getObjectParam({startRating, endRating, startYear, endYear, voteOption, category, sortField, sortType});

  const yearPart = createFilterField(Field.Year, param[Field.Year]);
  const ratingPart = createFilterField(Field.Rating.Kp, param[Field.Rating.Kp]);
  const votePart = createFilterField(Field.Votes.Kp, param[Field.Votes.Kp]);
  const categoryPart = category ? createFilterField(Field.TypeNumber, category): '';
  const sortPart = `sortField=${sortField}&sortType=${sortType}`;

  return `?${yearPart}&${ratingPart}&${votePart}&${categoryPart}&${sortPart}`;
};

export const convertSearchForServer = (search: string) => {
  if (!search) {
    return `/movie?field=year&search=1900-${FilterRange.Year.End}&sortField=${Field.Votes.Kp}&sortType=${-1}&limit=12&token=${TOKEN}`;
  }
  return `/movie${search}&limit=12&token=${TOKEN}`;
};


export const convertFilmNameForServer = (search: string) => `/movie?sortField=${Field.Votes.Kp}&sortType=${-1}&limit=4&search=${search}&field=name&isStrict=false&token=${TOKEN}`;
export const convertPersonNameForServer = (search: string) => `/person?sortField=name&sortType=${1}&limit=4&search=${search}&field=name&isStrict=false&token=${TOKEN}`;


export const getSortingField = (searchParams: URLSearchParams) => {
  const field = searchParams.get(Field.SortField);

  return field ? field : SORT_CATEGORIES[0].value;
};


export const getSortingType = (searchParams: URLSearchParams) => {
  const sort = searchParams.get(Field.SortType);

  return sort && sort === '1' ? sort : '-1';
};

export const getYearsFromSearch = (searchParams: URLSearchParams | null) => {

  if (!searchParams) {
    return [FilterRange.Year.Start, FilterRange.Year.End];
  }

  const fullDict = getFullDict(searchParams);

  const yearsQuery = fullDict[FieldType.Year];

  if (!yearsQuery) {
    return [FilterRange.Year.Start, FilterRange.Year.End];
  }

  const [start, end] = yearsQuery.split('-');

  return [+start, +end];

};

export const getRateFromSearch = (searchParams: URLSearchParams | null) => {

  if (!searchParams) {
    return [FilterRange.Rating.Start, FilterRange.Rating.End];
  }
  const fullDict = getFullDict(searchParams);

  const rateQuery = fullDict[FieldType.Rating];

  if (!rateQuery) {
    return [FilterRange.Rating.Start, FilterRange.Rating.End];
  }

  const [start, end] = rateQuery.split('-');

  return [+start, +end];

};

export const getVotesFromSearch = (searchParams: URLSearchParams) => {
  const fullDict = getFullDict(searchParams);

  const voteQuery = fullDict[FieldType.Votes];

  if (!voteQuery) {
    return null;
  }

  const [start, end] = voteQuery.split('-');

  return [+start, +end];
};


export const getFieldFromSearch = (searchParams: URLSearchParams, field: FieldType) => {
  const fullDict = getFullDict(searchParams);

  const query = fullDict[field];

  if (!query) {
    return null;
  }

  return query;
};


