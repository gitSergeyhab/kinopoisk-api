export const enum APIRoute {
  Films = '/movie',
  Persons = '/person'
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
  Show: {value: '6', name: 'ТВ - ШОУ'},
};


export const FilterRange = {
  Rating: {
    Start: 0,
    End: 10,
  },
  Year: {
    Start: 1900,
    Middle: 1990,
    End: 2023,
  },
};

export const Options = [
  { value: '0', label: 'Все'},
  { value: '500', label: 'Даже малоизвестные'},
  { value: '5000', label: 'Начиная с более-менее известных'},
  { value: '50000', label: 'Только известные'},
  { value: '300000', label: 'Топ'},
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
