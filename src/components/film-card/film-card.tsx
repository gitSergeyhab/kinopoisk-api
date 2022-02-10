import { Link } from 'react-router-dom';
import { Film, FilmCard as FilmCardType} from '../../types/types';
import { getSyntheticRating } from '../../utils/utils';
import BtnDeleteStars from '../btn-delete-stars/btn-delete-stars';
import Stars from '../stars/stars';


export function FilmCard({film} : {film: Film | FilmCardType}) {


  const {name, poster, rating, year, movieLength, votes, id, description} = film;
  const filmCard = {name, poster, rating, year, movieLength, votes, id, description};

  return (
    <>
      <BtnDeleteStars id={id} key={id}/>
      <Stars filmCard={filmCard}/>

      <Link  to={`/films/${id}`}>
        <div className="card-image waves-effect waves-block waves-light">
          <img className="activator" src={poster.previewUrl} alt={name}/>
        </div>
      </Link>
      <div className="card-content">
        <span className="card-title activator grey-text text-darken-4">
          <Link to={`/films/${id}`}>{name}</Link>
          <i className="material-icons right">more_vert</i>
        </span>
        <p>Pейтинг:  {getSyntheticRating(rating, votes).ratingSynth}
          <i className="large grade material-icons" style={{fontSize: '1.1rem'}}>grade</i> ({votes.kp})
        </p>

      </div>
      <div className="card-reveal">
        <span className="card-title grey-text text-darken-4"><i className="material-icons right">close</i></span>
        <p>Год: {year}</p>
        <p>Время: {movieLength} минут</p>
        <p>{description}</p>

      </div>
    </>
  );
}
