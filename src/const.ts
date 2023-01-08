import { SimpleDict } from './types/types';

export const TOO_MANY_VOTES = 999999999;


export const enum APIRoute {
  Films = '/movie',
  Persons = '/person'
}

export const enum FieldType {
  Page = 'page',
  SortField = 'sortField',
  SortType = 'sortType',
  Rating = 'rating.kp',
  TypeNum = 'typeNumber',
  Votes = 'votes.kp',
  Year = 'year',
  Name = 'name'
}

export const Field = {
  TypeNumber: 'typeNumber',
  Year: 'year',
  Name: 'name',
  Rating: {
    Kp: 'rating.kp',
    Imdb: 'rating.imdb',
    Tmdb: 'rating.tmdb',
  },
  Votes: {
    Kp: 'votes.kp',
    Imdb: 'votes.imdb',
    Tmdb: 'votes.tmdb',
  },
  MovieLength: 'movieLength',
  SortField: 'sortField',
  SortType: 'sortType',
};

export const TypeNumber = {
  All: {value: '', name: 'Все'},
  Movie: {value: '1', name: 'Фильмы'},
  Serial: {value: '2', name: 'Сериалы'},
  Cartoon: {value: '3', name: 'Анимация'},
  Anime: {value: '4', name: 'Аниме'},
  AnimatesSerial: {value: '5', name: 'Аниме-сериалы'},
  Show: {value: '6', name: 'Шоу'},
};


export const FilterRange = {
  Rating: {
    Start: 1,
    End: 10,
  },
  Year: {
    Start: 1895,
    Middle: 1990,
    End: new Date().getFullYear(),
  },
};

export const Options = [
  { value: '10', label: 'все'},
  { value: '300000', label: 'ТОП'},
  { value: '50000', label: 'популярные'},
  { value: '5000', label: 'известные'},
  { value: '500', label: 'малоизвестные'},
];

export const SORT_CATEGORIES = [
  {name: 'По популярности', value: Field.Votes.Kp},
  {name: 'По Дате выхода', value: Field.Year},
  {name: 'По рейтингу КП', value: Field.Rating.Kp},
];

export const ORDER_CATEGORIES = [
  {name: 'arrow_drop_down', value: '-1'},
  {name: 'arrow_drop_up', value: '1'},
];

export const enum DefaultPath {
  Poster = '/img/default/default-poster.jpg'
}

export const TranslateDict: SimpleDict = {
  actor: 'актёр',
  director: 'режисёр',
};
