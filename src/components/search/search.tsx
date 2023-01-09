import { useState, useEffect, ChangeEventHandler } from 'react';
import { DefaultPath } from '../../const';
import { useDebounce } from '../../hooks/use-debounce';
import { useGetFilmsByNameQuery, useGetPersonsByNameQuery } from '../../services/query-api';
import { ResultSearchType } from '../../types/types';
import { toastError } from '../../utils/error-utils';
import { BadNewsMessage, FormWrapper, ResultHeader, ResultImg, ResultLi, ResultLink, ResultUl, SearchForm, SearchInput } from './search.style';


const MIN_LENGTH_SEARCH = 4;


function OneSearchItem({name, id, type, year, image}: ResultSearchType) {

  const yearField = type === 'films' ? 'год: ' : 'возраст: ';

  return (
    <ResultLi>
      <ResultLink to={`/${type}/${id}`}>
        <ResultImg src={image || DefaultPath.Poster}/>
        <span>{name}</span>
        <span>
          { year ? yearField : null}
          {year}

        </span>
      </ResultLink>
    </ResultLi>
  );
}


export default function Search() {

  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState<ResultSearchType[]>([]);
  const [persons, setPersons] = useState<ResultSearchType[]>([]);

  const debounceSearch = useDebounce(search, 1000);

  const {data: dataMovies, isFetching: isMovieFetch, isError, error} = useGetFilmsByNameQuery(debounceSearch, {skip: debounceSearch.length < MIN_LENGTH_SEARCH});
  const {data: dataPersons, isFetching: isPersonFetch} = useGetPersonsByNameQuery(debounceSearch, {skip: debounceSearch.length < MIN_LENGTH_SEARCH});

  useEffect(() => {
    setMovies(dataMovies || []);
    setPersons(dataPersons || []);
  }, [dataMovies, dataPersons]);

  const clear = () => {
    setSearch('');
    setMovies([]);
    setPersons([]);
  };

  const handleEscapeKeyDown = (evt: KeyboardEvent) => {
    if (evt.code === 'Escape') {
      clear();
    }
  };

  const handleOutsideClick = (evt: MouseEvent) => {
    if (evt.target instanceof Element && !evt.target.closest('#popup') && !evt.target.closest('#search-form')) {
      clear();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKeyDown);
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('keydown', handleEscapeKeyDown);
      document.removeEventListener('click', handleOutsideClick);
    };
  });

  const handleSearchInput: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const value = evt.currentTarget.value;
    setSearch(value);
    if (value.length < MIN_LENGTH_SEARCH) {
      setMovies([]);
      setPersons([]);
    }
  };

  const handleOneFilmClick = () => clear();


  if (isError) {
    toastError(error);
  }

  const movieElements = isMovieFetch && (search.length < MIN_LENGTH_SEARCH) ? [] : movies.map((item) =>
    <OneSearchItem key={item.id} id={item.id} year={item.year} name={item.name} type={item.type} image={item.image}/>);

  const personElements = isPersonFetch  ? [] : persons.map((item) =>
    <OneSearchItem key={item.id} id={item.id} year={item.year} name={item.name} type={item.type} image={item.image}/>);

  return (
    <FormWrapper id='search-form'>
      <SearchForm>
        <SearchInput onChange={handleSearchInput} value={search} />
        <ResultUl onClick={handleOneFilmClick} >
          {movieElements.length ? <ResultHeader>фильмы</ResultHeader> : null}
          {movieElements}
          {personElements.length ? <ResultHeader>люди</ResultHeader> : null}
          {personElements}
        </ResultUl>
        <BadNewsMessage>Поиск по БД Кинопоиска ооочень медленный, особенно по людям. Терпим...</BadNewsMessage>

      </SearchForm>
    </FormWrapper>
  );
}
