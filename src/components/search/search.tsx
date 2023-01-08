import { useState, useEffect, ChangeEventHandler } from 'react';
import { useDebounce } from '../../hooks/use-debounce';
import { useGetFilmsByNameQuery, useGetPersonsByNameQuery } from '../../services/query-api';
import { ResultSearchType } from '../../types/types';
import { FormWrapper, ResultHeader, ResultImg, ResultLi, ResultLink, ResultUl, SearchForm, SearchInput } from './search.style';


const MIN_LENGTH_SEARCH = 4;


function OneSearchItem({name, id, type, year, image}: ResultSearchType) {

  const yearField = type === 'films' ? 'год: ' : 'возраст: ';

  return (
    <ResultLi>
      <ResultLink to={`/${type}/${id}`}>
        <ResultImg src={image}/>
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

  const {data: dataMovies, isFetching: isMovieFetch} = useGetFilmsByNameQuery(debounceSearch, {skip: debounceSearch.length < MIN_LENGTH_SEARCH});
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

  const handleSearchInput: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const value = evt.currentTarget.value;
    setSearch(value);
    if (value.length < MIN_LENGTH_SEARCH) {
      setMovies([]);
      setPersons([]);
    }
  };

  const handleOneFilmClick = () => clear();

  const movieElements = isMovieFetch && (search.length < MIN_LENGTH_SEARCH) ? [] : movies.map((item) =>
    <OneSearchItem key={item.id} id={item.id} year={item.year} name={item.name} type={item.type} image={item.image}/>);

  const personElements = isPersonFetch && (search.length < MIN_LENGTH_SEARCH) ? [] : persons.map((item) =>
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

      </SearchForm>
    </FormWrapper>
  );
}
