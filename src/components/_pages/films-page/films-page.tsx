import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Field, TypeNumber } from '../../../const';
import { FILMS } from '../../../mock/mock';
import { useGetFilmsByParamsQuery } from '../../../services/query-api';
import { Film } from '../../../types/types';
import { convertSearchForServer } from '../../../utils/url-utils';
import { getSyntheticRating } from '../../../utils/utils';
import Filter from '../../filter/filter';
import TabsOrder from '../../tabs-order/tabs-order';
import Tabs from '../../tabs/tabs';

export function FilmCard({film} : {film: Film}) {


  const {name, poster, rating, year, movieLength, votes, id, description} = film;

  return (
    <div className="card" style={{width: '30%'}}>
      <Link  to={`/films/${id}`}>
        <div className="card-image waves-effect waves-block waves-light">
          <img className="activator" src={poster.previewUrl} alt={name}/>
        </div>
      </Link>
      <div className="card-content">
        <span className="card-title activator grey-text text-darken-4"><Link to={`/films/${id}`}>{name}</Link><i className="material-icons right">more_vert</i></span>
        <p>Pейтинг:  {getSyntheticRating(rating, votes).ratingSynth} <i className="large grade material-icons" style={{fontSize: '1.1rem'}}>grade</i> ({votes.kp})</p>


      </div>
      <div className="card-reveal">
        <span className="card-title grey-text text-darken-4"><i className="material-icons right">close</i></span>
        <p>Год: {year}</p>
        <p>Время: {movieLength} минут</p>
        <p>{description}</p>

      </div>
    </div>
  );
}


export default function FilmsPage() {


  const {search} = useLocation();


  const {isError, isFetching, isLoading, data} = useGetFilmsByParamsQuery(search);


  if (isLoading) {
    return <h2>isFetching</h2>;
  }

  if (isError || !data) {
    return <h2>isError</h2>;
  }

  const films = data.docs as Film[];

  // const films = FILMS;
  // console.log(films);


  const filmList = films.map((item) => <FilmCard film={item} key={item.id}/>);


  return (
    <main className="mdl-layout__content row center-align black">
      <div className="col s1"></div>
      <div className="page-content col s10 row  grey darken-1">

        <Filter/>


        <div className="mdl-grid mdl-center col s9">
          <div className="row grey darken-3">
            <Tabs/>
            <TabsOrder/>
          </div>


          <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>

            {filmList}


          </div>
        </div>


      </div>
    </main>);
}
