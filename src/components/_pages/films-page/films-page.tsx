import { Link } from 'react-router-dom';
import { Field, TypeNumber } from '../../../const';
import { FILMS } from '../../../mock/mock';
import { useGetFilmsByParamsQuery } from '../../../services/query-api';
import { Film } from '../../../types/types';
import { getSyntheticRating } from '../../../utils/utils';

export function FilmCard({film} : {film: Film}) {

  const {name, poster, rating, year, movieLength, votes, id, description} = film;

  return (
    <div className="card" style={{width: '30%'}}>
      <Link to={`/films/${id}`}>
        <div className="card-image waves-effect waves-block waves-light">
          <img className="activator" src={poster.previewUrl} alt={name}/>
        </div>
      </Link>
      <div className="card-content">
        <span className="card-title activator grey-text text-darken-4"><Link to={`/films/${id}`}>{name}</Link><i className="material-icons right">more_vert</i></span>
        <p>Pейтинг:  {getSyntheticRating(rating, votes).ratingSynth} <i className="large grade material-icons" style={{fontSize: '1.1rem'}}>grade</i> ({votes.kp})</p>


      </div>
      <div className="card-reveal">
        <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
        <p>Год: {year}</p>
        <p>Время: {movieLength} минут</p>
        <p>{description}</p>

      </div>
    </div>
  );
}


export default function FilmsPage() {
  // const {isError, isFetching, data} = useGetFilmsByParamsQuery({filter: Field.TypeNumber, filterParam: TypeNumber.Serial, sort: Field.Votes.Kp, sortType: -1});


  // if (isFetching) {
  //   return <h2>isFetching</h2>;
  // }

  // if (isError || !data) {
  //   return <h2>isError</h2>;
  // }

  // const films = data.docs as Film[];

  const films = FILMS;
  console.log(films);


  const filmList = films.map((item) => <FilmCard film={item} key={item.id}/>);


  return (
    <main className="mdl-layout__content">
      <div className="page-content">

        <div className="mdl-grid mdl-center">
          <div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet">
            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--8-col mdl-cell--12-col-tablet">
                <h1 className="title-headline">Header
                </h1>
              </div>
            </div>
          </div>
        </div>


        <div className="mdl-grid mdl-center">
          <div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet">
            <div className="mdl-grid">
              <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>

                {filmList}


              </div>
            </div>
          </div>
        </div>


      </div>
    </main>);
}
