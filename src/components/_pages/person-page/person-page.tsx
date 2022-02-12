import { Link, useParams } from 'react-router-dom';

import { useGetOnePersonQuery } from '../../../services/query-api';
import { MovieInPerson,  PersonById } from '../../../types/types';
import { formatDateDDMonthYYYY } from '../../../utils/date-utils';
import Loading from '../../loading/loading';
import PersonFilmList from '../../person-film-list/person-film-list';

import './person-page.css';


const filterMovie = (movies: MovieInPerson[] | undefined) => {
  if (!movies) {
    return null;
  }
  const idsUnique = [...new Set(movies.map((item) => item.id))];
  const newMovies = idsUnique.map((item) => movies.find((oldMovie) => oldMovie.id === item));
  return newMovies as MovieInPerson[];
};

// function PersonFilm({movie} : {movie: MovieInPerson}) {

//   const {id, description, name, rating} = movie;

//   return (
//     <li className="collection-item grey darken-3 react-person-movies__item">
//       <p className="title react-person-movies__paragraph react-person-movies__paragraph--title">
//         {name || 'Нет названия'}
//       </p>
//       <p className="react-person-movies__paragraph react-person-movies__paragraph--description">
//         {description || 'Нет описания'}
//       </p>
//       <p className="react-person-movies__paragraph">
//         {rating} <i className="material-icons">star_border</i>
//       </p>

//       <Link to={`/films/${id}`} className="secondary-content">
//         Перейти
//       </Link>
//     </li>
//   );
// }

export default function PersonPage(){


  const {id} = useParams();

  const {data, isError, isFetching} = useGetOnePersonQuery(id);

  if (isFetching) {
    return <Loading/>;
  }

  if (isError || !data) {
    return <h2>isError</h2>;
  }

  const {name, birthPlace, birthday, death, movies, photo, profession, sex, age} = data as PersonById;

  const birthdayString = birthday ? formatDateDDMonthYYYY(birthday) : 'Неизвестна';
  const deathString = death ? formatDateDDMonthYYYY(death) : null;

  const professionList = (profession && profession.length) ?
    profession
      .map((item) => item.value || null)
      .filter((item) => !!item).join(', ') : null;

  const filteredMovies = filterMovie(movies);

  const movieList = filteredMovies && filteredMovies.length ? <PersonFilmList movies={filteredMovies}/> : null;

  const birthPlaceList = birthPlace && birthPlace.length ?
    birthPlace
      .map((item) => item.value || null)
      .filter((item) => !!item).join(', ') : null;


  return (
    <div className="row black">
      <div className="col s2"></div>
      <div className="col s8 brown darken-3 white-text text-lighten-4">
        <h2 className="header center-align">{name}</h2>
        <div className="card horizontal blue-grey darken-1 black-text">
          <div className="card-image">
            <img src={photo} alt={name}/>
          </div>
          <div className="card-stacked">
            <div style={{padding: '1rem', fontSize: '1.8rem'}} className='blue-grey'>
              <p>Дата рожнкния : {birthdayString}</p>

              <p>Место рожнкния : {birthPlaceList ? birthPlaceList : 'Неизвестно'}</p>

              { deathString ? <p>Дата мерти : {deathString}</p> : null }

              { <p> Возраст: {age ? age : 'Неизвестен'}</p> }

              <p>Профессии : {professionList ? professionList : 'Неизвестно'}</p>

              <p>Пол : {sex ? sex : 'Неизвестно'}</p>

            </div>

          </div>


        </div>

        <div className="card-content grey black-text row">
          <p className="col s2"></p>
        </div>

        <div className="card-action  center-align">
          <h4 className='center-align'><p>Фильмы</p></h4>

          <div className="blue-grey darken-2" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
            <ul className="collection react-person-movies">
              {movieList ? movieList : 'Неизвестно'}
            </ul>


          </div>
        </div>


      </div>
    </div>
  );
}
