import { ReducerState } from '../store/store';

type Name = {
  '_id': string,
  'name': string,
};

type ExternalId = {
  '_id'?: string | undefined,
  'imdb': string | null,
  'tmdb'?: number | null,
};

type Poster = {
  '_id'?: string,
  'url': string,
  'previewUrl': string,
}

export type Rating = {
  '_id'?: string,
  'kp': number,
  'imdb'?: number,
  'filmCritics'?: number,
  'russianFilmCritics'?: number,
  'await'?: number,
};

export type Votes = {
  '_id'?: string,
  'kp': number,
  'imdb'?: number,
  'filmCritics'?: number,
  'russianFilmCritics'?: number,
  'await'?: number,
}

export type Film = {
  'externalId': ExternalId,
  'poster': Poster,
  'rating': Rating,
  'votes': Votes,
  'movieLength'?: number | null,
  'id': number | string,
  'type': string,
  'name': string,
  'description': string,
  'year': number,
  'alternativeName': string | null,
  'enName': string | null,
  'names': Name[],
  'shortDescription'?: string | null,
};

type Trailer = {
  '_id': '61c873ba1a39ee3b06765c6d',
  'url': 'https://www.youtube.com/v/hCDUZ8Gx1ew',
  'name': 'Трейлер',
  'site': 'youtube',
};

type Budget = {
  '_id': '61c9f3289f08e3d2a263e655',
  'value': 115000000,
  'currency': 'FRF'
}

type Videos = {
  '_id': string,
  'trailers': Trailer[],
  'teasers': any[]
}

type Fee = {
  '_id': string,
  'value': number,
  'currency': string
}

type Fees = {
  'world': Fee,
  'usa': Fee,
  '_id': string,
};


type Distributor = {
  'distributor': string | null,
  'distributorRelease': string | null,
};

type Premiere = {
  '_id': string,
  'country': string | null,
  'world': string | null,
  'russia': string | null,
  'dvd': string | null,
  'bluray': string | null,
};

type Fact = {
  'value'?: string,
  'type'?: string,
  'spoiler'?: boolean
};

type Genre = {
  'name': string,
};

type Country = {
  'name': string,
}

type NameValue = {
  'name': string,

}

export type Person = {
  'id': number,
  'name': string,
  'enName': string | null,
  'description': string | null,
  'enProfession': string | null,
  'photo': string | null,
};

export type SimilarMovie = {
  '_id': string,
  'id': number,
  'name': string,
  'enName': string | null,
  'alternativeName': string | null,
  'poster': Poster,
};

type  Technology = {
  '_id': string,
  'hasImax': boolean,
  'has3D': boolean,
};

type ImagesInfo = {
  '_id': '61c9e1929f08e3d2a246ed1b',
  'framesCount': 46
}

export type FilmById = {
  'externalId': ExternalId,
  'poster': Poster,
  'rating': Rating,
  'votes': Votes,
  'videos': Videos,
  'budget': Budget,
  'fees': Fees,
  'distributors': Distributor,
  'premiere': Premiere,
  'images': {
      'framesCount': number
  },
  'collections': string[],
  'updateDates': string[],
  'id': number,
  'type': string,
  'name': string,
  'description': string,
  'slogan': null | string,
  'year': number,
  'facts': Fact[],
  'genres': Genre[],
  'countries': Country[],
  'seasonsInfo': any[],
  'persons': Person[],
  'lists': any[],
  'spokenLanguages': any[],
  'productionCompanies': any[],
  'typeNumber': number,
  'alternativeName': string | null,
  'enName': string | null,
  'names': NameValue[],
  'updatedAt': string | null,
  'similarMovies': SimilarMovie[],
  'sequelsAndPrequels': [
      {
          '_id': string
      }
  ],
  'movieLength': number | null,
  'ratingMpaa': string | null,
  'shortDescription': string | null,
  'technology': Technology
  'ticketsOnSale': boolean,
  'imagesInfo': ImagesInfo,
  'createDate': string | null,
}

export type MovieInPerson =       {
  'id': number,
  'name'?: string,
  'alternativeName'?: string,
  'rating'?: number,
  'general'?: boolean,
  'description'?: string,
};

type Profession = {
  'value'?: string
};

type Place = {
  'value'?: string
};


export type PersonById = {
  'spouses'?: any,
  'id': number,
  'name'?: string,
  'enName'?: string,
  'photo'?: string,
  'profession'?: Profession[],
  'birthPlace'?: Place[],
  'deathPlace'?: Place[],
  'facts'?: Fact[],
  'movies'?: MovieInPerson[],
  'age'?: number,
  'birthday'?: string,
  'countAwards'?: number,
  'death'?: any,
  'growth'?: number,
  'sex'?: string
}


export type FilmSearchParam = {filter: string, sort: string, filterParam: string, sortType: number};

export type OptionType = { value: string, label: string };

export type TypeBtn = {name: string, value: string};

export type FilmCard = {
  name: string;
  poster: Poster;
  rating: Rating;
  year: number;
  movieLength: number | null | undefined;
  votes: Votes;
  id: string | number;
  description: string;
}

export type FilmCardData = {
  filmCard: FilmCard,
  star: number,
  order: number,
}

export type FilmCardsData = {[id: string]: FilmCardData};

export type State = ReducerState;
