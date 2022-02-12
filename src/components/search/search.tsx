import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetFilmsByNameQuery } from '../../services/query-api';
import { Film } from '../../types/types';

import './search.css';


function OneSearchItem({film, onClickFilm}: {film: Film, onClickFilm: () => void}) {
  const {name, id} = film;
  const navigate = useNavigate();
  const handleFilmClick = () => {
    navigate(`/films/${id}`);
    onClickFilm();
  };
  return (
    <li className='collection-item'
      onClick={handleFilmClick}
      style={{ width: '100%', fontSize: '1rem', lineHeight: '1rem', backgroundColor: 'grey', padding: '0 2px', cursor: 'pointer'}}
      tabIndex={0}
    >
      {name}
    </li>
  );
}

export default function Search() {

  const [search, setSearch] = useState('');
  const [films, setFilms] = useState<Film[]>([]);

  const x = useGetFilmsByNameQuery(search);

  const handleSearchInput = (evt: FormEvent<HTMLInputElement>) => setSearch(evt.currentTarget.value);
  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    setFilms(x.data.docs);
  };

  const handleOneFilmClick = () => {
    setSearch('');
    setFilms([]);
  };


  const filmList = films.map((item) => <OneSearchItem key={item.id} film={item} onClickFilm={handleOneFilmClick}/>);
  const filmListUl = films.length ? <ul className='collection react-search-list'>{filmList}</ul> : null;

  return (
    <form
      onSubmit={handleSubmit}
      className='react-search-form'
    >
      <div className="black" style={{height: '3rem', display: 'flex'}}>
        <div className="input-field col">
          <input
            onChange={handleSearchInput}
            value={search}
            placeholder="Поиск по названию или по имени" id="search" type="text" className="validate orange-text" style={{ width: '20rem'}}
          />
        </div>
        <button type="submit" className='react-search-btn'>
          <i className="material-icons">search</i>
        </button>

      </div>
      {filmListUl}
    </form>
  );
}
