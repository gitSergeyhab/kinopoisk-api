import { useDispatch } from 'react-redux';

import CommonModal from '../common-modal/common-modal';
import { setPopup } from '../../../store/action';
import { MovieInPerson } from '../../../types/types';
import { MovieLi, NamePerson, PersonLink, MovieRate } from './modal-movies-of-person.style';
import { Grade } from '../../common/common.style';
import { getUnique, round10 } from '../../../utils/utils';


const filterMovie = (movies: MovieInPerson[] | undefined) => {
  if (!movies) {
    return null;
  }
  const uniques = movies.filter((item, i) => getUnique(item.id, i, movies.map((m) => m.id)));

  const newMovies = uniques.filter((item) => item.id && (item.name || item.alternativeName));

  return newMovies;
};


function MovieRow({movie} : {movie: MovieInPerson}) {

  const {id, alternativeName, description, name, rating} = movie;
  const dispatch = useDispatch();
  const handleToPersonClick = () => dispatch(setPopup(false));

  return (
    <MovieLi>
      <NamePerson>
        {name || alternativeName}
      </NamePerson>
      <NamePerson>
        {description}
      </NamePerson>
      <MovieRate>{rating? round10(rating) : ' '} <Grade size={0.6}>grade</Grade> </MovieRate>


      <PersonLink
        onClick={handleToPersonClick}
        to={`/films/${id}`} className="secondary-content"
      >
        <i className="material-icons">navigate_next</i>
      </PersonLink>
    </MovieLi>
  );
}


export default function ModalMoviesOfPerson({movies} : {movies: MovieInPerson[]}) {

  const filteredMovies = filterMovie(movies);

  const movieList = filteredMovies && filteredMovies.length ? filteredMovies.map((item) => <MovieRow key={item.id} movie={item}/>) : null;

  return <CommonModal elements={movieList}/>;
}
