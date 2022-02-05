export const enum APIRoute {
  Films = '/movie',
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
};

export const TypeNumber = {
  Movie: '1',
  Serial: '2',
  Cartoon: '3',
  Anime: '4',
  AnimatesSerial: '5',
  Show: '6',
};

export const InitFilterParam = {
  Rating: {
    Start: 7,
    End: 10,
  },
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
