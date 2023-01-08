import { ReducerState } from '../store/store';


type Fact = {
  'value'?: string,
  'type'?: string,
  'spoiler'?: boolean
};


type Value = {value?: string}


export type PersonById = {
  id: number,
  name?: string,
  enName?: string,
  photo?: string,
  profession?: Value[],
  birthPlace?: Value[],
  deathPlace?: Value[],
  facts?: Fact[],
  movies?: MovieInPerson[],
  age?: number,
  birthday?: string,
  countAwards?: number,
  death?: string,
  growth?: number,
  sex?: string
}

export type Poster = {
  url?: string;
  previewUrl?: string;
}

export type ResourceNum = {
  tmdb?: number;
  kp?: number;
  imdb?: number;
  filmCritics?: number
}

type Trailer = {
  _id: string,
  url?: string,
  name?: string,
  site?: string,
  size?: string | number,
  type?: string
}

export type Budget = {
  value?: number,
  currency?: string
}

export type ProductionCompanies = {
  name?: string,
  url?: string,
  previewUrl?: string
}

export type Name = {name: string}

export type Person = {
  id: 24262,
  name: string,
  enName?: string,
  photo?: string,
  enProfession?: string;
  description?: string;
}


export type SimilarMovie = {
  id: number;
  name: string;
  enName?: string;
  alternativeNam?: string;
  poster: Poster;
}


export type FilmById = {
  id: number;
  type: string | null;
  alternativeName: string,
  name: string,
  enName: string,
  description?: string;
  slogan?: string;
  year?: number;
  poster?: Poster;
  rating?: ResourceNum;
  votes?: ResourceNum;
  videos?: {
    trailers?: Trailer[];
    teaser?: Trailer[];
  },
  budget?: Budget;
  movieLength?: number;
  productionCompanies?: ProductionCompanies[];
  genres?: Name[];
  countries?: Name[];
  persons?: Person[];
  similarMovies?: SimilarMovie[];
}

export type FilmCard = {
  id: string | number;
  alternativeName: string,
  name: string,
  enName: string,
  poster?: Poster;
  rating?: ResourceNum;
  year?: number;
  movieLength?: number;
  votes?: ResourceNum;
  description: string;
}


export type FilmSearchParam = {filter: string, sort: string, filterParam: string, sortType: number};

export type OptionType = { value: string, label: string };

export type TypeBtn = {name: string, value: string};


export type FilmCardData = {
  filmCard: FilmCard,
  star: number,
  order: number,
}

export type FilmCardsData = {[id: string]: FilmCardData};

export type State = ReducerState;

export type Film = {
  alternativeName: string,
  name: string,
  enName: string,
  poster?: Poster,
  rating?: ResourceNum,
  votes: ResourceNum,
  movieLength?: number,
  id: number,
  type?: string,
  description?: string,
  year?: number,
  names?: Name[],
  shortDescription?: string,
};


export type MovieInPerson = {
  id: number,
  name?: string,
  alternativeName?: string,
  rating?: number,
  general?: boolean,
  description?: string,
};

export type SimpleDict = {[key: string] : string}

export type ResultSearchType = {
  name: string,
  id: number,
  type: 'films' | 'persons',
  year?: number,
  image?: string
}

export type PersonsByName = {
  id: number;
  name: string,
  enName: string,
  photo?: string,
  age?: number,
  sex?: string
}
