import { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { FixedSizeList as List } from 'react-window';
import { MovieInPerson } from '../../types/types';

import './person-film-list';


type RowType = { index: number, style: CSSProperties }

export default function PersonFilmList({movies} : {movies: MovieInPerson[]}) {
  function Row({ index, style } : RowType) {
    const {id, description, name, rating} = movies[index];
    return (
      <li className="collection-item grey darken-3 react-person-movies__item" style={style}>
        <p className="title react-person-movies__paragraph react-person-movies__paragraph--title">
          {name || 'Нет названия'}
        </p>
        <p className="react-person-movies__paragraph react-person-movies__paragraph--description">
          {description || 'Нет описания'}
        </p>
        <p className="react-person-movies__paragraph">
          {rating} <i className="material-icons">star_border</i>
        </p>

        <Link to={`/films/${id}`} className="secondary-content">Перейти
        </Link>
      </li>
    );
  }
  return (
    <List
      innerElementType="ul"
      className="react-person-movies collection-item grey darken-3"
      height={400}
      itemCount={movies.length}
      itemSize={80}
      width={300}
    >
      {Row}
    </List>
  );
}

